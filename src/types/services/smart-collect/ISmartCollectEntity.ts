export interface ISmartCollectEntity {
  id: string;
  name: string;
  entity: string;
  status: string;
  description: string;
  notes: { [key: string]: string };
  amount_paid: number;
  customer_id: string;
  receivers: {
    id: string;
    entity: string;
    ifsc: string;
    bank_name: string;
    name: string;
    notes: { [key: string]: string };
    account_number: string;
    username: string;
    handle: string;
    address: string;
  }[];
  close_by: number;
  closed_at: number;
  created_at: number;
}
