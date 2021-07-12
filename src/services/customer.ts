import { RazorpayApi } from "..";
import { ICustomerEntity } from "../types";

export function customer(api: RazorpayApi) {
  return {
    /**
     * ### Fetch all Customers
     *
     * You can use the below endpoint to fetch all customers in your system.
     * ___
     * https://razorpay.com/docs/api/customers/#fetch-all-customers
     */
    getAll() {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: ICustomerEntity[];
      }>("/customers");
    },

    /**
     * ### Fetch Customer by ID
     *
     * Use the below endpoint to fetch details of a customer by ID.
     * ___
     * https://razorpay.com/docs/api/customers/#fetch-customer-by-id
     */
    get(customerId: string) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: ICustomerEntity[];
      }>(`/customers/${customerId}`);
    },

    /**
     * ### Create a Customer
     *
     * Use the below endpoint to create a customer.
     * ___
     * https://razorpay.com/docs/api/customers/#create-a-customer
     */
    create(
      customer: ICustomerEntity & {
        id: never;
        created_at: never;
        fail_existing: "0" | "1";
      }
    ) {
      return api.axios.post<ICustomerEntity>("/customers", customer);
    },

    /**
     * ### Edit Customer Details
     *
     * Use the below endpoint to edit a customer details.
     * ___
     * https://razorpay.com/docs/api/customers/#edit-customer-details
     */
    edit(
      customerId: string,
      customer: ICustomerEntity & {
        id: never;
        created_at: never;
        fail_existing: "0" | "1";
      }
    ) {
      return api.axios.post<ICustomerEntity>(
        `/customers/${customerId}`,
        customer
      );
    },
  };
}
