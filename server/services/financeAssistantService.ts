import dotenv from 'dotenv';
import { FinanceAgent } from '../agent';
import { loadExpensesFromCSV } from '../utils/csv-loader';
import showdown from 'showdown';

dotenv.config();

const expenses = loadExpensesFromCSV('server/expenses_data/expenses_2024-2025.csv');
const agent = new FinanceAgent(expenses);

const convertMDtoHTML = (text: string) => {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(text);
  return html;
}

export const processFinanceQuestion = async (question: string): Promise<string> => {
  const answer = await agent.run(question);
  return convertMDtoHTML(answer);
};
