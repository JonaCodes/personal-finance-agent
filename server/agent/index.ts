import { generateText, ModelMessage, TypedToolCall } from 'ai';
import { google } from '@ai-sdk/google';
import { Expense } from './types';
import { INITIAL_SYSTEM_PROMPT } from './prompt';
import { FILTER_RESULT_LIMIT, tools } from '../tools/schemas';
import { toolFunctions } from '../tools/registry';
import { deepDelete, sleep } from '../utils/general';

const MAX_STEPS = 3;

export class FinanceAgent {
  private agentMemory: ModelMessage[];
  private expenses: Expense[];

  constructor(expenses: Expense[]) {
    this.agentMemory = [
      {
        role: 'system',
        content: INITIAL_SYSTEM_PROMPT,
      }
    ];

    this.expenses = expenses;
  }

  private addToMemory(toolCallId: string, toolName: string, result: any): void {
    let truncatedResult = result;
    if (toolName === 'filter_expenses') {
      truncatedResult = {
        filteredCount: result.metadata.totalMatching,
        firstFew: result.expenses.slice(0, FILTER_RESULT_LIMIT),
        note: "Note: this result has been truncated to save context.",
      };
    }

    this.agentMemory.push({
      role: 'tool',
      content: [
        {
          type: 'tool-result',
          toolCallId,
          toolName,
          output: { type: 'json' as const, value: JSON.stringify(truncatedResult) },
        },
      ],
    });
  }

  private async handleToolCall(toolCall: TypedToolCall<typeof tools>): Promise<void> {
    const toolFn = toolFunctions[toolCall.toolName];

    if (!toolFn) {
      this.addToMemory(
        toolCall.toolCallId,
        toolCall.toolName,
        { error: `Unknown tool: ${toolCall.toolName}` }
      );
      return;
    }

    try {
      console.log('Calling tool', toolCall.toolName, 'with input', toolCall.input);
      const toolResult = await toolFn(this.expenses, toolCall.input);
      this.addToMemory(toolCall.toolCallId, toolCall.toolName, toolResult);
    } catch (error) {
      this.addToMemory(
        toolCall.toolCallId,
        toolCall.toolName,
        { error: error instanceof Error ? error.message : 'Tool execution failed' }
      );
    }
  }

  /* We could have passed the tools with their function logic directly to the model and let it all run independently,
  but then we would lose control of the ability to easily trace and log the flow, which makes debugging harder */
  async run(query: string): Promise<string> {
    this.agentMemory.push({
      role: 'user',
      content: query,
    });

    let step = 0;
    while (step < MAX_STEPS) {
      const result = await generateText({
        model: google('gemini-2.5-flash'),
        messages: this.agentMemory,
        tools,
        temperature: 0.1,
      });

      deepDelete(result.response.messages, 'providerOptions'); // Remove providerOptions to avoid cluttering the memory with the thoughtSignature
      this.agentMemory.push(...result.response.messages);

      if (result.finishReason === 'tool-calls') {
        for (const toolCall of result.toolCalls) {
          await this.handleToolCall(toolCall);
        }
      } else {
        return result.text;
      }

      step++;
      await sleep(1_000);
    }


    return 'Agent reached maximum steps without completing the task.';
  }
}
