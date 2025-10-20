import { Expense } from '../../agent/types';
import { BaseFilterParams, FilterMetadata, buildFilterMetadata } from './shared-types';
import { isBetween } from '../../utils/date-helpers';
import { detectAnomalies } from '../../utils/anomaly-helper';

export interface FilterExpensesResult {
  expenses: Expense[];
  metadata: {
    totalMatching: number;
    filtersApplied: FilterMetadata;
  };
}

export const filterExpenses = (
  expenses: Expense[],
  params: BaseFilterParams
): FilterExpensesResult => {
  const { startDate, endDate, category, vendor, minAmount, maxAmount, excludeAnomalies, anomalyThreshold } = params;

  let filtered = expenses;

  if (startDate || endDate) {
    filtered = filtered.filter(expense => isBetween(expense.date, startDate, endDate));
  }

  if (category) {
    filtered = filtered.filter(expense =>
      expense.category?.toLowerCase() === category.toLowerCase()
    );
  }

  if (vendor) {
    const vendorLower = vendor.toLowerCase();
    filtered = filtered.filter(expense =>
      expense.vendor.toLowerCase().includes(vendorLower)
    );
  }

  if (minAmount !== undefined) {
    filtered = filtered.filter(expense => expense.amount >= minAmount);
  }

  if (maxAmount !== undefined) {
    filtered = filtered.filter(expense => expense.amount <= maxAmount);
  }

  if (excludeAnomalies && filtered.length > 0) {
    const threshold = anomalyThreshold ?? 2;
    const anomalousExpenses = detectAnomalies(filtered, threshold);

    const anomalySet = new Set(anomalousExpenses);
    filtered = filtered.filter(expense => !anomalySet.has(expense));
  }

  return {
    expenses: filtered,
    metadata: {
      totalMatching: filtered.length,
      filtersApplied: buildFilterMetadata(params),
    },
  };
};
