import { RazorpayApi } from "..";
import {
  IPaymentEntity,
  IsoCodes,
  ICardEntity,
  IPaymentDowntimeEntity,
  ITransferEntity,
} from "../types";

export function payment(api: RazorpayApi) {
  return {
    transfer: {
      /**
       * ### Create Transfers from Payments
       *
       * The following endpoint transfers a captured payment to one or more linked accounts using account_id. On a successful transfer, a response will be generated with a collection of transfer entities created for the payment.
       * ___
       * https://razorpay.com/docs/api/route/#create-transfers-from-payments
       */
      create(
        paymentId: string,
        transfers: {
          account: string;
          amount: number;
          currency: IsoCodes;
          notes: {
            [key: string]: string;
          };
          linked_account_notes: string[];
          on_hold: number;
          on_hold_until: number;
        }[]
      ) {
        return api.axios.post<{
          entity: "collection";
          count: number;
          items: ITransferEntity[];
        }>(`/payments/${paymentId}/transfers`, {
          transfers,
        });
      },

      /**
       * ### Fetch Transfers for a Payment
       *
       * Use this endpoint to fetch the collection of all transfers created on a specific Payment ID.
       * ___
       * https://razorpay.com/docs/api/route/#fetch-transfers-for-a-payment
       */
      get(paymentId: string) {
        return api.axios.get<{
          entity: "collection";
          count: number;
          items: ITransferEntity[];
        }>(`/payments/${paymentId}/transfers`);
      },
    },

    /**
     * ### Fetch Multiple Payments
     *
     * The following endpoint is used for retrieving all the payments
     * ___
     * https://razorpay.com/docs/api/payments/#fetch-multiple-payments
     */
    getAll(params: {
      from?: number;
      to?: number;
      count?: number;
      skip?: number;
      "expand[]"?: "card" | "emi";
    }) {
      return api.axios.get<{
        entity: string;
        count: number;
        items: IPaymentEntity[];
      }>("/payments", { params });
    },

    /**
     * ### Fetch a Payment
     *
     * The following endpoint is used for retrieving a specific payment object using its ``id``
     * ___
     * https://razorpay.com/docs/api/payments/#fetch-a-payment
     */
    get(paymentId: string, params?: { "expand[]": "card" | "emi" | "offers" }) {
      return api.axios.get<IPaymentEntity>(`/payments/${paymentId}`, {
        params,
      });
    },

    /**
     * ### Capture a Payment
     *
     * After the customer's bank authorises the payment, you must verify if the authorised amount deducted from the customer's account is the same as the amount paid by the customer on your website or app.
     *
     * You can [configure automatic capture](https://razorpay.com/docs/payment-gateway/payments/capture-settings/#auto-capture-all-payments) of payments on the Razorpay Dashboard.
     *
     * To change the status of the payment from authorized to captured, send the following request:
     * ___
     * https://razorpay.com/docs/api/payments/#capture-a-payment
     */
    capture(paymentId: string, data: { amount: string; currency: IsoCodes }) {
      return api.axios.post<IPaymentEntity>(`/payments/${paymentId}`, data);
    },

    /**
     * ### Fetch Card Details of a Payment
     *
     * You can retrieve the details of the card used to make a payment using the following endpoint
     * ___
     * https://razorpay.com/docs/api/payments/#fetch-card-details-of-a-payment
     */
    cardDetails(paymentId: string) {
      return api.axios.get<ICardEntity>(`/payments/${paymentId}/card`);
    },

    /**
     * ### Update the Payment
     *
     * You can modify an existing payment to update the ``Notes`` field only. Notes can be used to record additional information about the payment. You can add up to 15 key-value pairs with each value of the key not exceeding 256 characters.
     *
     * Using the PATCH operation, you can replace the entire ``notes`` object for the entity.
     * ___
     * https://razorpay.com/docs/api/payments/#update-the-payment
     */
    update(paymentId: string, notes: { [key: string]: string }) {
      return api.axios.post<IPaymentEntity>(`/payments/${paymentId}`, {
        notes,
      });
    },

    /**
     * ### Fetch Payment Downtime Details
     *
     * Use the endpoint given below to fetch details of payment downtimes
     * ___
     * https://razorpay.com/docs/api/payments/downtime/#fetch-payment-downtime-details
     */
    fetchDowntimes() {
      return api.axios.get<{
        payment_downtime: {
          entity: string;
          count: number;
          items: IPaymentDowntimeEntity;
        };
      }>(`/payments/downtimes`);
    },

    /**
     * ### Fetch Payment Downtime Details by Id
     *
     * Usually, downtime webhook payloads are delivered within few seconds of the event. However, in some cases, this can be delayed by few minutes due to various reasons.
     *
     * If you have not received any webhook notifications due to some technical issues, you can use the Fetch Downtime by ID API to fetch the said downtime status.
     * ___
     * https://razorpay.com/docs/api/payments/downtime/#fetch-payment-downtime-details
     */
    fetchDowntimeById(id: string) {
      return api.axios.get<IPaymentDowntimeEntity>(`/payments/downtimes/${id}`);
    },
  };
}
