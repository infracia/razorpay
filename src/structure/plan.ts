import type { Razorpay } from "../index.js";
import type { RawPlanEntity } from "../types/index.js";

export class Plan {
  constructor(public client: Razorpay, public raw: RawPlanEntity) {}
}
