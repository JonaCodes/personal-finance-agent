import { Expense } from '../agent/types';

export interface AggregateExpensesParams {
  groupBy: 'category' | 'vendor' | 'month' | 'year';
}

export interface AggregateResult {
  group: string;
  total: number;
  count: number;
}

export const aggregateExpenses = (
  _expenses: Expense[],
  _params: AggregateExpensesParams
): AggregateResult[] => {
  // TODO: Implement aggregation logic
  // Group the provided expenses by the specified field (category, vendor, month, or year)
  // Calculate total amount and count for each group
  // Sort by total descending
  // This tool operates on whatever expenses are passed in - it does NOT filter

  return [
    { group: 'groceries', total: 450.75, count: 12 },
    { group: 'dining', total: 320.50, count: 8 },
    { group: 'transportation', total: 150.00, count: 5 },
  ];
};
