export interface RawPlanPayload {
  interval: number;
  item: RawPlanItemPayload;
  notes?: Record<string, string>;
  period: "daily" | "weekly" | "monthly" | "yearly";
}

export interface RawPlanItemPayload {
  amount: number;
  currency: string;
  description?: string;
  name: string;
}
