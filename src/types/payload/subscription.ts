import type { RawAddonPayload } from "./addon.js";

export interface RawSubscriptionPayload {
  addons?: RawAddonPayload[];
  customer_notify?: boolean;
  expire_by?: number;
  notes?: Record<string, string>;
  notify_info?: { notify_email: string; notify_phone?: string };
  offer_id?: string;
  plan_id: string;
  quantity?: number;
  start_at?: number;
  total_count: number;
}
