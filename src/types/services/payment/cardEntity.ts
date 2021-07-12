export interface ICardEntity {
  id: string;
  entity: string;
  name: string;
  last4: string;
  network: string;
  type: string;
  issuer: string;
  international: boolean;
  emi: boolean;
  sub_type: boolean;
}
