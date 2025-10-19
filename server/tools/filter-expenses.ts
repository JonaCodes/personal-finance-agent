import { Expense } from '../agent/types';

export interface FilterExpensesParams {
  startDate?: string;
  endDate?: string;
  category?: string;
  vendor?: string;
  minAmount?: number;
  maxAmount?: number;
}

export const filterExpenses = (_expenses: Expense[], _params: FilterExpensesParams): Expense[] => {
  // TODO: Implement expense filtering logic
  // This is the ONLY tool that filters expenses - all other tools operate on pre-filtered data
  // Filter by date range if startDate/endDate provided
  // Filter by category if provided
  // Filter by vendor if provided
  // Filter by amount range if minAmount/maxAmount provided
  // Return a filtered subset of expenses

  return [
    { date: '2024-01-15', amount: 150.50, category: 'groceries', vendor: 'Whole Foods' },
    { date: '2024-01-20', amount: 75.25, category: 'dining', vendor: 'Restaurant' },
  ];
};
