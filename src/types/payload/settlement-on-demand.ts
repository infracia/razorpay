export interface RawSettlementOnDemandPayload {
  amount: number;
  description?: string;
  notes: Record<string, string>;
  settle_full_balance?: boolean;
}
