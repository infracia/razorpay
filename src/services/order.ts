import { RazorpayApi } from "..";
import { IOrderEntity, IPaymentEntity, IsoCodes } from "../types";

export function order(api: RazorpayApi) {
  return {
    transfer: {
      /**
       * ### Fetch Transfer for an Order
       *
       * Use this endpoint to fetch the collection of all transfers created on a specific Order ID.
       * ___
       * https://razorpay.com/docs/api/route/#fetch-transfer-for-an-order
       */
      get(orderId: string, params: { "expand[]": "transfer" }) {
        return api.axios.get<IOrderEntity>(`/orderId/${orderId}/`, { params });
      },
    },

    /**
     * ### Create an Order
     *
     * The following endpoint creates an order
     * ___
     * https://razorpay.com/docs/api/orders/#create-an-order
     */
    create(order: {
      amount: number;
      currency: IsoCodes;
      receipt?: string;
      notes?: { [key: string]: string };
      partial_payment?: boolean;

      /**
       * # transfer order creation
       * https://razorpay.com/docs/api/route/#create-transfers-from-orders
       */
      transfers?: {
        account: string;
        amount: number;
        currency: IsoCodes;
        notes: {
          [key: string]: string;
        };
        linked_account_notes: string[];
        on_hold: number;
        on_hold_until: number;
      }[];
    }) {
      return api.axios.post<IOrderEntity>("/orders", order);
    },

    /**
     * ### Fetch Orders
     *
     * The following endpoint retrieves the details of all Orders created by you
     * ___
     * https://razorpay.com/docs/api/orders/#fetch-orders
     */
    getAll(params?: {
      authorized?: boolean;
      receipt?: string;
      from?: number;
      to?: number;
      count?: number;
      skip?: number;
      "expand[]"?:
        | "payments"
        | "payments.card"
        | "transfers"
        | "virtual_account";
    }) {
      return api.axios.get<IOrderEntity>(`/orders`, { params });
    },

    /**
     * ### Fetch an Order With Id
     *
     * The following endpoint retrieves the details of a particular order.
     * ___
     * https://razorpay.com/docs/api/orders/#fetch-an-order-with-id
     */
    get(orderId: string) {
      return api.axios.get<IOrderEntity>(`/orders/${orderId}`);
    },

    /**
     * ### Fetch Payments for an Order
     *
     * You can retrieve all the payments made for an order. The response contains all the payments, either authorized or failed, for that order.
     * ___
     * https://razorpay.com/docs/api/orders/#fetch-payments-for-an-order
     */
    getPayments(orderId: string) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: IPaymentEntity[];
      }>(`/orders/${orderId}/payments`);
    },

    /**
     * ### Update Order
     *
     * You can modify an existing order to update the Notes field only. Notes can be used to record additional information about the order. A key-value store, the notes field can have a maximum of 15 key-value pairs, each of 256 characters (maximum).
     *
     * Using the PATCH operation, you can replace the entire notes object for the entity. To modify the notes field in a particular order, construct the API request as follows
     *
     * ___
     * https://razorpay.com/docs/api/orders/#update-order
     */
    update(orderId: string, notes: { [key: string]: string }) {
      return api.axios.post<IOrderEntity>(`/orders/${orderId}/payments`, {
        notes,
      });
    },
  };
}
