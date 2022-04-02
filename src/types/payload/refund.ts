export interface RawRefundPayload {
  amount: number;
  notes: Record<string, string>;
  receipt: string;
  // https://razorpay.com/docs/api/route/#refund-payments-and-reverse-transfer-from-a-linked
  reverse_all: boolean;
  speed: "normal" | "o  ptimum";
}
