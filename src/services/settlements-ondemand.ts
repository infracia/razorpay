import { RazorpayApi } from "..";
import { ISettlementOnDemand } from "../types/services/settlements/settlement-ondemand";

export function settlementsOnDemand(api: RazorpayApi) {
  return {
    /**
     * ### Create an On-demand Settlement
     * ___
     * https://razorpay.com/docs/api/settlements/#create-an-on-demand-settlement
     */
    create(demand: {
      amount: number;
      settle_full_balance?: boolean;
      description?: string;
      notes: { [key: string]: string };
    }) {
      return api.axios.post<ISettlementOnDemand>(
        `/settlements/ondemand`,
        demand
      );
    },

    /**
     * ### Fetch All On-demand Settlements
     *
     * Use the below endpoint to fetch details of all On-demand settlements. Use the expand[]=ondemand_payouts query parameter to fetch payout details as part of the response.
     * ___
     * https://razorpay.com/docs/api/settlements/#fetch-all-on-demand-settlements
     */
    getAll(params?: {
      "expand[]"?: "ondemand_payouts";
      from?: number;
      to?: number;
      count?: number;
      skip?: number;
    }) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: ISettlementOnDemand[];
      }>(`/settlements/ondemand`, {
        params,
      });
    },
    /**
     * ### Fetch by On-demand Settlements by ID
     *
     * Use the below endpoint to fetch details of all On-demand settlements. Use the expand[]=ondemand_payouts query parameter to fetch payout details as part of the response.
     * ___
     * https://razorpay.com/docs/api/settlements/#fetch-by-on-demand-settlements-by-id
     */
    getById(
      settlementId: string,
      params?: { "expand[]"?: "ondemand_payouts" }
    ) {
      return api.axios.get<ISettlementOnDemand>(
        `/settlements/ondemand/${settlementId}`,
        { params }
      );
    },
  };
}
