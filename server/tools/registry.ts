import { Expense } from '../agent/types';
import { filterExpenses } from './filter-expenses';
import { aggregateExpenses } from './aggregate-expenses';
import { calculateStatistics } from './calculate-statistics';
import { detectAnomalies } from './detect-anomalies';
import { compareDatasets } from './compare-datasets';
import { generateSummary } from './generate-summary';

type ToolFunction = (expenses: Expense[], args: any) => Promise<unknown> | unknown;

export const toolFunctions: Record<string, ToolFunction> = {
  filter_expenses: filterExpenses,
  aggregate_expenses: aggregateExpenses,
  calculate_statistics: calculateStatistics,
  detect_anomalies: detectAnomalies,
  compare_datasets: compareDatasets,
  generate_summary: generateSummary,
};
