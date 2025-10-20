import { Expense } from '../../agent/types';
import { filterExpenses } from './filter-expenses';
import { BaseFilterParams, FilterMetadata } from './shared-types';
import { mean, median, sum, min, max } from '../../utils/math-helpers';

export interface CalculateStatisticsParams extends BaseFilterParams {
  metric: 'mean' | 'median' | 'total' | 'count' | 'min' | 'max';
}

export interface StatisticsResult {
  metric: string;
  value: number;
  metadata: {
    totalExpenses: number;
    filtersApplied: FilterMetadata;
  };
}

export const calculateStatistics = (
  expenses: Expense[],
  params: CalculateStatisticsParams
): StatisticsResult => {
  const { metric, startDate, endDate, category, vendor, minAmount, maxAmount, excludeAnomalies, anomalyThreshold } = params;

  const filtered = filterExpenses(expenses, {
    startDate,
    endDate,
    category,
    vendor,
    minAmount,
    maxAmount,
    excludeAnomalies,
    anomalyThreshold,
  });

  const amounts = filtered.expenses.map(expense => expense.amount);

  let value: number;

  switch (metric) {
    case 'mean':
      value = mean(amounts);
      break;
    case 'median':
      value = median(amounts);
      break;
    case 'total':
      value = sum(amounts);
      break;
    case 'count':
      value = amounts.length;
      break;
    case 'min':
      value = amounts.length > 0 ? min(amounts) : 0;
      break;
    case 'max':
      value = amounts.length > 0 ? max(amounts) : 0;
      break;
    default:
      value = 0;
  }

  return {
    metric: params.metric,
    value,
    metadata: {
      totalExpenses: filtered.expenses.length,
      filtersApplied: filtered.metadata.filtersApplied,
    },
  };
};
