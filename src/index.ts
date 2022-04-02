import type { Axios } from "axios";
import axios from "axios";

import { OrderManager, PaymentManager } from "./manager/index.js";

export type RazorpayOptions = {
  apiUrl?: string;
  keyId: string;
  keySecret: string;
  ua?: string;
};

export class Razorpay {
  private _keyId;
  private _keySecret;
  private _apiUrl;
  private _ua;
  private _axios;

  // managers
  order: OrderManager;
  payment: PaymentManager;

  get keyId(): string {
    return this._keyId;
  }

  get keySecret(): string {
    return this._keySecret;
  }

  get apiUrl(): string {
    return this._apiUrl;
  }
  get ua(): string {
    return this._ua;
  }

  get axios(): Axios {
    return this._axios;
  }

  constructor(options: RazorpayOptions) {
    this._keyId = options.keyId;
    this._keySecret = options.keySecret;
    this._apiUrl = options.apiUrl ?? "https://api.razorpay.com/v1";
    this._ua = options.ua ?? "@infracia/razorpay";

    this._axios = axios.create({
      auth: {
        password: this._keySecret,
        username: this._keyId,
      },
      baseURL: this._apiUrl,
      headers: {
        "User-Agent": this._ua,
      },
    });

    this.order = new OrderManager(this);
    this.payment = new PaymentManager(this);
  }
}
