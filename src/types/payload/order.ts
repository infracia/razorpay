import type { ISOCodes } from "../index.js";
import type { RawTransferPayload } from "./transfer.js";

export interface RawOrderPayload {
  amount: number;
  currency: ISOCodes;
  notes?: Record<string, string>;
  partial_payment?: boolean;
  receipt?: string;

  /**
   * # transfer order creation
   * https://razorpay.com/docs/api/route/#create-transfers-from-orders
   */
  transfers?: RawTransferPayload[];
}
