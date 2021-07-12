import { IInvoiceAddress } from "./invoiceEntity";

export interface IInvoiceRequestCreate {
  type: "invoice";
  description?: string;
  draft?: string;
  customer_id?: string;
  customer?: {
    name: string;
    email?: string;
    contact?: string;
    billing_address?: Omit<IInvoiceAddress, "id">;
    shipping_address?: Omit<IInvoiceAddress, "id">;
  };
  line_items?: {
    item_id: string;
    name: string;
    description?: string;
    amount: string;
    currency?: string;
    quantity?: string;
  };
  expire_by?: number;
  sms_notify?: boolean;
  email_notify?: boolean;
  partial_payment?: boolean;
  currency: string;
}
