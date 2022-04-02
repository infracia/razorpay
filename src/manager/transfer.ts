import type { Razorpay } from "../index.js";
import { Transfer } from "../structure/index.js";
import type { RawTransferEntity, RawTransferPayload } from "../types/index.js";

export class TransferManager {
  constructor(public client: Razorpay) {}

  /**
   * **Direct Transfers**
   *
   * This API creates a direct transfer of funds from your account to linked account. On successful creation, the API responds with the created transfer entity.
   * ___
   * https://razorpay.com/docs/api/route/#direct-transfers
   */
  create(data: RawTransferPayload): Promise<Transfer> {
    return this.client.axios
      .post<RawTransferEntity>("/transfers", data)
      .then((res) => new Transfer(this.client, res.data));
  }

  /**
   * **Fetch a Transfer**
   *
   * You can use the following endpoint to fetch details of a specific transfer.
   * ___
   * https://razorpay.com/docs/api/route/#fetch-a-transfer
   */
  get(id: string): Promise<Transfer> {
    return this.client.axios
      .get<RawTransferEntity>(`/transfers/${id}`)
      .then((res) => new Transfer(this.client, res.data));
  }

  /**
   * **Fetch Transfers for a Settlement**
   *
   * You can use the following endpoint to retrieve the collection of all transfers made for a particular ``recipient_settlement_id``.
   * ___
   * https://razorpay.com/docs/api/route/#fetch-transfers-for-a-settlement
   */
  // eslint-disable-next-line camelcase
  getSettlement(recipient_settlement_id: string): Promise<Transfer[]> {
    return this.client.axios
      .get<{ items: RawTransferEntity[] }>("/transfers", {
        // eslint-disable-next-line camelcase
        params: { recipient_settlement_id },
      })
      .then((res) => res.data.items.map((d) => new Transfer(this.client, d)));
  }

  /**
   * **Fetch Settlement Details**
   *
   * You can use the following endpoint to fetch the details of settlements made to linked accounts.
   *
   * You must append ?expand[]=recipient_settlement as the query parameter to the fetch transfer request. This would return a settlement entity along with the transfer entity.
   * ___
   * https://razorpay.com/docs/api/route/#fetch-settlement-details
   */
  // eslint-disable-next-line camelcase
  getSettlementDetail(): Promise<Transfer[]> {
    return this.client.axios
      .get<{ items: RawTransferEntity[] }>("/transfers", {
        // eslint-disable-next-line camelcase
        params: { "expand[]": "recipient_settlement" },
      })
      .then((res) => res.data.items.map((d) => new Transfer(this.client, d)));
  }
}
