import type { Razorpay } from "../index.js";
import { PaymentLink } from "../structure/index.js";
import type {
  RawPaymentLinkEntity,
  RawPaymentLinkPayload,
} from "../types/index.js";

export class PaymentLinkManager {
  constructor(public client: Razorpay) {}

  /**
   * **Create Payment Link**
   *
   * You have the option to create basic or customized Payment Links
   * ___
   * https://razorpay.com/docs/api/payment-links/new/#create-payment-link
   */
  create(data: RawPaymentLinkPayload): Promise<PaymentLink> {
    return this.client.axios
      .post<RawPaymentLinkEntity>("payment-links", data)
      .then((res) => new PaymentLink(this.client, res.data));
  }

  /**
   * **Specific Payment Links by ID**
   *
   * Use the below endpoint to fetch details of a particular Payment Link.
   * ___
   * https://razorpay.com/docs/api/payment-links/new/#specific-payment-links-by-id
   */
  get(id: string): Promise<PaymentLink> {
    return this.client.axios
      .get<RawPaymentLinkEntity>(`payment-links/${id}`)
      .then((res) => new PaymentLink(this.client, res.data));
  }

  /**
   * **All Payment Links**
   *
   * Use the following endpoint to fetch all payment links
   * ___
   * https://razorpay.com/docs/api/payment-links/new/#all-payment-links
   */
  getAll(params?: {
    payment_id?: string;
    reference_id?: string;
  }): Promise<PaymentLink[]> {
    return this.client.axios
      .get<{ payment_links: RawPaymentLinkEntity[] }>("payment-links", {
        params,
      })
      .then((res) =>
        res.data.payment_links.map((d) => new PaymentLink(this.client, d))
      );
  }
}
