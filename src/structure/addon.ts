import type { Razorpay } from "../index.js";
import type { RawAddonEntity } from "../types/index.js";

export class Addon {
  constructor(public client: Razorpay, public raw: RawAddonEntity) {}

  /**
   * ### Delete an Add-on
   *
   * Use the below endpoint to delete an add-on. You receive a blank response if the add-on is successfully deleted.
   * ___
   * https://razorpay.com/docs/api/subscriptions/#delete-an-add-on
   */
  delete(): Promise<Addon> {
    return this.client.axios
      .delete<[]>(`/addons/${this.raw.id}`)
      .then(() => this);
  }
}
