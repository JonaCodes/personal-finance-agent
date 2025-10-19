import { z } from 'zod';
import { tool } from 'ai';

export const tools = {
  filter_expenses: tool({
    description: 'Returns a filtered subset of expenses based on date range, category, vendor, or amount criteria. You will usually use this FIRST to narrow down expenses before using other analysis tools.',
    inputSchema: z.object({
      startDate: z.string().optional().describe('Start date in YYYY-MM-DD format'),
      endDate: z.string().optional().describe('End date in YYYY-MM-DD format'),
      category: z.string().optional().describe('Category to filter by (e.g., "groceries", "dining")'),
      vendor: z.string().optional().describe('Vendor/merchant name to filter by'),
      minAmount: z.number().optional().describe('Minimum expense amount in NIS'),
      maxAmount: z.number().optional().describe('Maximum expense amount in NIS'),
    }),
  }),

  aggregate_expenses: tool({
    description: 'Groups expenses and calculates totals and counts for each group. Always use filter_expenses first if you need to limit the date range or category.',
    inputSchema: z.object({
      groupBy: z.enum(['category', 'vendor', 'month', 'year']).describe('How to group the expenses: by category (e.g., "groceries"), vendor (e.g., "Whole Foods"), month (e.g., "2024-10"), or year (e.g., "2024")'),
    }),
  }),

  calculate_statistics: tool({
    description: 'Calculates a single statistical metric (mean, median, total, count, min, or max) on a set of expenses. Use filter_expenses first if you need to analyze a specific category or date range.',
    inputSchema: z.object({
      metric: z.enum(['mean', 'median', 'total', 'count', 'min', 'max']).describe('Which statistic to calculate: mean (average), median (middle value), total (sum), count (number of expenses), min (smallest), max (largest)'),
    }),
  }),

  detect_anomalies: tool({
    description: 'Identifies unusual or outlier expenses using statistical analysis (standard deviation method). Use filter_expenses first if you want to detect anomalies within a specific category or time period.',
    inputSchema: z.object({
      thresholdMultiplier: z.number().optional().describe('How many standard deviations from the mean to consider anomalous. Default is 2 (expenses more than 2 std devs above mean). Higher = fewer anomalies detected.'),
    }),
  }),

  compare_datasets: tool({
    description: 'Compares spending between two time periods and calculates differences and percentage changes. This tool handles the date filtering internally - just provide the two date ranges to compare.',
    inputSchema: z.object({
      period1Start: z.string().describe('Start date of first period in YYYY-MM-DD format'),
      period1End: z.string().describe('End date of first period in YYYY-MM-DD format'),
      period2Start: z.string().describe('Start date of second period in YYYY-MM-DD format'),
      period2End: z.string().describe('End date of second period in YYYY-MM-DD format'),
      compareBy: z.enum(['total', 'category', 'average']).describe('What to compare: "total" (overall spending), "category" (breakdown by category), or "average" (average transaction size)'),
    }),
  }),

  generate_summary: tool({
    description: 'Generates a natural language summary by calling an LLM with processed expense data. Use this LAST after gathering data with other tools to create human-readable insights.',
    inputSchema: z.object({
      data: z.record(z.string(), z.unknown()).describe('The processed expense data to summarize (output from other tools)'),
      prompt: z.string().describe('Instructions for what kind of summary to generate. Be specific about what insights you want highlighted based on the user\'s original question.'),
    }),
  }),
};