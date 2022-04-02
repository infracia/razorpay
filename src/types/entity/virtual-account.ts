import type { RawBankAccountEntity, RawUPIEntity } from "./index.js";

export interface RawVirtualAccountEntity {
  amount_paid: number;
  close_by: number;
  closed_at: number;
  created_at: number;
  customer_id: string;
  description: string;
  entity: "virtual_account";
  id: string;
  name: string;
  notes: Record<string, string>;
  receivers: (RawBankAccountEntity | RawUPIEntity)[];
  status: string;
}
