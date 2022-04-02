import type { Razorpay } from "../index.js";
import type { RawSubscriptionEntity } from "../types/index.js";
import { SubscriptionAddon } from "./index.js";

export class Subscription {
  addon: SubscriptionAddon;

  constructor(public client: Razorpay, public raw: RawSubscriptionEntity) {
    this.addon = new SubscriptionAddon(this.client, raw);
  }

  /**
   * ### Cancel a Subscription
   *
   * Use the below endpoint to cancel a subscription
   *
   * The subscription can either be cancelled immediately or at the end of the current billing cycle. Once cancelled, the subscription cannot be renewed or reactivated
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-a-plan-by-id
   */
  cancel(params?: { cancel_at_cycle_end: boolean }): Promise<Subscription> {
    return this.client.axios
      .post<RawSubscriptionEntity>(
        `/subscriptions/${this.raw.id}/cancel`,
        null,
        { params }
      )
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * ### Update a Subscription
   *
   * Use the below endpoint to update a subscription
   * ___
   * https://razorpay.com/docs/api/subscriptions/#update-a-subscription
   */
  update(data?: {
    customer_notify?: boolean;
    offer_id?: string;
    plan_id?: string;
    quantity?: number;
    remaining_count?: number;
    schedule_change_at?: "now" | "cycle_end";
    start_at?: number;
  }): Promise<Subscription> {
    return this.client.axios
      .patch<RawSubscriptionEntity>(`/subscriptions/${this.raw.id}`, data)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * ### Fetch Details of a Pending Update
   *
   * The following endpoint fetches details of a pending update. This happens when a subscription is updated using the ``end of cycle`` option for the ``schedule_change_at`` parameter
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-details-of-a-pending-update
   */
  getScheduleChanges(): Promise<Subscription> {
    return this.client.axios
      .get<RawSubscriptionEntity>(
        `/subscriptions/${this.raw.id}/retrieve_scheduled_changes`
      )
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * ### Cancel an Update
   *
   * The following endpoint cancels a pending update. This happens when a subscription is updated using the ``end of cycle`` option for the ``schedule_change_at`` parameter
   * ___
   * https://razorpay.com/docs/api/subscriptions/#cancel-an-update
   */
  cancelScheduleChanges(): Promise<Subscription> {
    return this.client.axios
      .post<RawSubscriptionEntity>(
        `/subscriptions/${this.raw.id}/cancel_scheduled_changes`
      )
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * ### Pause a Subscription
   *
   * Only subscriptions in the ``active`` state can be paused
   * ___
   * https://razorpay.com/docs/api/subscriptions/#pause-a-subscription
   */
  pauseScheduleChanges(): Promise<Subscription> {
    return this.client.axios
      .post<RawSubscriptionEntity>(`/subscriptions/${this.raw.id}/pause`)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * ### Resume a Subscription
   *
   * Use the below endpoint to resume a subscription in the ``paused`` state
   * ___
   * https://razorpay.com/docs/api/subscriptions/#resume-a-subscription
   */
  resumeScheduleChanges(resumeAt: "now"): Promise<Subscription> {
    return this.client.axios
      .post<RawSubscriptionEntity>(`/subscriptions/${this.raw.id}/resume`, {
        // eslint-disable-next-line camelcase
        resume_at: resumeAt,
      })
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }
}
