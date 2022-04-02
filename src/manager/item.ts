import type { Razorpay } from "../index.js";
import { Item } from "../structure/index.js";
import type { RawItemEntity, RawItemPayload } from "../types/index.js";

export class ItemManager {
  constructor(public client: Razorpay) {}

  /**
   * **Create an Item**
   *
   * The following endpoint helps you create an item
   * ___
   * https://razorpay.com/docs/api/items/#create-an-item
   */
  create(item: RawItemPayload): Promise<Item> {
    return this.client.axios
      .post<RawItemEntity>("/items", item)
      .then((res) => new Item(this.client, res.data));
  }

  /**
   * **Fetch an Item**
   *
   * The following endpoint helps you to fetch the details of a specific item using the ``Item_id``.
   * ___
   * https://razorpay.com/docs/api/items/#fetch-an-item
   */
  get(itemId: string): Promise<Item> {
    return this.client.axios
      .get<RawItemEntity>(`/items/${itemId}`)
      .then((res) => new Item(this.client, res.data));
  }

  /**
   * **Fetch Multiple Items**
   *
   * The following endpoint helps to fetch the details of all the items created till date.
   * ___
   * https://razorpay.com/docs/api/items/#fetch-multiple-items
   */
  getAll(): Promise<Item[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawItemEntity[];
      }>("/items")
      .then((res) => res.data.items.map((d) => new Item(this.client, d)));
  }
}
