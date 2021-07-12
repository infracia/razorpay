import { RazorpayApi } from "..";
import { IPaymentLinkEntity, IsoCodes } from "../types";

export function paymentLinks(api: RazorpayApi) {
  return {
    /**
     * ### Create Payment Link
     *
     * You have the option to create basic or customized Payment Links
     * ___
     * https://razorpay.com/docs/api/payment-links/new/#create-payment-link
     */
    create(data: {
      amount: number;
      currency: IsoCodes;
      accept_partial: boolean;
      first_min_partial_amount: number;
      expire_by: number;
      reference_id: string;
      description: string;
      customer: {
        name: string;
        contact: string;
        email: string;
      };
      notify: {
        sms: boolean;
        email: boolean;
      };
      reminder_enable: boolean;
      notes: {
        policy_name: string;
      };
      callback_url: string;
      callback_method: string;
    }) {
      return api.axios.post<IPaymentLinkEntity>(`payment-links`, data);
    },

    /**
     * ### All Payment Links
     *
     * Use the following endpoint to fetch all payment links
     * ___
     * https://razorpay.com/docs/api/payment-links/new/#all-payment-links
     */
    get(params: { payment_id: string; reference_id: string }) {
      return api.axios.get<IPaymentLinkEntity>(`payment-links`, { params });
    },

    /**
     * ### Specific Payment Links by ID
     *
     * Use the below endpoint to fetch details of a particular Payment Link.
     * ___
     * https://razorpay.com/docs/api/payment-links/new/#specific-payment-links-by-id
     */
    getById(linkId: string) {
      return api.axios.get<IPaymentLinkEntity>(`payment-links/${linkId}`);
    },

    /**
     * ### Send or Resend Notifications
     *
     * You can send or resend notifications to customer via email and SMS, using following endpoint
     * ___
     * https://razorpay.com/docs/api/payment-links/new/#send-or-resend-notifications
     */
    sendNotification(linkId: string, mode: "sms" | "email") {
      return api.axios.post<IPaymentLinkEntity>(
        `payment-links/${linkId}/notify_by/${mode}`
      );
    },

    /**
     * ### Update Payment Link
     *
     * Use the below endpoint to update the Payment Link
     * ___
     * https://razorpay.com/docs/api/payment-links/new/#update-payment-link
     */
    update(
      linkId: string,
      data: {
        accept_partial?: boolean;
        reference_id?: string;
        expire_by?: number;
        notes?: { [key: string]: string };
      }
    ) {
      return api.axios.post<IPaymentLinkEntity>(
        `payment-links/${linkId}`,
        data
      );
    },

    /**
     * ### Cancel Payment Link
     *
     * You can cancel a Payment Link with given ID using the following endpoint:
     * ___
     * https://razorpay.com/docs/api/payment-links/new/#cancel-payment-link
     */
    cancel(linkId: string) {
      return api.axios.post<IPaymentLinkEntity>(
        `payment-links/${linkId}/cancel`
      );
    },
  };
}
