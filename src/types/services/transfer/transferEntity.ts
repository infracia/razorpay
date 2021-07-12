import { IsoCodes } from "../payment/isocodes";

export interface ITransferEntity {
  id: string;
  entity: "transfer";
  source: string;
  recipient: string;
  amount: number;
  currency: IsoCodes;
  amount_reversed: number;
  notes: { [key: string]: string };
  fees: number;
  tax: number;
  on_hold: boolean;
  on_hold_until: number;
  recipient_settlement_id: number;
  created_at: number;
  linked_account_notes: { [key: string]: string };
  processed_at: number;
}
