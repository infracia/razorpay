import type { RawVirtualAccountEntity } from "./index.js";

export interface RawBankAccountEntity {
  account_number: string;
  bank_name: string;
  entity: "bank_account";
  id: string;
  ifsc: string;
  name: string;
  notes: Record<string, string>;
}

export interface RawUPIEntity {
  address: string;
  entity: "vpa";
  handle: string;
  id: string;
  username: string;
}

export type RawBankTransferEntity = {
  amount: number;
  bank_reference: string;
  close_by: number;
  closed_at: number;
  created_at: number;
  entity: "bank_transfer";
  id: string;
  mode: string;
  payer_bank_account: RawBankAccountEntity;
  payment_id: string;
  virtual_account: RawVirtualAccountEntity;
  virtual_account_id: string;
};
