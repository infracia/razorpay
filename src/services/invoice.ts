import { RazorpayApi } from "..";
import { IInvoiceEntity, IInvoiceRequestCreate } from "../types";

export function invoice(api: RazorpayApi) {
  return {
    /**
     * ### Create an Invoice
     *
     * An invoice entity is created for the items ordered on your website or app by a customer. If you are using the Customers API, you only need to pass the ``customer_id``.
     * ___
     * https://razorpay.com/docs/api/invoices/#create-an-invoice
     */
    create(invoice: IInvoiceRequestCreate) {
      return api.axios.post<IInvoiceEntity>("/invoices", invoice);
    },

    /**
     * ### Update an Invoice
     *
     * You can update an invoice via API using the endpoint given below
     * ___
     * https://razorpay.com/docs/api/invoices/#update-an-invoice
     */
    update(id: string, invoice: IInvoiceRequestCreate) {
      return api.axios.patch<IInvoiceEntity>(`/invoices/${id}`, invoice);
    },

    /**
     * ### Issue an Invoice
     *
     * Only an invoice in the draft state can be issued. Its response is the invoice entity, similar to create/update API response. Its status now would be issued and it will have a short_url generated. Also, SMS and email would be sent to the customer based on what parameters were sent initially during creation.
     *
     * The following endpoint can be used to issue an invoice:
     * ___
     * https://razorpay.com/docs/api/invoices/#issue-an-invoice
     */
    issue(id: string) {
      return api.axios.post<IInvoiceEntity>(`/invoices/${id}/issue`);
    },

    /**
     * ### Delete an Invoice
     *
     * You can only delete an invoice that is in the draft state. The response will always be an empty array.
     * ___
     * https://razorpay.com/docs/api/invoices/#delete-an-invoice
     */
    delete(id: string) {
      return api.axios.delete<IInvoiceEntity>(`/invoices/${id}`);
    },

    /**
     * ### Cancel an Invoice
     *
     * You can cancel an unpaid invoice using this endpoint
     * ___
     * https://razorpay.com/docs/api/invoices/#cancel-an-invoice
     */
    cancel(id: string) {
      return api.axios.post<IInvoiceEntity>(`/invoices/${id}/cancel`);
    },

    /**
     * ### Fetch an Invoice
     *
     * You can retrieve all the details of an invoice using the following endpoint.
     * ___
     * https://razorpay.com/docs/api/invoices/#fetch-an-invoice
     */
    get(id: string) {
      return api.axios.get<IInvoiceEntity>(`/invoices/${id}`);
    },

    /**
     * ### Fetch Multiple Invoice
     *
     * You can fetch multiple invoices using the following endpoint
     * ___
     * https://razorpay.com/docs/api/invoices/#fetch-multiple-invoices
     */
    getAll(params?: {
      type?: string;
      payment_id?: string;
      receipt?: string;
      customer_id?: string;
    }) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: IInvoiceEntity[];
      }>(`/invoices`, { params });
    },

    /**
     * ### Send Notifications
     *
     * You can send notifications with the short URL to the customer via email or SMS using the following endpoint
     * ___
     * https://razorpay.com/docs/api/invoices/#send-notifications
     */
    sendNotificatioin(id: string, medium: "sms" | "email") {
      return api.axios.post<{ success: boolean }>(
        `/invoices/${id}/notify_by/${medium}`
      );
    },
  };
}
