import type { Razorpay } from "../index.js";
import { Order, Payment } from "../structure/index.js";
import type {
  RawOrderEntity,
  RawOrderPayload,
  RawPaymentEntity,
} from "../types/index.js";

export class OrderManager {
  constructor(public client: Razorpay) {}

  /**
   * **Create an Order**
   *
   * The following endpoint creates an order
   * ___
   * https://razorpay.com/docs/api/orders/#create-an-order
   */
  create(order: RawOrderPayload): Promise<Order> {
    return this.client.axios
      .post<RawOrderEntity>("/orders", order)
      .then((res) => new Order(this.client, res.data));
  }

  /**
   * **Fetch an Order With Id**
   *
   * The following endpoint retrieves the details of a particular order.
   * ___
   * https://razorpay.com/docs/api/orders/#fetch-an-order-with-id
   */
  get(orderId: string): Promise<Order> {
    return this.client.axios
      .get<RawOrderEntity>(`/orders/${orderId}`)
      .then((res) => new Order(this.client, res.data));
  }

  /**
   * **Fetch Orders**
   *
   * The following endpoint retrieves the details of all Orders created by you
   * ___
   * https://razorpay.com/docs/api/orders/#fetch-orders
   */
  getAll(params?: {
    authorized?: boolean;
    count?: number;
    "expand[]"?: "payments" | "payments.card" | "transfers" | "virtual_account";
    from?: number;
    receipt?: string;
    skip?: number;
    to?: number;
  }): Promise<Order[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawOrderEntity[];
      }>("/orders", { params })
      .then((res) => res.data.items.map((d) => new Order(this.client, d)));
  }

  /**
   * **Fetch Payments for an Order**
   *
   * You can retrieve all the payments made for an order. The response contains all the payments, either authorized or failed, for that order.
   * ___
   * https://razorpay.com/docs/api/orders/#fetch-payments-for-an-order
   */
  getPayments(orderId: string): Promise<Payment[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawPaymentEntity[];
      }>(`/orders/${orderId}/payments`)
      .then((res) => res.data.items.map((d) => new Payment(this.client, d)));
  }

  /**
   * **Update Order**
   *
   * You can modify an existing order to update the Notes field only. Notes can be used to record additional information about the order. A key-value store, the notes field can have a maximum of 15 key-value pairs, each of 256 characters (maximum).
   *
   * Using the PATCH operation, you can replace the entire notes object for the entity. To modify the notes field in a particular order, construct the API request as follows
   *
   * ___
   * https://razorpay.com/docs/api/orders/#update-order
   */
  update(orderId: string, notes: Record<string, string>): Promise<Order> {
    return this.client.axios
      .post<RawOrderEntity>(`/orders/${orderId}`, {
        notes,
      })
      .then((res) => new Order(this.client, res.data));
  }
}
