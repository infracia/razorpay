import type { Razorpay } from "../index.js";
import type {
  RawCardEntity,
  RawPaymentCapturePayload,
  RawPaymentEntity,
  RawTransferCreateResponse,
  RawTransferPayload,
} from "../types/index.js";

export class Payment {
  constructor(public client: Razorpay, public raw: RawPaymentEntity) {}

  /**
   * **Capture a Payment**
   *
   * After the customer's bank authorizes the payment, you must verify if the authorized amount deducted from the customer's account is the same as the amount paid by the customer on your website or app.
   *
   * You can [configure automatic capture](https://razorpay.com/docs/payment-gateway/payments/capture-settings/#auto-capture-all-payments) of payments on the Razorpay Dashboard.
   *
   * To change the status of the payment from authorized to captured, send the following request:
   * ___
   * https://razorpay.com/docs/api/payments/#capture-a-payment
   */
  async capture(data: RawPaymentCapturePayload): Promise<this> {
    await this.client.axios
      .post<RawPaymentEntity>(`/payments/${this.raw.id}/capture`, data)
      .then((res) => (this.raw = res.data));

    return this;
  }

  /**
   * **Fetch Card Details of a Payment**
   *
   * You can retrieve the details of the card used to make a payment using the following endpoint
   * ___
   * https://razorpay.com/docs/api/payments/#fetch-card-details-of-a-payment
   */
  cardDetails(): Promise<RawCardEntity> {
    return this.client.axios
      .get<RawCardEntity>(`/payments/${this.raw.id}/card`)
      .then((res) => res.data);
  }

  /**
   * **Create Transfers from Payments**
   *
   * The following endpoint transfers a captured payment to one or more linked accounts using account_id. On a successful transfer, a response will be generated with a collection of transfer entities created for the payment.
   * ___
   * https://razorpay.com/docs/api/route/#create-transfers-from-payments
   */
  createTransfer(
    transfers: RawTransferPayload[]
  ): Promise<RawTransferCreateResponse> {
    return this.client.axios
      .post<RawTransferCreateResponse>(`/payments/${this.raw.id}/transfers`, {
        transfers,
      })
      .then((res) => res.data);
  }

  /**
   * **Update the Payment**
   *
   * You can modify an existing payment to update the ``Notes`` field only. Notes can be used to record additional information about the payment. You can add up to 15 key-value pairs with each value of the key not exceeding 256 characters.
   *
   * Using the PATCH operation, you can replace the entire ``notes`` object for the entity.
   * ___
   * https://razorpay.com/docs/api/payments/#update-the-payment
   */
  async update(notes: Record<string, string>): Promise<this> {
    await this.client.axios
      .post<RawPaymentEntity>(`/payments/${this.raw.id}`, {
        notes,
      })
      .then((res) => (this.raw = res.data));

    return this;
  }
}
