import type { Razorpay } from "../index.js";
import { Invoice } from "../structure/index.js";
import type { RawInvoiceEntity, RawInvoicePayload } from "../types/index.js";

export class InvoiceManager {
  constructor(public client: Razorpay) {}

  /**
   * **Create an Invoice**
   *
   * An invoice entity is created for the items ordered on your website or app by a customer. If you are using the Customers API, you only need to pass the ``customer_id``.
   * ___
   * https://razorpay.com/docs/api/invoices/#create-an-invoice
   */
  create(invoice: RawInvoicePayload): Promise<Invoice> {
    return this.client.axios
      .post<RawInvoiceEntity>("/invoices", invoice)
      .then((res) => new Invoice(this.client, res.data));
  }

  /**
   * **Fetch an Invoice**
   *
   * You can retrieve all the details of an invoice using the following endpoint.
   * ___
   * https://razorpay.com/docs/api/invoices/#fetch-an-invoice
   */
  get(id: string): Promise<Invoice> {
    return this.client.axios
      .get<RawInvoiceEntity>(`/invoices/${id}`)
      .then((res) => new Invoice(this.client, res.data));
  }

  /**
   * **Fetch Multiple Invoice**
   *
   * You can fetch multiple invoices using the following endpoint
   * ___
   * https://razorpay.com/docs/api/invoices/#fetch-multiple-invoices
   */
  getAll(params?: {
    customer_id?: string;
    payment_id?: string;
    receipt?: string;
    type?: string;
  }): Promise<Invoice[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawInvoiceEntity[];
      }>("/invoices", { params })
      .then((res) => res.data.items.map((d) => new Invoice(this.client, d)));
  }

  /**
   * ### Fetch All Invoices for a Subscription
   *
   * Use the below endpoint to fetch all invoices for a subscription. Here, the count indicates the number of invoices generated for the subscription
   * ___
   * https://razorpay.com/docs/api/subscriptions/#fetch-all-invoices-for-a-subscription
   */
  getAllBySubscriptionId(subscriptionId: string): Promise<Invoice[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawInvoiceEntity[];
      }>(`/invoices?subscription_id=${subscriptionId}`)
      .then((res) => res.data.items.map((d) => new Invoice(this.client, d)));
  }
}
