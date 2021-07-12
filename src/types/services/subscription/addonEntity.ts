import { IsoCodes } from "../payment/isocodes";

export interface IAddonEntity {
  id: string;
  entity: "addon";
  item: {
    id: string;
    active: true;
    name: string;
    description: string;
    amount: number;
    unit_amount: number;
    currency: IsoCodes;
    type: "addon";
    unit: null;
    tax_inclusive: boolean;
    hsn_code: null;
    sac_code: null;
    tax_rate: null;
    tax_id: null;
    tax_group_id: null;
    created_at: number;
    updated_at: number;
  };
  quantity: number;
  created_at: number;
  subscription_id: string;
  invoice_id: null | string;
}
