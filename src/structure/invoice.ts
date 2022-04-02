import type { Razorpay } from "../index.js";
import type { RawInvoiceEntity, RawInvoicePayload } from "../types/index.js";

export class Invoice {
  constructor(public client: Razorpay, public raw: RawInvoiceEntity) {}

  /**
   * **Cancel an Invoice**
   *
   * You can cancel an unpaid invoice using this endpoint
   * ___
   * https://razorpay.com/docs/api/invoices/#cancel-an-invoice
   */
  cancel(): Promise<Invoice> {
    return this.client.axios
      .post<RawInvoiceEntity>(`/invoices/${this.raw.id}/cancel`)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * **Delete an Invoice**
   *
   * You can only delete an invoice that is in the draft state. The response will always be an empty array.
   * ___
   * https://razorpay.com/docs/api/invoices/#delete-an-invoice
   */
  delete(): Promise<Invoice> {
    return this.client.axios
      .delete<RawInvoiceEntity>(`/invoices/${this.raw.id}`)
      .then(() => this);
  }

  /**
   * **Issue an Invoice**
   *
   * Only an invoice in the draft state can be issued. Its response is the invoice entity, similar to create/update API response. Its status now would be issued and it will have a short_url generated. Also, SMS and email would be sent to the customer based on what parameters were sent initially during creation.
   *
   * The following endpoint can be used to issue an invoice:
   * ___
   * https://razorpay.com/docs/api/invoices/#issue-an-invoice
   */
  issue(): Promise<Invoice> {
    return this.client.axios
      .post<RawInvoiceEntity>(`/invoices/${this.raw.id}/issue`)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * **Send Notifications**
   *
   * You can send notifications with the short URL to the customer via email or SMS using the following endpoint
   * ___
   * https://razorpay.com/docs/api/invoices/#send-notifications
   */
  sendNotification(medium: "sms" | "email"): Promise<Invoice> {
    return this.client.axios
      .post<{ success: boolean }>(
        `/invoices/${this.raw.id}/notify_by/${medium}`
      )
      .then(() => this);
  }

  /**
   * **Update an Invoice**
   *
   * You can update an invoice via API using the endpoint given below
   * ___
   * https://razorpay.com/docs/api/invoices/#update-an-invoice
   */
  update(invoice: RawInvoicePayload): Promise<Invoice> {
    return this.client.axios
      .patch<RawInvoiceEntity>(`/invoices/${this.raw.id}`, invoice)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }
}
