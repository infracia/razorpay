import type { Razorpay } from "../index.js";
import type {
  RawOrderEntity,
  RawPaymentEntity,
  RawTransferEntity,
} from "../types/index.js";
import { Payment, Transfer } from "./index.js";

export class Order {
  constructor(public client: Razorpay, public raw: RawOrderEntity) {}

  /**
   * **Fetch Payments for an Order**
   *
   * You can retrieve all the payments made for an order. The response contains all the payments, either authorized or failed, for that order.
   * ___
   * https://razorpay.com/docs/api/orders/#fetch-payments-for-an-order
   */
  getPayments(): Promise<Payment[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawPaymentEntity[];
      }>(`/orders/${this.raw.id}/payments`)
      .then((res) => res.data.items.map((d) => new Payment(this.client, d)));
  }

  /**
   * **Fetch Transfer for an Order**
   *
   * Use this endpoint to fetch the collection of all transfers created on a specific Order ID.
   * ___
   * https://razorpay.com/docs/api/route/#fetch-transfer-for-an-order
   */
  getTransfers(params?: { "expand[]": "transfer" }): Promise<Transfer> {
    return this.client.axios
      .get<RawTransferEntity>(`/orders/${this.raw.id}/?expand[]=transfers`, {
        params,
      })
      .then((res) => new Transfer(this.client, res.data));
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
  update(notes: Record<string, string>): Promise<Order> {
    return this.client.axios
      .post<RawOrderEntity>(`/orders/${this.raw.id}`, {
        notes,
      })
      .then(() => {
        this.raw.notes = notes;
        return this;
      });
  }
}
