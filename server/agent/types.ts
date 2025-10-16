export interface Expense {
  date: string;
  amount: number;
  category: string | null;
  vendor: string;
}

export interface ToolResult {
  toolCallId: string;
  toolName: string;
  result: unknown;
}
