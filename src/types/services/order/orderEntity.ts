import { IsoCodes } from "../payment/isocodes";

export interface IOrderEntity {
  id: string;
  entity: "order";
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: IsoCodes;
  receipt: string;
  status: "created" | "attempted" | "paid";
  attempts: number;
  notes: { [key: string]: string };
  created_at: number;
}
