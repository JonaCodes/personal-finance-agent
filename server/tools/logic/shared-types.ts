export interface BaseFilterParams {
  startDate?: string;
  endDate?: string;
  category?: string;
  vendor?: string;
  minAmount?: number;
  maxAmount?: number;
  excludeAnomalies?: boolean;
  anomalyThreshold?: number;
}

export interface FilterMetadata {
  dateRange?: string;
  category?: string;
  vendor?: string;
  amountRange?: string;
  excludedAnomalies: boolean;
}

export function buildFilterMetadata(params: BaseFilterParams): FilterMetadata {
  return {
    dateRange: params.startDate && params.endDate
      ? `${params.startDate} to ${params.endDate}`
      : undefined,
    category: params.category,
    vendor: params.vendor,
    amountRange: params.minAmount !== undefined && params.maxAmount !== undefined
      ? `${params.minAmount} to ${params.maxAmount}`
      : undefined,
    excludedAnomalies: params.excludeAnomalies ?? false,
  };
}
