import { IPaymentDowntimeEntity } from "../services/payment/paymentDowntimeEntity";
import { IPaymentEntity } from "../services/payment/paymentEntity";

export interface IWebhookPayment {
  entity: "event";
  account_id: string;
  event: "payment.authorized" | "payment.captured" | "payment.failed";
  contains: ["payment"];
  payload: {
    payment: IPaymentEntity;
  };
  created_at: number;
}

export interface IWebhookPaymentDowntime {
  entity: "event";
  account_id: string;
  event: "payment.downtime.started" | "payment.downtime.resolved";
  contains: ["payment.downtime"];
  payload: {
    "payment.downtime": IPaymentDowntimeEntity;
  };
  created_at: number;
}
