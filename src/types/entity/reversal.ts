export interface RawReversalEntity {
  amount: number;
  created_at: number;
  currency: string;
  customer_refund_id: string | null;
  entity: "reversal";
  fee: number;
  id: string;
  initiator_id: string;
  notes: Record<string, string>;
  tax: number;
  transfer_id: string;
}
