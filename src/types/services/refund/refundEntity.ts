import { IsoCodes } from "../payment/isocodes";

export interface IRefundEntity {
  id: string;
  entity: "refund";
  amount: number;
  currency: IsoCodes;
  payment_id: string;
  notes: { [key: string]: string };
  receipt: null;
  acquirer_data?: {
    arn?: string;
    rrn?: string;
    utr?: string;
  };
  created_at: number;
  batch_id: string;
  status: "processed" | "pending" | "failed";
  speed_processed: "normal" | "instant";
  speed_requested: "normal" | "optimum";
}
