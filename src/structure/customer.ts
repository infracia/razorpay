import type { Razorpay } from "../index.js";
import type { RawCustomerEntity } from "../types/index.js";

export class Customer {
  constructor(public client: Razorpay, public raw: RawCustomerEntity) {}

  /**
   * **Edit Customer Details**
   *
   * Use the below endpoint to edit a customer details.
   * ___
   * https://razorpay.com/docs/api/customers/#edit-customer-details
   */
  edit(customer: Omit<RawCustomerEntity, "id">): Promise<Customer> {
    return this.client.axios
      .post<RawCustomerEntity>(`/customers/${this.raw.id}`, customer)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }
}
