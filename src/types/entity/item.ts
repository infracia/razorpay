import type { ISOCodes } from "../index.js";

export interface RawItemEntity {
  active: true;
  amount: number;
  currency: ISOCodes;
  description: string;
  id: string;
  name: string;
}
