import { RazorpayApi } from "..";
import { IAddonEntity, IsoCodes } from "../types";

export function subscriptionAddon(api: RazorpayApi) {
  return {
    /**
     * ### Create an Add-on
     *
     * Use the below endpoint to create an add-on
     * ___
     * https://razorpay.com/docs/api/subscriptions/#add-ons
     */
    add(
      id: string,
      data: {
        item: {
          name: string;
          amount: number;
          currency: IsoCodes;
          description?: string;
        };
        quantity: number;
      }
    ) {
      return api.axios.post<IAddonEntity>(`/subscriptions/${id}/addons`, data);
    },

    /**
     * ### Fetch all Add-ons
     *
     * Use the below endpoint to fetch all add-ons
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-all-add-ons
     */
    getAll(subId: string) {
      return api.axios.get<IAddonEntity>(`/addons/${subId}`);
    },

    /**
     * ### Fetch an Add-on by ID
     *
     * Use the below endpoint to fetch an add-on by its unique identifier.
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-an-add-on-by-id
     */
    getById(id: string) {
      return api.axios.post<IAddonEntity>(`/addons/${id}`);
    },

    /**
     * ### Delete an Add-on
     *
     * Use the below endpoint to delete an add-on. You receive a blank response if the add-on is successfully deleted.
     * ___
     * https://razorpay.com/docs/api/subscriptions/#delete-an-add-on
     */
    delete(id: string) {
      return api.axios.delete<[]>(`/addons/${id}`);
    },
  };
}
