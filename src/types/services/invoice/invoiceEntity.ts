import { ICustomerEntity } from "../customer/customerEntity";
import { IInvoiceItemEntity } from "./itemEntity";

export interface IInvoiceAddress {
  id: string;
  type: string;
  primary: true;
  line1: string;
  line2: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
}

interface InvoiceCustomerDetail extends ICustomerEntity {
  billing_address: IInvoiceAddress;
  shipping_address: IInvoiceAddress;
}

export interface IInvoiceEntity {
  id: string;
  entity: "invoice";
  type: "invoice";
  invoice_number: string;
  customer_id: string;
  order_id: string;
  payment_id: string;
  status:
    | "draft"
    | "issued"
    | "partially_paid"
    | "paid"
    | "cancelled"
    | "expired"
    | "deleted";
  expire_by: number;
  issued_at: number;
  paid_at: number;
  cancelled_at: number;
  expired_at: number;
  sms_status: "pending" | "sent";
  email_status: "pending" | "sent";
  partial_payment: boolean;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: number;
  description: number;
  notes: number;
  short_url: number;
  date: number;
  terms: string;
  comment: string;
  customer_details: InvoiceCustomerDetail;
  line_items: IInvoiceItemEntity[];
}
