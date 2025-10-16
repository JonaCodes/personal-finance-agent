import { Expense } from '../agent/types';

export interface DetectAnomaliesParams {
  category?: string;
  thresholdMultiplier?: number;
}

export interface Anomaly {
  expense: Expense;
  reason: string;
  deviation: number;
}

export const detectAnomalies = (
  _expenses: Expense[],
  _params: DetectAnomaliesParams
): Anomaly[] => {
  // TODO: Implement anomaly detection
  // Filter by category if provided
  // Calculate mean and standard deviation
  // Find expenses that are > (mean + thresholdMultiplier * stdDev)
  // Default thresholdMultiplier is 2
  // Return expenses that are statistical outliers

  return [
    {
      expense: { date: '2024-01-15', amount: 850.00, category: 'shopping', vendor: 'Electronics Store' },
      reason: 'Amount significantly higher than average for this category',
      deviation: 3.2,
    },
  ];
};
