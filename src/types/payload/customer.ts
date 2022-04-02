export interface RawCustomerPayload {
  contact?: string;
  email?: string;
  fail_existing?: "0" | "1";
  gstin?: string;
  name: string;
  notes?: Record<string, string>;
}
