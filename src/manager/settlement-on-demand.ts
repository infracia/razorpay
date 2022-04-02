import type { Razorpay } from "../index.js";
import type {
  RawSettlementOnDemandEntity,
  RawSettlementOnDemandPayload,
} from "../types/index.js";

export class SettlementOnDemandManager {
  constructor(public client: Razorpay) {}

  /**
   * ### Create an On-demand Settlement
   * ___
   * https://razorpay.com/docs/api/settlements/#create-an-on-demand-settlement
   */
  create(
    demand: RawSettlementOnDemandPayload
  ): Promise<RawSettlementOnDemandEntity> {
    return this.client.axios
      .post<RawSettlementOnDemandEntity>("/settlements/ondemand", demand)
      .then((res) => res.data);
  }

  /**
   * ### Fetch by On-demand Settlements by ID
   *
   * Use the below endpoint to fetch details of all On-demand settlements. Use the expand[]=ondemand_payouts query parameter to fetch payout details as part of the response.
   * ___
   * https://razorpay.com/docs/api/settlements/#fetch-by-on-demand-settlements-by-id
   */
  get(
    settlementId: string,
    params?: { "expand[]"?: "ondemand_payouts" }
  ): Promise<RawSettlementOnDemandEntity> {
    return this.client.axios
      .get<RawSettlementOnDemandEntity>(
        `/settlements/ondemand/${settlementId}`,
        { params }
      )
      .then((res) => res.data);
  }

  /**
   * ### Fetch All On-demand Settlements
   *
   * Use the below endpoint to fetch details of all On-demand settlements. Use the expand[]=ondemand_payouts query parameter to fetch payout details as part of the response.
   * ___
   * https://razorpay.com/docs/api/settlements/#fetch-all-on-demand-settlements
   */
  getAll(params?: {
    count?: number;
    "expand[]"?: "ondemand_payouts";
    from?: number;
    skip?: number;
    to?: number;
  }): Promise<RawSettlementOnDemandEntity[]> {
    return this.client.axios
      .get<{
        count: number;
        entity: "collection";
        items: RawSettlementOnDemandEntity[];
      }>("/settlements/ondemand", {
        params,
      })
      .then((res) => res.data.items);
  }
}
