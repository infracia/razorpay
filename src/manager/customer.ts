import type { Razorpay } from "../index.js";
import { Customer } from "../structure/index.js";
import type { RawCustomerEntity, RawCustomerPayload } from "../types/index.js";

export class CustomerManager {
  constructor(public client: Razorpay) {}

  /**
   * **Fetch all Customers**
   *
   * You can use the below endpoint to fetch all customers in your system.
   * ___
   * https://razorpay.com/docs/api/customers/#fetch-all-customers
   */
  getAll(): Promise<Customer[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawCustomerEntity[];
      }>("/customers")
      .then((res) => res.data.items.map((d) => new Customer(this.client, d)));
  }

  /**
   * **Fetch Customer by ID**
   *
   * Use the below endpoint to fetch details of a customer by ID.
   * ___
   * https://razorpay.com/docs/api/customers/#fetch-customer-by-id
   */
  get(customerId: string): Promise<Customer> {
    return this.client.axios
      .get<RawCustomerEntity>(`/customers/${customerId}`)
      .then((res) => new Customer(this.client, res.data));
  }

  /**
   * **Create a Customer**
   *
   * Use the below endpoint to create a customer.
   * ___
   * https://razorpay.com/docs/api/customers/#create-a-customer
   */
  create(customer: RawCustomerPayload): Promise<Customer> {
    return this.client.axios
      .post<RawCustomerEntity>("/customers", customer)
      .then((res) => new Customer(this.client, res.data));
  }
}
