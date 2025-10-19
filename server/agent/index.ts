import { generateText, ModelMessage, TypedToolCall } from 'ai';
import { google } from '@ai-sdk/google';
import { Expense } from './types';
import { SYSTEM_PROMPT } from './prompt';
import { tools } from '../tools/schemas';
import { toolFunctions } from '../tools/registry';

const MAX_STEPS = 10;

export class FinanceAgent {
  private agentMemory: ModelMessage[];
  private expenses: Expense[];
  private workingData: any;
  private step: number;

  constructor(query: string, expenses: Expense[]) {
    this.agentMemory = [
      {
        role: 'user',
        content: query,
      },
    ];
    this.expenses = expenses;
    this.workingData = expenses;
    this.step = 0;
  }

  private addToMemory(toolCallId: string, toolName: string, result: unknown): void {
    this.agentMemory.push({
      role: 'tool',
      content: [
        {
          type: 'tool-result',
          toolCallId,
          toolName,
          output: { type: 'json' as const, value: result as any },
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
  but then we would also have to pass the entire context (our expenses data) which is not always feasible (and less secure),
  plus we would also lose control of the ability to easily trace and log the flow, which makes debugging harder */
  async run(): Promise<string> {
    while (this.step < MAX_STEPS) {
      const result = await generateText({
        model: google('gemini-2.5-flash'),
        system: SYSTEM_PROMPT,
        messages: this.agentMemory,
        tools,
      });

      console.log(JSON.stringify(result, null, 2));
      console.log('\n\n\n');
      console.log(...result.response.messages);
      console.log('\n\n\n');
      console.log(result.toolCalls);
      return 'testing'

      this.agentMemory.push(...result.response.messages);

      if (result.finishReason === 'tool-calls') {
        for (const toolCall of result.toolCalls) {
          await this.handleToolCall(toolCall);
        }
      } else {
        return result.text;
      }

      this.step++;
    }

    return 'Agent reached maximum steps without completing the task.';
  }
}
