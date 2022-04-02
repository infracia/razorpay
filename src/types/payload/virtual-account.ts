export interface RawVirtualAccountPayload {
  close_by: number;
  customer_id: string;
  description: string;
  notes: Record<string, string>;
  receivers: {
    types: ("bank_account" | "vpa")[];
    vpa: {
      descriptor: string;
    };
  };
}
