import { Expense } from '../agent/types';

export interface CalculateStatisticsParams {
  metric: 'mean' | 'median' | 'total' | 'count' | 'min' | 'max';
  category?: string;
  startDate?: string;
  endDate?: string;
}

export interface StatisticsResult {
  metric: string;
  value: number;
  category?: string;
  dateRange?: {
    start?: string;
    end?: string;
  };
}

export const calculateStatistics = (
  _expenses: Expense[],
  params: CalculateStatisticsParams
): StatisticsResult => {
  // TODO: Implement statistics calculation
  // Filter by category if provided
  // Filter by date range if provided
  // Calculate the requested metric:
  //   - mean: average of all amounts
  //   - median: middle value when sorted
  //   - total: sum of all amounts
  //   - count: number of expenses
  //   - min: smallest amount
  //   - max: largest amount

  return {
    metric: params.metric,
    value: 1234.56,
    category: params.category,
    dateRange: {
      start: params.startDate,
      end: params.endDate,
    },
  };
};
