import type { ISOCodes } from "../index.js";

export interface RawItemPayload {
  amount: number;
  currency: ISOCodes;
  description?: string;
  name: string;
}
