import { Expense } from '../agent/types';

export interface CompareDatasetsParams {
  period1Start: string;
  period1End: string;
  period2Start: string;
  period2End: string;
  compareBy: 'total' | 'category' | 'average';
}

export interface ComparisonResult {
  period1: {
    start: string;
    end: string;
    value: number | Record<string, number>;
  };
  period2: {
    start: string;
    end: string;
    value: number | Record<string, number>;
  };
  difference: number | Record<string, number>;
  percentageChange: number | Record<string, number>;
}

export const compareDatasets = (
  _expenses: Expense[],
  params: CompareDatasetsParams
): ComparisonResult => {
  // TODO: Implement dataset comparison
  // Split expenses into two periods based on dates
  // Compare based on the 'compareBy' parameter:
  //   - 'total': compare total spending in each period
  //   - 'category': compare spending by category
  //   - 'average': compare average transaction amounts
  // Calculate difference and percentage change

  if (params.compareBy === 'total') {
    return {
      period1: {
        start: params.period1Start,
        end: params.period1End,
        value: 2500.00,
      },
      period2: {
        start: params.period2Start,
        end: params.period2End,
        value: 3200.00,
      },
      difference: 700.00,
      percentageChange: 28,
    };
  }

  return {
    period1: {
      start: params.period1Start,
      end: params.period1End,
      value: { groceries: 500, dining: 300 },
    },
    period2: {
      start: params.period2Start,
      end: params.period2End,
      value: { groceries: 600, dining: 400 },
    },
    difference: { groceries: 100, dining: 100 },
    percentageChange: { groceries: 20, dining: 33.3 },
  };
};
