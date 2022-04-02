import type { Razorpay } from "../index.js";
import type {
  RawSettlementEntity,
  RawSettlementReconEntity,
} from "../types/index.js";

export class SettlementManager {
  constructor(public client: Razorpay) {}

  /**
   * ### Fetch Settlement using ID
   * ___
   * https://razorpay.com/docs/api/settlements/#fetch-settlement-using-id
   */
  get(settlementId: string): Promise<RawSettlementEntity> {
    return this.client.axios
      .get<RawSettlementEntity>(`/settlements/${settlementId}`)
      .then((res) => res.data);
  }

  /**
   * ### Fetch all Settlements
   * ___
   * https://razorpay.com/docs/api/settlements/#fetch-all-settlements
   */
  getAll(params?: {
    count?: number;
    from?: number;
    skip?: number;
    to?: number;
  }): Promise<RawSettlementEntity[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawSettlementEntity[];
      }>("/settlements", { params })
      .then((res) => res.data.items);
  }

  /**
   * ### Settlement Recon
   *
   * The settlement recon API returns a list of all transactions such as payments, refunds, transfers and adjustments that have been settled to you for a particular day or month.
   * ___
   * https://razorpay.com/docs/api/settlements/#settlement-recon
   */
  recon(params: {
    count?: number;
    day?: number;
    month: number;
    skip?: number;
    year: number;
  }): Promise<RawSettlementReconEntity> {
    return this.client.axios
      .get<RawSettlementReconEntity>("/settlements/recon/combined", {
        params,
      })
      .then((res) => res.data);
  }
}
