import { Expense } from '../agent/types';
import { filterExpenses } from './logic/filter-expenses';
import { aggregateExpenses } from './logic/aggregate-expenses';
import { calculateStatistics } from './logic/calculate-statistics';

type ToolFunction = (expenses: Expense[], args: any) => Promise<unknown> | unknown;

export const toolFunctions: Record<string, ToolFunction> = {
  filter_expenses: filterExpenses,
  aggregate_expenses: aggregateExpenses,
  calculate_statistics: calculateStatistics,
};
