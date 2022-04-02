import type { RawInvoiceAddressPayload } from "./address.js";
import type { RawItemPayload } from "./item.js";

export interface RawInvoicePayload {
  currency: string;
  customer?: {
    billing_address?: RawInvoiceAddressPayload;
    contact?: string;
    email?: string;
    name: string;
    shipping_address?: RawInvoiceAddressPayload;
  };
  customer_id?: string;
  description?: string;
  draft?: string;
  email_notify?: boolean;
  expire_by?: number;
  line_items?: RawItemPayload & {
    item_id: string;
    quantity?: number;
  };
  partial_payment?: boolean;
  sms_notify?: boolean;
  type: "invoice";
}
