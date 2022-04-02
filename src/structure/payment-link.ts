import type { Razorpay } from "../index.js";
import type {
  RawPaymentLinkEntity,
  RawPaymentLinkPayload,
} from "../types/index.js";

export class PaymentLink {
  constructor(public client: Razorpay, public raw: RawPaymentLinkEntity) {}

  /**
   * **Cancel Payment Link**
   *
   * You can cancel a Payment Link with given ID using the following endpoint:
   * ___
   * https://razorpay.com/docs/api/payment-links/new/#cancel-payment-link
   */
  cancel(): Promise<PaymentLink> {
    return this.client.axios
      .post<RawPaymentLinkEntity>(`payment-links/${this.raw.id}/cancel`)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * **Send or Resend Notifications**
   *
   * You can send or resend notifications to customer via email and SMS, using following endpoint
   * ___
   * https://razorpay.com/docs/api/payment-links/new/#send-or-resend-notifications
   */
  sendNotification(mode: "sms" | "email"): Promise<{ success: boolean }> {
    return this.client.axios
      .post<{ success: boolean }>(
        `payment-links/${this.raw.id}/notify_by/${mode}`
      )
      .then((res) => res.data);
  }

  /**
   * **Update Payment Link**
   *
   * Use the below endpoint to update the Payment Link
   * ___
   * https://razorpay.com/docs/api/payment-links/new/#update-payment-link
   */
  update(data: RawPaymentLinkPayload): Promise<PaymentLink> {
    return this.client.axios
      .post<RawPaymentLinkEntity>(`payment-links/${this.raw.id}`, data)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }
}
