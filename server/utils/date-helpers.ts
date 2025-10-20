export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const isBetween = (date: string, startDate?: string, endDate?: string): boolean => {
  if (!startDate && !endDate) return true;

  const d = parseDate(date);
  if (startDate && d < parseDate(startDate)) return false;
  if (endDate && d > parseDate(endDate)) return false;

  return true;
};