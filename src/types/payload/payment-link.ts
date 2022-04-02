import type { ISOCodes } from "../index.js";

export interface RawPaymentLinkPayload {
  accept_partial: boolean;
  amount: number;
  callback_method: string;
  callback_url: string;
  currency: ISOCodes;
  customer: {
    contact: string;
    email: string;
    name: string;
  };
  description: string;
  expire_by: number;
  first_min_partial_amount: number;
  notes: {
    policy_name: string;
  };
  notify: {
    email: boolean;
    sms: boolean;
  };
  reference_id: string;
  reminder_enable: boolean;
}
