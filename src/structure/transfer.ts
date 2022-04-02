import type { Razorpay } from "../index.js";
import type { RawReversalEntity, RawTransferEntity } from "../types/index.js";

export class Transfer {
  constructor(public client: Razorpay, public raw: RawTransferEntity) {}

  /**
   * **Modify Settlement Hold for Transfers**
   *
   * You can use the following endpoint to modify the settlement configuration for a particular transfer_id. On successful request, the API responds with the modified transfer entity.
   *
   * ___
   * https://razorpay.com/docs/api/route/#modify-settlement-hold-for-transfers
   */
  modifySettlementHoldForTransfer(params?: {
    on_hold: boolean;
    on_hold_until: number;
  }): Promise<Transfer> {
    return this.client.axios
      .patch<RawTransferEntity>(`/transfers/${this.raw.id}`, params)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * **Reverse Transfers from all Linked Accounts**
   *
   * While a transfer moves funds from your account to linked accounts, a reversal can move funds back into your account.
   *
   * You can use the following endpoint to create reversals on a particular ``transfer_id``
   *
   * ___
   * https://razorpay.com/docs/api/route/#reverse-transfers-from-all-linked-accounts
   */
  reverseTransferFromAllAccount(amount?: number): Promise<RawReversalEntity> {
    return this.client.axios
      .post<RawReversalEntity>(`/transfers/${this.raw.id}/reversals`, {
        amount,
      })
      .then((res) => res.data);
  }
}
