import { RazorpayApi } from "..";
import { ISmartCollectEntity } from "../types";

export function smartCollect(api: RazorpayApi) {
  return {
    /**
     * ### Create Virtual Account
     *
     * The following endpoint creates a virtual account
     * ___
     * https://razorpay.com/docs/api/smart-collect/#create-virtual-account
     */
    create(data: {
      receivers: {
        types: ("bank_account" | "vpa")[];
        vpa: {
          descriptor: string;
        };
      };
      description: string;
      customer_id: string;
      close_by: number;
      notes: { [key: string]: string };
    }) {
      return api.axios.post<ISmartCollectEntity>(`virtual_accounts`, data);
    },

    /**
     * ### Fetch a Virtual Account by ID
     *
     * The following endpoint fetches a virtual account by ID.
     * ___
     * https://razorpay.com/docs/api/smart-collect/#fetch-a-virtual-account-by-id
     */
    get(id: string) {
      return api.axios.get<ISmartCollectEntity>(`virtual_accounts/${id}`);
    },

    /**
     * ### Fetch all Virtual Accounts
     *
     * The following endpoint fetches the details of all virtual accounts
     * ___
     * https://razorpay.com/docs/api/smart-collect/#fetch-all-virtual-accounts
     */
    getAll(params: { from: number; to: number; skip: number; count: number }) {
      return api.axios.get<ISmartCollectEntity>(`virtual_accounts`, { params });
    },

    /**
     * ### Fetch Payments for a Virtual Account
     *
     * The following endpoint fetches payments made against a particular virtual account.
     * ___
     * https://razorpay.com/docs/api/smart-collect/#fetch-payments-for-a-virtual-account
     */
    getPayments(
      id: string,
      params: { from: number; to: number; skip: number; count: number }
    ) {
      return api.axios.get<ISmartCollectEntity>(
        `virtual_accounts/${id}/payments`,
        { params }
      );
    },

    /**
     * ### Bank Transfer
     * ___
     * https://razorpay.com/docs/api/smart-collect/#bank-transfer
     */
    bankTransfer(id: string) {
      return api.axios.get<ISmartCollectEntity>(
        `virtual_accounts/${id}/bank_transfer`
      );
    },

    /**
     * ### UPI
     * ___
     * https://razorpay.com/docs/api/smart-collect/#upi
     */
    upi(id: string) {
      return api.axios.get<ISmartCollectEntity>(
        `virtual_accounts/${id}/upi_transfer`
      );
    },

    /**
     * ### Refund Payments made to a Virtual Account
     *
     * You can process refunds for a payment made towards a virtual account. The following endpoint refunds a payment using the payment ID.
     * ___
     * https://razorpay.com/docs/api/smart-collect/#refund-payments-made-to-a-virtual-account
     */
    refundPayment(
      id: string,
      data: { amount: string; notes: { [key: string]: string } }
    ) {
      return api.axios.post<ISmartCollectEntity>(
        `virtual_accounts/${id}/refund`,
        data
      );
    },

    /**
     * ### Add Receiver to an Existing Virtual Account
     *
     * You can add receiver to an existing virtual account using the endpoint given below.
     * ___
     * https://razorpay.com/docs/api/smart-collect/#add-receiver-to-an-existing-virtual-account
     */
    addReceiver(
      id: string,
      data: { types: ("bank_account" | "vpa")[]; vpa: { descriptor: string } }
    ) {
      return api.axios.post<ISmartCollectEntity>(
        `virtual_accounts/${id}/receivers`,
        data
      );
    },

    /**
     * ### Close a Virtual Account
     *
     * The following endpoint closes a virtual account.
     * ___
     * https://razorpay.com/docs/api/smart-collect/#add-receiver-to-an-existing-virtual-account
     */
    close(id: string) {
      return api.axios.post<ISmartCollectEntity>(
        `virtual_accounts/${id}/close`
      );
    },
  };
}
