import { IsoCodes } from "../payment/isocodes";

export interface ISettlementOnDemandPayout {
  id: string;
  entity: "settlement.ondemand_payout";
  initiated_at: number;
  processed_at: number;
  reversed_at: number;
  amount: number;
  amount_settled: number;
  fees: number;
  tax: number;
  utr: string;
  status: "created" | "processed" | "initiated" | "reversed";
  created_at: number;
}

export interface ISettlementOnDemand {
  id: string;
  entity: "settlement.ondemand";
  amount_requested: number;
  amount_settled: number;
  amount_pending: number;
  amount_reversed: number;
  fees: number;
  tax: number;
  currency: IsoCodes;
  settle_full_balance: boolean;
  status:
    | "initiated"
    | "created"
    | "partially_processed"
    | "processed"
    | "reversed";
  description: string;
  notes: { [key: string]: string };
  created_at: number;
  ondemand_payouts: {
    entity: "collection";
    count: number;
    items: ISettlementOnDemandPayout[];
  };
}
