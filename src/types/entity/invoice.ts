import type { RawCustomerEntity } from "./customer.js";

export interface RawInvoiceAddressEntity {
  city: string;
  country: string;
  id: string;
  line1: string;
  line2: string;
  primary: true;
  state: string;
  type: string;
  zipcode: string;
}

export interface InvoiceCustomerDetail extends RawCustomerEntity {
  billing_address: RawInvoiceAddressEntity;
  shipping_address: RawInvoiceAddressEntity;
}

export interface RawInvoiceEntity {
  amount: number;
  amount_due: number;
  amount_paid: number;
  cancelled_at: number;
  comment: string;
  currency: number;
  customer_details: InvoiceCustomerDetail;
  customer_id: string;
  date: number;
  description: number;
  email_status: "pending" | "sent";
  entity: "invoice";
  expire_by: number;
  expired_at: number;
  id: string;
  invoice_number: string;
  issued_at: number;
  line_items: RawInvoiceItemEntity[];
  notes: number;
  order_id: string;
  paid_at: number;
  partial_payment: boolean;
  payment_id: string;
  short_url: number;
  sms_status: "pending" | "sent";
  status:
    | "draft"
    | "issued"
    | "partially_paid"
    | "paid"
    | "cancelled"
    | "expired"
    | "deleted";
  terms: string;
  type: "invoice";
}

export interface RawInvoiceItemEntity {
  amount: string;
  currency: string;
  description: string;
  id: string;
  item_id: string;
  name: string;
  quantity: string;
  type: string;
}
