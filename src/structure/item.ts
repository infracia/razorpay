import type { Razorpay } from "../index.js";
import type { RawItemEntity, RawItemPayload } from "../types/index.js";

export class Item {
  constructor(public client: Razorpay, public raw: RawItemEntity) {}

  /**
   * **Delete an Item**
   *
   * The following endpoint helps you to delete an item
   * ___
   * https://razorpay.com/docs/api/items/#delete-an-item
   */
  delete(): Promise<Item> {
    return this.client.axios
      .delete<[]>(`/items/${this.raw.id}`)
      .then(() => this);
  }

  /**
   * **Update an Item**
   *
   * The following endpoint helps to update the details of an item.
   * ___
   * https://razorpay.com/docs/api/items/#update-an-item
   */
  update(data: RawItemPayload): Promise<Item> {
    return this.client.axios
      .patch<RawItemEntity>(`/items/${this.raw.id}`, data)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }
}
