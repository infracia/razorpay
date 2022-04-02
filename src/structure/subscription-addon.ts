import type { Razorpay } from "../index.js";
import type {
  RawAddonEntity,
  RawAddonPayload,
  RawSubscriptionEntity,
} from "../types/index.js";
import { Addon } from "./index";

export class SubscriptionAddon {
  constructor(public client: Razorpay, public raw: RawSubscriptionEntity) {}

  /**
   * ### Create an Add-on
   *
   * Use the below endpoint to create an add-on
   * ___
   * https://razorpay.com/docs/api/subscriptions/#add-ons
   */
  add(data: RawAddonPayload): Promise<Addon> {
    return this.client.axios
      .post<RawAddonEntity>(`/subscriptions/${this.raw.id}/addons`, data)
      .then((res) => new Addon(this.client, res.data));
  }
}
