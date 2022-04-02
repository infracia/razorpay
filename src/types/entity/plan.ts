export interface RawPlanEntity {
  created_at: number;
  entity: "plan";
  id: string;
  interval: number;
  item: RawPlanItemEntity;
  notes: Record<string, string>;
  period: string;
}

export interface RawPlanItemEntity {
  active: true;
  amount: number;
  created_at: number;
  currency: string;
  description: string;
  hsn_code: null;
  id: string;
  name: string;
  sac_code: null;
  tax_group_id: null;
  tax_id: null;
  tax_inclusive: false;
  tax_rate: null;
  type: string;
  unit: null;
  unit_amount: number;
  updated_at: number;
}
