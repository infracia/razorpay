export interface IPlanEntity {
  id: string;
  entity: "plan";
  interval: number;
  period: string;
  item: {
    id: string;
    active: true;
    name: string;
    description: string;
    amount: number;
    unit_amount: number;
    currency: string;
    type: string;
    unit: null;
    tax_inclusive: false;
    hsn_code: null;
    sac_code: null;
    tax_rate: null;
    tax_id: null;
    tax_group_id: null;
    created_at: number;
    updated_at: number;
  };
  notes: { [key: string]: string };
  created_at: number;
}
