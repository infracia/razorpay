export interface RawSubscriptionEntity {
  auth_attempts: number;
  change_scheduled_at: null;
  charge_at: number;
  created_at: number;
  current_end: number;
  current_start: number;
  customer_notify: boolean;
  end_at: number;
  ended_at: number;
  entity: string;
  expire_by: number;
  has_scheduled_changes: false;
  id: string;
  notes: Record<string, string>;
  offer_id: string;
  paid_count: number;
  plan_id: string;
  quantity: number;
  remaining_count: number;
  short_url: string;
  source: string;
  start_at: number;
  status: string;
  total_count: number;
}
