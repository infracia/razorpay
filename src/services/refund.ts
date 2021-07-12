import { RazorpayApi } from "..";
import { IRefundEntity } from "../types";

export function refund(api: RazorpayApi) {
  return {
    payment: {
      /**
       * ### Create a Normal Refund
       *
       * The following endpoint creates a normal refund for a payment.
       * ___
       * https://razorpay.com/docs/api/refunds/#create-a-normal-refund
       */
      create(
        paymentId: string,
        data: {
          amount: number;
          speed: "normal" | "optimum";
          notes: { [key: string]: string };
          receipt: string;

          // https://razorpay.com/docs/api/route/#refund-payments-and-reverse-transfer-from-a-linked
          reverse_all: boolean;
        }
      ) {
        return api.axios.post<IRefundEntity>(
          `/payments/${paymentId}/refund`,
          data
        );
      },

      /**
       * ### Fetch Multiple Refunds for a Payment
       *
       * The following endpoint retrieves multiple refunds for a payment. By default, only the last 10 refunds are returned. You can use count and skip parameters to change that behavior.
       * ___
       * https://razorpay.com/docs/api/items/#fetch-an-item
       */
      get(
        paymentId: string,
        params?: {
          from?: number;
          to?: number;
          count?: number;
          skip?: number;
        }
      ) {
        return api.axios.get<{
          entity: "collection";
          count: number;
          items: IRefundEntity[];
        }>(`/payments/${paymentId}/refunds`, {
          params,
        });
      },

      /**
       * ### Fetch a Specific Refund for a Payment
       *
       * The following endpoint retrieves details of a specific refund made for a payment.
       * ___
       * https://razorpay.com/docs/api/refunds/#fetch-a-specific-refund-for-a-payment
       */
      getById(paymentId: string, refundId: string) {
        return api.axios.get<IRefundEntity>(
          `/payments/${paymentId}/refunds/${refundId}`
        );
      },
    },

    /**
     * ### Fetch All Refunds
     *
     * The following endpoint retrieves details of all refunds. However, by default, only the last 10 refunds are returned. You can use count and skip query parameters to change that behavior.
     * ___
     * https://razorpay.com/docs/api/refunds/#fetch-all-refunds
     */
    getAll() {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: IRefundEntity[];
      }>(`/refunds`);
    },

    /**
     * ### Fetch Refund by ID
     *
     * The following endpoint retrieves the refund using the ID.
     * ___
     * https://razorpay.com/docs/api/refunds/#fetch-refund-by-id
     */
    getById(refundId: string) {
      return api.axios.get<IRefundEntity>(`/refunds/${refundId}`);
    },

    /**
     * ### Update Refund
     *
     * You can modify an existing refund to update the notes field only. Notes can be used to record additional information about the payment. You can add up to 15 key-value pairs with each value of the key not exceeding 256 characters.
     *
     * Using the PATCH operation, you can replace the entire notes object for the entity.
     *
     * The following endpoint updates the notes parameter for a refund.
     * ___
     * https://razorpay.com/docs/api/refunds/#fetch-refund-by-id
     */
    update(refundId: string, notes: { [key: string]: string }) {
      return api.axios.patch<IRefundEntity>(`/refunds/${refundId}`, { notes });
    },
  };
}
