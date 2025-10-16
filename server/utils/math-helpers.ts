export const sum = (numbers: number[]): number => {
  return numbers.reduce((acc, num) => acc + num, 0);
};

export const mean = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;
  return sum(numbers) / numbers.length;
};

export const median = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  return sorted[mid];
};

export const standardDeviation = (numbers: number[]): number => {
  if (numbers.length === 0) return 0;

  const avg = mean(numbers);
  const squaredDiffs = numbers.map(num => Math.pow(num - avg, 2));
  const variance = mean(squaredDiffs);

  return Math.sqrt(variance);
};

export const min = (numbers: number[]): number => {
  return Math.min(...numbers);
};

export const max = (numbers: number[]): number => {
  return Math.max(...numbers);
};
