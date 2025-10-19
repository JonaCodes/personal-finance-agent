
import { FinanceAgent } from '../agent';
import { loadExpensesFromCSV } from '../utils/csv-loader';
import { Expense } from '../agent/types';
import { sleep } from "../utils/general";


let cachedExpenses: Expense[] | null = null;

const getExpenses = (): Expense[] => {
  if (!cachedExpenses) {
    cachedExpenses = loadExpensesFromCSV('server/expenses_data/expenses_2024-2025.csv');
  }
  return cachedExpenses;
};

export const processFinanceQuestion = async (question: string): Promise<string> => {
  console.log('Received question:', question);
  await sleep(1000) // to simulate loading

  const expenses = getExpenses();
  const agent = new FinanceAgent(question, expenses);
  const answer = await agent.run();

  return answer;
};
