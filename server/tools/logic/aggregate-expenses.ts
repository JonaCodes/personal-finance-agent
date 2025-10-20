import { Expense } from '../../agent/types';
import { filterExpenses } from './filter-expenses';
import { BaseFilterParams, FilterMetadata } from './shared-types';
import { groupBy } from '../../utils/array-helpers';
import { sum } from '../../utils/math-helpers';

export interface AggregateExpensesParams extends BaseFilterParams {
  groupBy: 'category' | 'vendor' | 'month' | 'year';
  // All filter parameters inherited from BaseFilterParams
}

export interface AggregateResult {
  group: string;
  total: number;
  count: number;
  average: number;
}

export interface AggregateExpensesResult {
  results: AggregateResult[];
  metadata: {
    groupBy: string;
    totalExpenses: number;
    filtersApplied: FilterMetadata;
  };
}

export const aggregateExpenses = (
  expenses: Expense[],
  params: AggregateExpensesParams
): AggregateExpensesResult => {
  const { groupBy: groupByField, startDate, endDate, category, vendor, minAmount, maxAmount, excludeAnomalies, anomalyThreshold } = params;

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

  let keyFunction: (expense: Expense) => string;

  switch (groupByField) {
    case 'category':
      keyFunction = (expense) => expense.category ?? 'uncategorized';
      break;
    case 'vendor':
      keyFunction = (expense) => expense.vendor;
      break;
    case 'month':
      // Extract YYYY-MM from date (assuming YYYY-MM-DD format)
      keyFunction = (expense) => expense.date.substring(0, 7);
      break;
    case 'year':
      // Extract YYYY from date
      keyFunction = (expense) => expense.date.substring(0, 4);
      break;
  }

  const grouped = groupBy(filtered.expenses, keyFunction);

  const results: AggregateResult[] = Object.entries(grouped).map(([groupName, groupExpenses]) => {
    const amounts = groupExpenses.map(expense => expense.amount);
    const total = sum(amounts);
    const count = groupExpenses.length;
    const average = count > 0 ? total / count : 0;

    return {
      group: groupName,
      total,
      count,
      average,
    };
  });

  results.sort((a, b) => b.total - a.total);

  return {
    results,
    metadata: {
      groupBy: params.groupBy,
      totalExpenses: filtered.expenses.length,
      filtersApplied: filtered.metadata.filtersApplied,
    },
  };
};
