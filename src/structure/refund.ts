import type { Razorpay } from "../index.js";
import type { RawRefundEntity } from "../types/index.js";

export class Refund {
  constructor(public client: Razorpay, public raw: RawRefundEntity) {}

  /**
   * ### Update Refund
   *
   * You can modify an existing refund to update the notes field only. Notes can be used to record additional information about the payment. You can add up to 15 key-value pairs with each value of the key not exceeding 256 characters.
   *
   * Using the PATCH operation, you can replace the entire notes object for the entity.
   *
   * The following endpoint updates the notes parameter for a refund.
   * ___
   * https://razorpay.com/docs/api/refunds/#fetch-refund-by-id
   */
  update(notes: Record<string, string>): Promise<Refund> {
    return this.client.axios
      .patch<RawRefundEntity>(`/refunds/${this.raw.id}`, {
        notes,
      })
      .then(() => this);
  }
}
