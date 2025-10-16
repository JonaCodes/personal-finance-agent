import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Expense } from '../agent/types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadExpensesFromCSV = (csvPath: string): Expense[] => {
  const fullPath = path.resolve(__dirname, '../../', csvPath);
  const csvContent = fs.readFileSync(fullPath, 'utf-8');
  const lines = csvContent.trim().split('\n');
  const expenses: Expense[] = [];

  for (let i = 1; i < lines.length; i++) {
    const [date, amount, category, vendor] = lines[i].split(',');
    expenses.push({
      date: date.trim(),
      amount: parseFloat(amount),
      category: category && category.trim() !== '' ? category.trim() : null,
      vendor: vendor.trim(),
    });
  }

  return expenses;
};
