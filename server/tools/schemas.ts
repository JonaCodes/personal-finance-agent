import { z } from 'zod';
import { tool } from 'ai';

export const tools = {
  filter_expenses: tool({
    description: 'Filter expenses based on date range, category, vendor, or amount criteria',
    inputSchema: z.object({
      startDate: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      endDate: z.string().optional().describe('End date in YYYY-MM-DD format'),
      category: z.string().optional().describe('Category to filter by'),
      vendor: z.string().optional().describe('Vendor name to filter by'),
      minAmount: z.number().optional().describe('Minimum expense amount'),
      maxAmount: z.number().optional().describe('Maximum expense amount'),
    }),
  }),

  aggregate_expenses: tool({
    description: 'Group and aggregate expenses by category, vendor, month, or year',
    inputSchema: z.object({
      groupBy: z.enum(['category', 'vendor', 'month', 'year']).describe('Field to group expenses by'),
      startDate: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      endDate: z.string().optional().describe('End date in YYYY-MM-DD format'),
    }),
  }),

  calculate_statistics: tool({
    description: 'Calculate statistical metrics (mean, median, total, count, min, max) for expenses',
    inputSchema: z.object({
      metric: z.enum(['mean', 'median', 'total', 'count', 'min', 'max']).describe('Statistical metric to calculate'),
      category: z.string().optional().describe('Category to calculate statistics for'),
      startDate: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      endDate: z.string().optional().describe('End date in YYYY-MM-DD format'),
    }),
  }),

  detect_anomalies: tool({
    description: 'Detect unusual spending patterns or outliers in expense data',
    inputSchema: z.object({
      category: z.string().optional().describe('Category to detect anomalies in'),
      thresholdMultiplier: z.number().optional().describe('Standard deviation multiplier for anomaly detection (default: 2)'),
    }),
  }),

  compare_datasets: tool({
    description: 'Compare spending between two different time periods',
    inputSchema: z.object({
      period1Start: z.string().describe('Start date of first period in YYYY-MM-DD format'),
      period1End: z.string().describe('End date of first period in YYYY-MM-DD format'),
      period2Start: z.string().describe('Start date of second period in YYYY-MM-DD format'),
      period2End: z.string().describe('End date of second period in YYYY-MM-DD format'),
      compareBy: z.enum(['total', 'category', 'average']).describe('What to compare between periods'),
    }),
  }),

  generate_summary: tool({
    description: 'Generate a natural language summary by calling an LLM with processed expense data. Use this after getting data from other tools to create human-readable insights.',
    inputSchema: z.object({
      data: z.record(z.string(), z.unknown()).describe('Processed expense data to summarize (from other tools)'),
      focusArea: z.enum(['overview', 'spending_patterns', 'top_categories', 'anomalies']).optional().describe('Area to focus the summary on'),
    }),
  }),
};
