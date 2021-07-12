import { RazorpayApi } from "..";
import { IsoCodes, ITransferEntity } from "../types";

export function transfers(api: RazorpayApi) {
  return {
    /**
     * ### Direct Transfers
     *
     * This API creates a direct transfer of funds from your account to linked account. On successful creation, the API responds with the created transfer entity.
     * ___
     * https://razorpay.com/docs/api/route/#direct-transfers
     */
    create(data: {
      account: string;
      currency: IsoCodes;
      notes: { [key: string]: string };
    }) {
      return api.axios.post<ITransferEntity>(`/transfers`, data);
    },

    /**
     * ### Fetch a Transfer
     *
     * You can use the following endpoint to fetch details of a specific transfer.
     * ___
     * https://razorpay.com/docs/api/route/#fetch-a-transfer
     */
    get(transferId: string) {
      return api.axios.get<ITransferEntity>(`/transfers/${transferId}`);
    },

    /**
     * ### Fetch Transfers for a Settlement
     *
     * You can use the following endpoint to retrieve the collection of all transfers made for a particular ``recipient_settlement_id``.
     * ___
     * https://razorpay.com/docs/api/route/#fetch-transfers-for-a-settlement
     */
    getSettlement(recipient_settlement_id: string) {
      return api.axios.get<ITransferEntity>(`/transfers`, {
        params: { recipient_settlement_id },
      });
    },

    /**
     * ### Fetch Settlement Details
     *
     * You can use the following endpoint to fetch the details of settlements made to linked accounts.
     *
     * You must append ?expand[]=recipient_settlement as the query parameter to the fetch transfer request. This would return a settlement entity along with the transfer entity.
     * ___
     * https://razorpay.com/docs/api/route/#fetch-settlement-details
     */
    getSettlementDetail() {
      return api.axios.get<ITransferEntity>(`/transfers`, {
        params: { "expand[]": "recipient_settlement" },
      });
    },

    /**
     * ### Fetch Payments of a Linked Account
     *
     * You can use the following endpoint to fetch a list of all the payments received by a linked account.
     *
     * ___
     * https://razorpay.com/docs/api/route/#fetch-payments-of-a-linked-account
     */
    getPaymentForLinkedAccount(accountId: string) {
      return api.axios.get<ITransferEntity>(`/payments`, {
        headers: {
          "X-Razorpay-Account": accountId,
        },
      });
    },

    /**
     * ### Reverse Transfers from all Linked Accounts
     *
     * While a transfer moves funds from your account to linked accounts, a reversal can move funds back into your account.
     *
     * You can use the following endpoint to create reversals on a particular ``transfer_id``
     *
     * ___
     * https://razorpay.com/docs/api/route/#reverse-transfers-from-all-linked-accounts
     */
    reverseTransferFromAllAccount(transferId: string, amount?: number) {
      return api.axios.post<ITransferEntity>(
        `/transfers/${transferId}/reversals`,
        {
          amount,
        }
      );
    },

    /**
     * ### Modify Settlement Hold for Transfers
     *
     * You can use the following endpoint to modify the settlement configuration for a particular transfer_id. On successful request, the API responds with the modified transfer entity.
     *
     * ___
     * https://razorpay.com/docs/api/route/#modify-settlement-hold-for-transfers
     */
    modifySettlementHoldForTransfer(
      transferId: string,
      params?: {
        on_hold: boolean;
        on_hold_until: number;
      }
    ) {
      return api.axios.patch<ITransferEntity>(
        `/transfers/${transferId}`,
        params
      );
    },
  };
}
