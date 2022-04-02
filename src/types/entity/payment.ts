export interface RawPaymentEntity {
  acquirer_data: {
    arn?: string;
    rrn?: string;
    utr?: string;
  };
  amount: string;
  amount_refunded: number;
  bank: string;
  base_amount: string;
  base_currency: string;
  captured: boolean;
  card_id: string;
  contact: string;
  created_at: number;
  currency: string;
  description: string;
  email: string;
  entity: "payment";
  error_code: string;
  error_description: string;
  error_reason: string;
  error_source: string;
  error_step: string;
  fee: number;
  id: string;
  international: boolean;
  invoice_id: string;
  method: "card" | "netbanking" | "wallet" | "emi" | "upi";
  notes: Record<string, string>;
  order_id: string;
  refund_status: null | "partial" | "full";
  status: "created" | "authorized" | "captured" | "refunded" | "failed";
  tax: number;
  vpa: string;
  wallet: string;
}
