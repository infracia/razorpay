export interface IPaymentEntity {
  id: string;
  entity: string;
  amount: string;
  currency: string;
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  base_amount: string;
  base_currency: string;
  method: "card" | "netbanking" | "wallet" | "emi" | "upi";
  order_id: string;
  description: string;
  international: boolean;
  refund_status: null | "partial" | "full";
  amount_refunded: number;
  captured: boolean;
  email: string;
  contact: string;
  fee: number;
  tax: number;
  error_code: string;
  error_description: string;
  error_source: string;
  error_step: string;
  error_reason: string;
  notes: { [key: string]: string };
  created_at: number;
  acquirer_data: {
    arn?: string;
    rrn?: string;
    utr?: string;
  };
  card_id: string;
  bank: string;
  wallet: string;
  invoice_id: string;
  vpa: string;
}
