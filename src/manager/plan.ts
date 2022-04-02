import type { Razorpay } from "../index.js";
import { Plan } from "../structure/index.js";
import type { RawPlanEntity, RawPlanPayload } from "../types/index.js";

export class PlanManager {
  constructor(public client: Razorpay) {}

  /**
   * ### Create a Plan
   *
   * Use the below endpoint to create a plan
   * ___
   * https://razorpay.com/docs/api/subscriptions/#create-a-plan
   */
  create(plan: RawPlanPayload): Promise<Plan> {
    return this.client.axios
      .post<RawPlanEntity>("/plans", plan)
      .then((res) => new Plan(this.client, res.data));
  }

  /**
   * ### Fetch a Plan by ID
   *
   * Use the below endpoint to fetch details of a plan by its unique identifier.
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-a-plan-by-id
   */
  get(planId: string): Promise<Plan> {
    return this.client.axios
      .post<RawPlanEntity>(`/plans/${planId}`)
      .then((res) => new Plan(this.client, res.data));
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
    skip?: number;
    to?: number;
  }): Promise<Plan[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawPlanEntity[];
      }>("/plans", { params })
      .then((res) => res.data.items.map((d) => new Plan(this.client, d)));
  }
}
