import type { Razorpay } from "../index.js";
import { Refund } from "../structure/refund.js";
import type { RawRefundEntity } from "../types/index.js";

export class RefundManager {
  constructor(public client: Razorpay) {}

  /**
   * ### Fetch Refund by Id
   *
   * The following endpoint retrieves the refund using the ID.
   * ___
   * https://razorpay.com/docs/api/refunds/#fetch-refund-by-id
   */
  get(refundId: string): Promise<Refund> {
    return this.client.axios
      .get<RawRefundEntity>(`/refunds/${refundId}`)
      .then((res) => new Refund(this.client, res.data));
  }

  /**
   * ### Fetch All Refunds
   *
   * The following endpoint retrieves details of all refunds. However, by default, only the last 10 refunds are returned. You can use count and skip query parameters to change that behavior.
   * ___
   * https://razorpay.com/docs/api/refunds/#fetch-all-refunds
   */
  getAll(): Promise<Refund[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawRefundEntity[];
      }>("/refunds")
      .then((res) => res.data.items.map((d) => new Refund(this.client, d)));
  }
}
