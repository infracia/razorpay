import type { ISOCodes } from "../index.js";
import type { RawSettlementEntity } from "./settlement.js";

export interface RawTransferEntity {
  amount: number;
  amount_reversed: number;
  created_at: number;
  currency: ISOCodes;
  entity: "transfer";
  fees: number;
  id: string;
  linked_account_notes: Record<string, string>;
  notes: Record<string, string>;
  on_hold: boolean;
  on_hold_until: number;
  processed_at: number;
  recipient: string;
  recipient_settlement?: RawSettlementEntity;
  recipient_settlement_id?: number;
  source: string;
  tax: number;
}

export type RawTransferCreateResponse = {
  count: number;
  entity: "collection";
  items: RawTransferEntity[];
};
