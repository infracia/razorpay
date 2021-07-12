export interface IPaymentDowntimeEntity {
  id: string;
  entity: "payment.downtime";
  method: "cards" | "netbanking" | "wallet" | "upi";
  begin: number;
  end: null | number;
  status: "scheduled" | "started" | "resolved" | "cancelled";
  scheduled: boolean;
  severity: "HIGH" | "MEDIUM" | "LOW";
  vpa_handle: string | null;
  instrument: {
    bank: string;
    issuer: string;
    network: string;
    psp: string;
    vpa_handle: string;
    wallet: string;
  };
  created_at: number;
  updated_at: number;
}
