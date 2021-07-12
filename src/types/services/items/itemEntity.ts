import { IsoCodes } from "../payment/isocodes";

export interface IItemEntity {
  id: string;
  active: true;
  name: string;
  description: string;
  amount: number;
  currency: IsoCodes;
}
