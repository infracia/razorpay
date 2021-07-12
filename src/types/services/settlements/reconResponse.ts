import { IsoCodes } from "../payment/isocodes";

interface IReconItem {
  entity_id: string;
  type: "payment" | "refund" | "transfer" | "adjustment";
  debit: number;
  credit: number;
  amount: number;
  currency: IsoCodes;
  fee: number;
  tax: number;
  on_hold: boolean;
  settled: boolean;
  created_at: number;
  settled_at: number;
  settlement_id: string;
  posted_at: null;
  credit_type: "default";
  description: string;
  notes: { [key: string]: string };
  payment_id: null;
  settlement_utr: string;
  order_id: string;
  order_receipt: string;
  method: "card" | "netbanking" | "wallet" | "emi" | "upi";
  card_network: string;
  card_issuer: string;
  card_type: "credit" | "debit";
  dispute_id: string;
}

export interface ISettlementReconResponse {
  entity: "collection";
  count: number;
  items: IReconItem[];
}
