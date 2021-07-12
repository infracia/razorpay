export interface ISettlementEntity {
  id: string;
  entity: "settlement";
  amount: number;
  status: "processed" | "created" | "failed";
  fees: number;
  tax: number;
  utr: string;
  created_at: number;
}
