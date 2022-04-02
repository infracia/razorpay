import type { ISOCodes } from "../index.js";

export interface RawTransferPayload {
  account: string;
  amount: number;
  currency: ISOCodes;
  linked_account_notes: string[];
  notes: {
    [key: string]: string;
  };
  on_hold: number;
  on_hold_until: number;
}
