export interface ISubscriptionEntity {
  id: string;
  entity: string;
  plan_id: string;
  status: string;
  current_start: number;
  current_end: number;
  ended_at: number;
  quantity: number;
  notes: { [key: string]: string };
  charge_at: number;
  start_at: number;
  end_at: number;
  auth_attempts: number;
  total_count: number;
  paid_count: number;
  customer_notify: boolean;
  created_at: number;
  expire_by: number;
  short_url: string;
  has_scheduled_changes: false;
  change_scheduled_at: null;
  source: string;
  offer_id: string;
  remaining_count: number;
}
