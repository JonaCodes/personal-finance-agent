import { Expense } from '../agent/types';
import { mean, standardDeviation } from './math-helpers';

// Naive implementation of statistical outlier detection
export const detectAnomalies = (
    expenses: Expense[],
    thresholdMultiplier: number
): Expense[] => {
    const expenseAmounts = expenses.map(exp => exp.amount);

    const meanExpense = mean(expenseAmounts);
    const stdDev = standardDeviation(expenseAmounts);

    const threshold = meanExpense + (thresholdMultiplier * stdDev);
    return expenses.filter(exp => exp.amount > threshold);
};
