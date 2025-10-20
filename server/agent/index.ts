import { generateText, TypedToolCall } from 'ai';
import { google } from '@ai-sdk/google';
import { Expense } from './types';

export class FinanceAgent {
  private expenses: Expense[];

  constructor(expenses: Expense[]) {
    this.expenses = expenses;
  }

  async run(query: string): Promise<string> {
    return 'Build me!';
  }
}
