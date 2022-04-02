import type { Razorpay } from "../index.js";
import type {
  RawBankTransferEntity,
  RawPaymentEntity,
  RawRefundEntity,
  RawRefundPayload,
  RawUPIEntity,
  RawVirtualAccountEntity,
} from "../types/index.js";
import { Payment, Refund } from "./index.js";

export class VirtualAccount {
  constructor(public client: Razorpay, public raw: RawVirtualAccountEntity) {}

  /**
   * ### Fetch Payments for a Virtual Account
   *
   * The following endpoint fetches payments made against a particular virtual account.
   * ___
   * https://razorpay.com/docs/api/smart-collect/#fetch-payments-for-a-virtual-account
   */
  getPayments(params: {
    count: number;
    from: number;
    skip: number;
    to: number;
  }): Promise<Payment[]> {
    return this.client.axios
      .get<{ count: number; items: RawPaymentEntity[] }>(
        `virtual_accounts/${this.raw.id}/payments`,
        { params }
      )
      .then((res) => res.data.items.map((d) => new Payment(this.client, d)));
  }

  /**
   * ### Bank Transfer
   * ___
   * https://razorpay.com/docs/api/smart-collect/#bank-transfer
   */
  bankTransfer(): Promise<RawBankTransferEntity[]> {
    return this.client.axios
      .get<{ items: RawBankTransferEntity[] }>(
        `virtual_accounts/${this.raw.id}/bank_transfer`
      )
      .then((res) => res.data.items);
  }

  /**
   * ### UPI
   * ___
   * https://razorpay.com/docs/api/smart-collect/#upi
   */
  upi(): Promise<RawUPIEntity[]> {
    return this.client.axios
      .get<{ items: RawUPIEntity[] }>(
        `virtual_accounts/${this.raw.id}/upi_transfer`
      )
      .then((res) => res.data.items);
  }

  /**
   * ### Refund Payments made to a Virtual Account
   *
   * You can process refunds for a payment made towards a virtual account. The following endpoint refunds a payment using the payment ID.
   * ___
   * https://razorpay.com/docs/api/smart-collect/#refund-payments-made-to-a-virtual-account
   */
  refundPayment(data: RawRefundPayload): Promise<Refund> {
    return this.client.axios
      .post<RawRefundEntity>(`virtual_accounts/${this.raw.id}/refund`, data)
      .then((res) => new Refund(this.client, res.data));
  }

  /**
   * ### Add Receiver to an Existing Virtual Account
   *
   * You can add receiver to an existing virtual account using the endpoint given below.
   * ___
   * https://razorpay.com/docs/api/smart-collect/#add-receiver-to-an-existing-virtual-account
   */
  addReceiver(data: {
    types: ("bank_account" | "vpa")[];
    vpa: { descriptor: string };
  }): Promise<VirtualAccount> {
    return this.client.axios
      .post<RawVirtualAccountEntity>(
        `virtual_accounts/${this.raw.id}/receivers`,
        data
      )
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }

  /**
   * ### Close a Virtual Account
   *
   * The following endpoint closes a virtual account.
   * ___
   * https://razorpay.com/docs/api/smart-collect/#add-receiver-to-an-existing-virtual-account
   */
  close(): Promise<VirtualAccount> {
    return this.client.axios
      .post<RawVirtualAccountEntity>(`virtual_accounts/${this.raw.id}/close`)
      .then((res) => {
        this.raw = res.data;
        return this;
      });
  }
}
