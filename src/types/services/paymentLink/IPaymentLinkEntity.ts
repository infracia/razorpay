import { IsoCodes } from "../payment/isocodes";

export interface IPaymentLinkEntity {
  accept_partial: boolean;
  amount: number;
  amount_paid: number;
  callback_method: string;
  callback_url: string;
  cancelled_at: number;
  created_at: number;
  currency: IsoCodes;
  customer: {
    contact: string;
    email: string;
    name: string;
  };
  description: string;
  expire_by: number;
  expired_at: number;
  first_min_partial_amount: number;
  id: string;
  notes: { [key: string]: string };
  notify: {
    email: true;
    sms: true;
  };
  payments: [];
  reference_id: string;
  reminder_enable: boolean;
  reminders: {
    status: string;
  };
  short_url: string;
  source: string;
  source_id: string;
  status: string;
  updated_at: number;
  user_id: string;
}
