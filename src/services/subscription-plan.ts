import { RazorpayApi } from "..";
import { IPlanEntity } from "../types";

export function subscriptionPlan(api: RazorpayApi) {
  return {
    /**
     * ### Fetch all Plans
     *
     * Use the below endpoint to fetch all plans
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-all-plans
     */
    getAll(params?: {
      from?: number;
      to?: number;
      count?: number;
      skip?: number;
    }) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: IPlanEntity[];
      }>(`/plans`, { params });
    },

    /**
     * ### Create a Plan
     *
     * Use the below endpoint to create a plan
     * ___
     * https://razorpay.com/docs/api/subscriptions/#create-a-plan
     */
    create(plan: {
      period: "daily" | "weekly" | "monthly" | "yearly";
      interval: number;
      item: {
        name: string;
        amount: number;
        currency: string;
        description?: string;
      };
      notes?: { [key: string]: string };
    }) {
      return api.axios.post<IPlanEntity>(`/plans`, plan);
    },

    /**
     * ### Fetch a Plan by ID
     *
     * Use the below endpoint to fetch details of a plan by its unique identifier.
     * ___
     * https://razorpay.com/docs/api/subscriptions/#fetch-a-plan-by-id
     */
    getById(planId: string) {
      return api.axios.post<IPlanEntity>(`/plans/${planId}`);
    },
  };
}
