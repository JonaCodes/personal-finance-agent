import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { Expense } from '../agent/types';

export interface SummaryResult {
  summary: string;
}

export interface GenerateSummaryParams {
  data: Record<string, unknown>;
  prompt: string;
}

export const generateSummary = async (
  _expenses: Expense[],
  params: GenerateSummaryParams
): Promise<SummaryResult> => {
  // TODO: This tool demonstrates how tools can call LLMs!
  // The agent calls this tool with processed data AND a prompt
  // This tool simply formats the data and calls the LLM

  const fullPrompt = `${params.prompt}
    Here is the expense data:
    ${JSON.stringify(params.data, null, 2)}

    Provide a clear, insightful summary in 1-2 sentences.`;

  const result = await generateText({
    model: google('gemini-2.5-flash'),
    prompt: fullPrompt,
  });

  return {
    summary: result.text,
  };
};