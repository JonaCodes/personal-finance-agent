import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { Expense } from '../agent/types';

export interface GenerateSummaryParams {
  data: Record<string, unknown>;
  focusArea?: 'overview' | 'spending_patterns' | 'top_categories' | 'anomalies';
}

export interface SummaryResult {
  summary: string;
}

export const generateSummary = async (
  _expenses: Expense[],
  params: GenerateSummaryParams
): Promise<SummaryResult> => {
  // TODO: This tool demonstrates how tools can call LLMs!
  // The agent calls this tool with processed data from other tools
  // This tool then calls Gemini to generate a natural language summary

  // Build a prompt based on the data and focus area
  const focusInstructions = {
    overview: 'Provide a concise overview of the spending data.',
    spending_patterns: 'Focus on identifying trends and patterns in spending behavior.',
    top_categories: 'Emphasize the highest spending categories and their significance.',
    anomalies: 'Highlight any unusual or anomalous transactions.',
  };

  const instruction = focusInstructions[params.focusArea || 'overview'];

  const prompt = `You are a financial analyst. ${instruction}

Here is the expense data:
${JSON.stringify(params.data, null, 2)}

Provide a clear, insightful summary in 2-3 sentences.`;

  // Call Gemini to generate the summary
  const result = await generateText({
    model: google('gemini-2.5-flash'),
    prompt,
  });

  return {
    summary: result.text,
  };
};
