import type { Razorpay } from "../index.js";
import type {
  RawPaymentEntity,
  RawRefundEntity,
  RawRefundPayload,
} from "../types/index.js";
import { Refund } from "./index.js";

export class PaymentRefund {
  constructor(public client: Razorpay, public raw: RawPaymentEntity) {}

  /**
   * ### Create a Normal Refund
   *
   * The following endpoint creates a normal refund for a payment.
   * ___
   * https://razorpay.com/docs/api/refunds/#create-a-normal-refund
   */
  create(data: RawRefundPayload): Promise<Refund> {
    return this.client.axios
      .post<RawRefundEntity>(`/payments/${this.raw.id}/refund`, data)
      .then((res) => new Refund(this.client, res.data));
  }

  /**
   * ### Fetch a Specific Refund for a Payment
   *
   * The following endpoint retrieves details of a specific refund made for a payment.
   * ___
   * https://razorpay.com/docs/api/refunds/#fetch-a-specific-refund-for-a-payment
   */
  get(refundId: string): Promise<Refund> {
    return this.client.axios
      .get<RawRefundEntity>(`/payments/${this.raw.id}/refunds/${refundId}`)
      .then((res) => new Refund(this.client, res.data));
  }

  /**
   * ### Fetch Multiple Refunds for a Payment
   *
   * The following endpoint retrieves multiple refunds for a payment. By default, only the last 10 refunds are returned. You can use count and skip parameters to change that behavior.
   * ___
   * https://razorpay.com/docs/api/items/#fetch-an-item
   */
  getAll(params?: {
    count?: number;
    from?: number;
    skip?: number;
    to?: number;
  }): Promise<Refund[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawRefundEntity[];
      }>(`/payments/${this.raw.id}/refunds`, {
        params,
      })
      .then((res) => res.data.items.map((d) => new Refund(this.client, d)));
  }
}
