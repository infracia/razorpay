export interface RawCustomerEntity {
  contact?: string;
  created_at: number;
  email?: string;
  gstin?: string;
  id: string;
  name: string;
  notes?: Record<string, string>;
}
