import type { Razorpay } from "../index.js";
import { Addon } from "../structure/index.js";
import type { RawAddonEntity } from "../types/index.js";

export class AddonManager {
  constructor(public client: Razorpay) {}

  /**
   * ### Fetch an Add-on by ID
   *
   * Use the below endpoint to fetch an add-on by its unique identifier.
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-an-add-on-by-id
   */
  getById(id: string): Promise<Addon> {
    return this.client.axios
      .post<RawAddonEntity>(`/addons/${id}`)
      .then((res) => new Addon(this.client, res.data));
  }

  /**
   * ### Fetch all Add-ons
   *
   * Use the below endpoint to fetch all add-ons
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-all-add-ons
   */
  getAll(): Promise<Addon[]> {
    return this.client.axios
      .get<{
        count: 2;
        entity: "collection";
        items: RawAddonEntity[];
      }>("/addons")
      .then((res) => res.data.items.map((d) => new Addon(this.client, d)));
  }
}
