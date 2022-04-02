import type { Razorpay } from "../index.js";
import { VirtualAccount } from "../structure/index.js";
import type { RawVirtualAccountEntity } from "../types/index.js";

export class VirtualAccountManager {
  constructor(public client: Razorpay) {}

  /**
   * ### Fetch a Virtual Account by ID
   *
   * The following endpoint fetches a virtual account by ID.
   * ___
   * https://razorpay.com/docs/api/smart-collect/#fetch-a-virtual-account-by-id
   */
  get(id: string): Promise<VirtualAccount> {
    return this.client.axios
      .get<RawVirtualAccountEntity>(`virtual_accounts/${id}`)
      .then((res) => new VirtualAccount(this.client, res.data));
  }

  /**
   * ### Fetch all Virtual Accounts
   *
   * The following endpoint fetches the details of all virtual accounts
   * ___
   * https://razorpay.com/docs/api/smart-collect/#fetch-all-virtual-accounts
   */
  getAll(params: {
    count: number;
    from: number;
    skip: number;
    to: number;
  }): Promise<VirtualAccount[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawVirtualAccountEntity[];
      }>("virtual_accounts", {
        params,
      })
      .then((res) =>
        res.data.items.map((d) => new VirtualAccount(this.client, d))
      );
  }
}
