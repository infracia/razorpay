import type { Axios } from "axios";
import axios from "axios";

import {
  AddonManager,
  CustomerManager,
  InvoiceManager,
  ItemManager,
  OrderManager,
  PaymentLinkManager,
  PaymentManager,
  PlanManager,
  RefundManager,
  SettlementManager,
  SettlementOnDemandManager,
  SubscriptionManager,
  TransferManager,
  VirtualAccountManager,
} from "./manager/index.js";

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

  // Managers
  addon: AddonManager;
  customer: CustomerManager;
  invoice: InvoiceManager;
  item: ItemManager;
  order: OrderManager;
  paymentLink: PaymentLinkManager;
  payment: PaymentManager;
  plan: PlanManager;
  refund: RefundManager;
  settlement: SettlementManager;
  settlementOnDemand: SettlementOnDemandManager;
  subscription: SubscriptionManager;
  transfer: TransferManager;
  virtualAccount: VirtualAccountManager;

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

    this.addon = new AddonManager(this);
    this.customer = new CustomerManager(this);
    this.invoice = new InvoiceManager(this);
    this.item = new ItemManager(this);
    this.order = new OrderManager(this);
    this.paymentLink = new PaymentLinkManager(this);
    this.payment = new PaymentManager(this);
    this.plan = new PlanManager(this);
    this.refund = new RefundManager(this);
    this.settlement = new SettlementManager(this);
    this.settlementOnDemand = new SettlementOnDemandManager(this);
    this.subscription = new SubscriptionManager(this);
    this.transfer = new TransferManager(this);
    this.virtualAccount = new VirtualAccountManager(this);
  }
}
