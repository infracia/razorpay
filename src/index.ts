import axios, { AxiosInstance } from "axios";
import * as services from "./services";
export * from "./types";

export class RazorpayApi {
  // public
  apiUrl: string;
  axios: AxiosInstance;

  // private
  #ua;
  #keyId: string;
  #keySecret: string;

  constructor(options: {
    keyId: string;
    keySecret: string;
    apiUrl?: string;
    ua?: string;
  }) {
    this.apiUrl = options.apiUrl ?? "https://api.razorpay.com/v1";

    this.#keyId = options.keyId;
    this.#keySecret = options.keySecret;
    this.#ua = options.ua ?? "@infracia/razorpay";

    this.axios = axios.create({
      baseURL: this.apiUrl,
      auth: {
        username: this.#keyId,
        password: this.#keySecret,
      },
      headers: {
        "User-Agent": this.#ua,
      },
    });
  }
}

export class Razorpay {
  api: RazorpayApi;

  constructor(options: {
    keyId: string;
    keySecret: string;
    apiUrl?: string;
    ua?: string;
  }) {
    this.api = new RazorpayApi(options);
  }

  /**
   * axios wrapper for authenticated requests to razor pay
   * @returns axios instance
   */
  get axios() {
    return this.api.axios;
  }

  /**
   * razory pay payment api wrapper
   * @returns payment methods
   */
  get payment() {
    return services.payment(this.api);
  }

  /**
   * razory pay customer api wrapper
   * @returns methods
   */
  get customer() {
    return services.customer(this.api);
  }

  /**
   * razory pay customer api wrapper
   * @returns methods
   */
  get order() {
    return services.order(this.api);
  }

  /**
   * razory pay invoice api wrapper
   * @returns methods
   */
  get invoice() {
    return services.invoice(this.api);
  }

  /**
   * razory pay items api wrapper
   * @returns methods
   */
  get items() {
    return services.items(this.api);
  }

  /**
   * razory pay payment-links api wrapper
   * @returns methods
   */
  get paymentLinks() {
    return services.paymentLinks(this.api);
  }

  /**
   * razory pay refund api wrapper
   * @returns methods
   */
  get refund() {
    return services.refund(this.api);
  }

  /**
   * razory pay settlements api wrapper
   * @returns methods
   */
  get settlements() {
    return services.settlements(this.api);
  }

  /**
   * razory pay settlementsOnDemand api wrapper
   * @returns methods
   */
  get settlementsOnDemand() {
    return services.settlementsOnDemand(this.api);
  }

  /**
   * razory pay smartCollect api wrapper
   * @returns methods
   */
  get smartCollect() {
    return services.smartCollect(this.api);
  }

  /**
   * razory pay subscription api wrapper
   * @returns methods
   */
  get subscription() {
    return services.subscription(this.api);
  }

  /**
   * razory pay subscriptionAddon api wrapper
   * @returns methods
   */
  get subscriptionAddon() {
    return services.subscriptionAddon(this.api);
  }

  /**
   * razory pay subscriptionPlan api wrapper
   * @returns methods
   */
  get subscriptionPlan() {
    return services.subscriptionPlan(this.api);
  }

  /**
   * razory pay transfers api wrapper
   * @returns methods
   */
  get transfers() {
    return services.transfers(this.api);
  }
}

export default Razorpay;
