export interface RawDemandPayload {
  amount: number;
  description?: string;
  notes: Record<string, string>;
  settle_full_balance?: boolean;
}
