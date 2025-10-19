import { Expense } from '../agent/types';

export interface DetectAnomaliesParams {
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
  // Calculate mean and standard deviation on the provided expenses
  // Find expenses that are > (mean + thresholdMultiplier * stdDev)
  // Default thresholdMultiplier is 2
  // Return expenses that are statistical outliers
  // This tool operates on whatever expenses are passed in - it does NOT filter

  return [
    {
      expense: { date: '2024-01-15', amount: 850.00, category: 'shopping', vendor: 'Electronics Store' },
      reason: 'Amount significantly higher than average',
      deviation: 3.2,
    },
  ];
};
