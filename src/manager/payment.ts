import type { Razorpay } from "../index.js";
import { Payment } from "../structure/index.js";
import type {
  RawPaymentDowntimeEntity,
  RawPaymentDowntimeItemEntity,
  RawPaymentEntity,
} from "../types/index.js";

export class PaymentManager {
  constructor(public client: Razorpay) {}

  /**
   * **Fetch Payment Downtime Details**
   *
   * Use the endpoint given below to fetch details of payment downtimes
   * ___
   * https://razorpay.com/docs/api/payments/downtime/#fetch-payment-downtime-details
   */
  downtimes(): Promise<RawPaymentDowntimeEntity> {
    return this.client.axios
      .get<RawPaymentDowntimeEntity>("/payments/downtimes")
      .then((res) => res.data);
  }

  /**
   * **Fetch Payment Downtime Details by Id**
   *
   * Usually, downtime webhook payloads are delivered within few seconds of the event. However, in some cases, this can be delayed by few minutes due to various reasons.
   *
   * If you have not received any webhook notifications due to some technical issues, you can use the Fetch Downtime by ID API to fetch the said downtime status.
   * ___
   * https://razorpay.com/docs/api/payments/downtime/#fetch-payment-downtime-details
   */
  downtimeById(id: string): Promise<RawPaymentDowntimeItemEntity> {
    return this.client.axios
      .get<RawPaymentDowntimeItemEntity>("/payments/downtimes/" + id)
      .then((res) => res.data);
  }

  /**
   * **Fetch a Payment**
   *
   * The following endpoint is used for retrieving a specific payment object using its ``id``
   * ___
   * https://razorpay.com/docs/api/payments/#fetch-a-payment
   */
  get(
    paymentId: string,
    params?: { "expand[]": "card" | "emi" | "offers" }
  ): Promise<Payment> {
    return this.client.axios
      .get<RawPaymentEntity>(`/payments/${paymentId}`, {
        params,
      })
      .then((res) => new Payment(this.client, res.data));
  }

  /**
   * **Fetch Payments of a Linked Account**
   *
   * You can use the following endpoint to fetch a list of all the payments received by a linked account.
   *
   * ___
   * https://razorpay.com/docs/api/route/#fetch-payments-of-a-linked-account
   */
  getPaymentForLinkedAccount(accountId: string): Promise<Payment[]> {
    return this.client.axios
      .get<{ items: RawPaymentEntity[] }>("/payments", {
        headers: {
          "X-Razorpay-Account": accountId,
        },
      })
      .then((res) => res.data.items.map((d) => new Payment(this.client, d)));
  }
}
