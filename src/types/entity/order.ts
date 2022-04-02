import type { ISOCodes } from "../index.js";

export interface RawOrderEntity {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: ISOCodes;
  entity: "order";
  id: string;
  notes: Record<string, string>;
  receipt: string;
  status: "created" | "attempted" | "paid";
}
