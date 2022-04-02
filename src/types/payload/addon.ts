import type { ISOCodes } from "../index.js";

export interface RawAddonPayload {
  amount: number;
  currency: ISOCodes;
  description?: string;
  name: string;
}
