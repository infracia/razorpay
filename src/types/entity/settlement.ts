import type { ISOCodes } from "../index.js";

export interface RawSettlementEntity {
  amount: number;
  created_at: number;
  entity: "settlement";
  fees: number;
  id: string;
  status: "processed" | "created" | "failed";
  tax: number;
  utr: string;
}

export interface RawSettlementReconItemEntity {
  amount: number;
  card_issuer: string;
  card_network: string;
  card_type: "credit" | "debit";
  created_at: number;
  credit: number;
  credit_type: "default";
  currency: ISOCodes;
  debit: number;
  description: string;
  dispute_id: string;
  entity_id: string;
  fee: number;
  method: "card" | "netbanking" | "wallet" | "emi" | "upi";
  notes: Record<string, string>;
  on_hold: boolean;
  order_id: string;
  order_receipt: string;
  payment_id: null;
  posted_at: null;
  settled: boolean;
  settled_at: number;
  settlement_id: string;
  settlement_utr: string;
  tax: number;
  type: "payment" | "refund" | "transfer" | "adjustment";
}

export interface RawSettlementReconEntity {
  count: number;
  entity: "collection";
  items: RawSettlementReconItemEntity[];
}

export interface RawSettlementOnDemandPayoutEntity {
  amount: number;
  amount_settled: number;
  created_at: number;
  entity: "settlement.ondemand_payout";
  fees: number;
  id: string;
  initiated_at: number;
  processed_at: number;
  reversed_at: number;
  status: "created" | "processed" | "initiated" | "reversed";
  tax: number;
  utr: string;
}

export interface RawSettlementOnDemandEntity {
  amount_pending: number;
  amount_requested: number;
  amount_reversed: number;
  amount_settled: number;
  created_at: number;
  currency: ISOCodes;
  description: string;
  entity: "settlement.ondemand";
  fees: number;
  id: string;
  notes: Record<string, string>;
  ondemand_payouts: {
    count: number;
    entity: "collection";
    items: RawSettlementOnDemandPayoutEntity[];
  };
  settle_full_balance: boolean;
  status:
    | "initiated"
    | "created"
    | "partially_processed"
    | "processed"
    | "reversed";
  tax: number;
}
