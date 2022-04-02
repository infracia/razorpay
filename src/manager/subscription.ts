import type { Razorpay } from "../index.js";
import { Subscription } from "../structure/index.js";
import type {
  RawSubscriptionEntity,
  RawSubscriptionPayload,
} from "../types/index.js";

export class SubscriptionManager {
  constructor(public client: Razorpay) {}

  /**
   * ### Create a Subscriptions
   *
   * Use the below endpoint to create a subscription
   * ___
   * https://razorpay.com/docs/api/subscriptions/#create-a-subscription
   */
  create(subscription: RawSubscriptionPayload): Promise<Subscription> {
    return this.client.axios
      .post<RawSubscriptionEntity>("/subscriptions", subscription)
      .then((res) => new Subscription(this.client, res.data));
  }

  /**
   * ### Fetch Subscription by ID
   *
   * Use the below endpoint to fetch a subscription using the ``sub_id``
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-a-plan-by-id
   */
  get(subscriptionId: string): Promise<Subscription> {
    return this.client.axios
      .post<RawSubscriptionEntity>(`/subscriptions/${subscriptionId}`)
      .then((res) => new Subscription(this.client, res.data));
  }

  /**
   * ### Fetch all Plans
   *
   * Use the below endpoint to fetch all plans
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-all-plans
   */
  getAll(params?: {
    count?: number;
    from?: number;
    plan_id: string;
    skip?: number;
    to?: number;
  }): Promise<Subscription[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawSubscriptionEntity[];
      }>("/subscriptions", { params })
      .then((res) =>
        res.data.items.map((d) => new Subscription(this.client, d))
      );
  }
}
