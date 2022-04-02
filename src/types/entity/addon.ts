import type { ISOCodes } from "../index.js";

export interface RawAddonEntity {
  created_at: number;
  entity: "addon";
  id: string;
  invoice_id: null | string;
  item: RawAddonItemEntity;
  quantity: number;
  subscription_id: string;
}

export interface RawAddonItemEntity {
  active: true;
  amount: number;
  created_at: number;
  currency: ISOCodes;
  description: string;
  hsn_code: null;
  id: string;
  name: string;
  sac_code: null;
  tax_group_id: null;
  tax_id: null;
  tax_inclusive: boolean;
  tax_rate: null;
  type: "addon";
  unit: null;
  unit_amount: number;
  updated_at: number;
}
