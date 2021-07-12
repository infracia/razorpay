export interface ICustomerEntity {
  id: string;
  name: string;
  contact?: string;
  email?: string;
  gstin?: string;
  notes?: { [key: string]: string };
  created_at: number;
}
