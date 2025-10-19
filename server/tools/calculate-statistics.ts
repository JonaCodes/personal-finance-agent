import { Expense } from '../agent/types';

export interface CalculateStatisticsParams {
  metric: 'mean' | 'median' | 'total' | 'count' | 'min' | 'max';
}

export interface StatisticsResult {
  metric: string;
  value: number;
}

export const calculateStatistics = (
  _expenses: Expense[],
  params: CalculateStatisticsParams
): StatisticsResult => {
  // TODO: Implement statistics calculation
  // Calculate the requested metric on the provided expenses:
  //   - mean: average of all amounts
  //   - median: middle value when sorted
  //   - total: sum of all amounts
  //   - count: number of expenses
  //   - min: smallest amount
  //   - max: largest amount
  // This tool operates on whatever expenses are passed in - it does NOT filter

  return {
    metric: params.metric,
    value: 1234.56,
  };
};
