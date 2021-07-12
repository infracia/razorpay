import { RazorpayApi } from "..";
import { IInvoiceEntity, ISubscriptionEntity } from "../types";

export function subscription(api: RazorpayApi) {
  return {
    /**
     * ### Fetch all Plans
     *
     * Use the below endpoint to fetch all plans
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-all-plans
     */
    getAll(params?: {
      plan_id: string;
      from?: number;
      to?: number;
      count?: number;
      skip?: number;
    }) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: ISubscriptionEntity[];
      }>(`/subscriptions`, { params });
    },

    /**
     * ### Create a Subscriptions
     *
     * Use the below endpoint to create a subscription
     * ___
     * https://razorpay.com/docs/api/subscriptions/#create-a-subscription
     */
    create(subscription: {
      plan_id: string;
      total_count: number;
      quantity?: number;
      start_at?: number;
      expire_by?: number;
      customer_notify?: boolean;
      addons?: { name: string; amount: number; currency: string }[];
      offer_id?: string;
      notes?: { [key: string]: string };
      notify_info?: { notify_phone?: string; notify_email: string };
    }) {
      return api.axios.post<ISubscriptionEntity>(
        `/subscriptions`,
        subscription
      );
    },

    /**
     * ### Fetch Subscription by ID
     *
     * Use the below endpoint to fetch a subscription using the ``sub_id``
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-a-plan-by-id
     */
    getById(subId: string) {
      return api.axios.post<ISubscriptionEntity>(`/subscriptions/${subId}`);
    },

    /**
     * ### Cancel a Subscription
     *
     * Use the below endpoint to cancel a subscription
     *
     * The subscription can either be cancelled immediately or at the end of the current billing cycle. Once cancelled, the subscription cannot be renewed or reactivated
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-a-plan-by-id
     */
    cancel(subId: string, params?: { cancel_at_cycle_end: boolean }) {
      return api.axios.post<ISubscriptionEntity>(
        `/subscriptions/${subId}/cancel`,
        null,
        { params }
      );
    },

    /**
     * ### Update a Subscription
     *
     * Use the below endpoint to update a subscription
     * ___
     * https://razorpay.com/docs/api/subscriptions/#update-a-subscription
     */
    update(
      subId: string,
      data?: {
        plan_id?: string;
        offer_id?: string;
        quantity?: number;
        remaining_count?: number;
        start_at?: number;
        schedule_change_at?: "now" | "cycle_end";
        customer_notify?: boolean;
      }
    ) {
      return api.axios.patch<ISubscriptionEntity>(
        `/subscriptions/${subId}`,
        data
      );
    },

    /**
     * ### Fetch Details of a Pending Update
     *
     * The following endpoint fetches details of a pending update. This happens when a subscription is updated using the ``end of cycle`` option for the ``schedule_change_at`` parameter
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-details-of-a-pending-update
     */
    getScheduleChanges(subId: string) {
      return api.axios.get<ISubscriptionEntity>(
        `/subscriptions/${subId}/retrieve_scheduled_changes`
      );
    },

    /**
     * ### Cancel an Update
     *
     * The following endpoint cancels a pending update. This happens when a subscription is updated using the ``end of cycle`` option for the ``schedule_change_at`` parameter
     * ___
     * https://razorpay.com/docs/api/subscriptions/#cancel-an-update
     */
    cancelScheduleChanges(subId: string) {
      return api.axios.post<ISubscriptionEntity>(
        `/subscriptions/${subId}/cancel_scheduled_changes`
      );
    },

    /**
     * ### Pause a Subscription
     *
     * Only subscriptions in the ``active`` state can be paused
     * ___
     * https://razorpay.com/docs/api/subscriptions/#pause-a-subscription
     */
    pauseScheduleChanges(subId: string) {
      return api.axios.post<ISubscriptionEntity>(
        `/subscriptions/${subId}/pause`
      );
    },

    /**
     * ### Resume a Subscription
     *
     * Use the below endpoint to resume a subscription in the ``paused`` state
     * ___
     * https://razorpay.com/docs/api/subscriptions/#resume-a-subscription
     */
    resumeScheduleChanges(subId: string, resume_at: "now") {
      return api.axios.post<ISubscriptionEntity>(
        `/subscriptions/${subId}/resume`,
        { resume_at }
      );
    },

    /**
     * ### Fetch All Invoices for a Subscription
     *
     * Use the below endpoint to fetch all invoices for a subscription. Here, the count indicates the number of invoices generated for the subscription
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-all-invoices-for-a-subscription
     */
    getAllInvoices(subId: string) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: IInvoiceEntity[];
      }>(`/invoices?subscription_id=${subId}`);
    },
  };
}
