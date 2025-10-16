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

export const getMonthRange = (date: string): { start: string; end: string } => {
  const d = parseDate(date);
  const year = d.getFullYear();
  const month = d.getMonth();

  return {
    start: `${year}-${String(month + 1).padStart(2, '0')}-01`,
    end: `${year}-${String(month + 1).padStart(2, '0')}-${new Date(year, month + 1, 0).getDate()}`,
  };
};

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
