import type { ISOCodes } from "../index.js";

export interface RawRefundEntity {
  acquirer_data?: {
    arn?: string;
    rrn?: string;
    utr?: string;
  };
  amount: number;
  batch_id: string;
  created_at: number;
  currency: ISOCodes;
  entity: "refund";
  id: string;
  notes: Record<string, string>;
  payment_id: string;
  receipt: string | null;
  speed_processed: "normal" | "instant";
  speed_requested: "normal" | "optimum";
  status: "processed" | "pending" | "failed";
}
