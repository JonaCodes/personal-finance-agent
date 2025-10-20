import { z } from 'zod';
import { tool } from 'ai';

export const FILTER_RESULT_LIMIT = 5

const filterSchema = {
  startDate: z.string().optional().describe('Start date in YYYY-MM-DD format'),
  endDate: z.string().optional().describe('End date in YYYY-MM-DD format'),
  category: z.enum(['utilities', 'health', 'subscriptions', 'transportation', 'shopping', 'dining', 'groceries', 'entertainment']).optional().describe('Category to filter by'),
  vendor: z.string().optional().describe('Vendor/merchant name to filter by'),
  minAmount: z.number().optional().describe('Minimum expense amount'),
  maxAmount: z.number().optional().describe('Maximum expense amount'),

  excludeAnomalies: z.boolean().optional().describe('If true, exclude statistical outliers from results'),
  anomalyThreshold: z.number().optional().describe('Standard deviation threshold for anomaly detection (default 2)'),
};

export const tools = {
  filter_expenses: tool({
    description: `Returns a filtered subset of expenses based on criteria. Only the first ${FILTER_RESULT_LIMIT} results are added to the memory, and the rest are truncated to save context. If relevant, let the user know that the results have been truncated.`,
    inputSchema: z.object(filterSchema)
  }),

  aggregate_expenses: tool({
    description: 'Groups expenses and calculates totals, counts, and averages for each group. All filter parameters are optional - this tool can filter internally.',
    inputSchema: z.object({
      groupBy: z.enum(['category', 'vendor', 'month', 'year']).describe('How to group: category (e.g., "groceries"), vendor (e.g., "Whole Foods"), month (e.g., "2024-10"), or year (e.g., "2024")'),
      ...filterSchema
    }),
  }),

  calculate_statistics: tool({
    description: 'Calculates a statistical metric (mean, median, total, count, min, max) on expenses. All filter parameters are optional - this tool can filter internally.',
    inputSchema: z.object({
      metric: z.enum(['mean', 'median', 'total', 'count', 'min', 'max']).describe('Which statistic: mean (average), median (middle value), total (sum), count (number), min (smallest), max (largest)'),
      ...filterSchema
    }),
  }),
};
