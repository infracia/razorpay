export type RawPaymentDowntimeEntity = {
  count: number;
  entity: string;
  items: RawPaymentDowntimeItemEntity[];
};

export type RawPaymentDowntimeItemEntity = {
  begin: number;
  created_at: number;
  end: null | number;
  entity: "payment.downtime";
  id: string;
  instrument: {
    bank: string;
    issuer: string;
    network: string;
    psp: string;
    vpa_handle: string;
    wallet: string;
  };
  method: "cards" | "netbanking" | "wallet" | "upi";
  scheduled: boolean;
  severity: "HIGH" | "MEDIUM" | "LOW";
  status: "scheduled" | "started" | "resolved" | "cancelled";
  updated_at: number;
  vpa_handle: string | null;
};
