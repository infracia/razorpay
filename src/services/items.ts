import { RazorpayApi } from "..";
import { IItemEntity, IsoCodes } from "../types";

export function items(api: RazorpayApi) {
  return {
    /**
     * ### Create an Item
     *
     * The following endpoint helps you create an item
     * ___
     * https://razorpay.com/docs/api/items/#create-an-item
     */
    create(item: {
      name: string;
      description?: string;
      amount: number;
      currency: IsoCodes;
    }) {
      return api.axios.post<IItemEntity>("/items", item);
    },

    /**
     * ### Fetch an Item
     *
     * The following endpoint helps you to fetch the details of a specific item using the ``Item_id``.
     * ___
     * https://razorpay.com/docs/api/items/#fetch-an-item
     */
    get(itemId: string) {
      return api.axios.get<IItemEntity>(`/items/${itemId}`);
    },

    /**
     * ### Delete an Item
     *
     * The following endpoint helps you to delete an item
     * ___
     * https://razorpay.com/docs/api/items/#delete-an-item
     */
    delete(itemId: string) {
      return api.axios.delete<[]>(`/items/${itemId}`);
    },

    /**
     * ### Fetch Multiple Items
     *
     * The following endpoint helps to fetch the details of all the items created till date.
     * ___
     * https://razorpay.com/docs/api/items/#fetch-multiple-items
     */
    getAll() {
      return api.axios.get<IItemEntity>(`/items`);
    },

    /**
     * ### Update an Item
     *
     * The following endpoint helps to update the details of an item.
     * ___
     * https://razorpay.com/docs/api/items/#update-an-item
     */
    update(
      itemId: string,
      data: {
        name?: string;
        description?: string;
        amount?: number;
        currency?: IsoCodes;
        active?: boolean;
      }
    ) {
      return api.axios.patch<IItemEntity>(`/items/${itemId}`, data);
    },
  };
}
