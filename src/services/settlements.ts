import { ISettlementEntity, ISettlementReconResponse, RazorpayApi } from "..";

export function settlements(api: RazorpayApi) {
  return {
    /**
     * ### Fetch all Settlements
     * ___
     * https://razorpay.com/docs/api/settlements/#fetch-all-settlements
     */
    getAll(params?: {
      from?: number;
      to?: number;
      count?: number;
      skip?: number;
    }) {
      return api.axios.get<{
        entity: "collection";
        count: number;
        items: ISettlementEntity[];
      }>(`/settlements`, { params });
    },

    /**
     * ### Fetch Settlement using ID
     * ___
     * https://razorpay.com/docs/api/settlements/#fetch-settlement-using-id
     */
    getById(settlementId: string) {
      return api.axios.get<ISettlementEntity>(`/settlements/${settlementId}`);
    },

    /**
     * ### Settlement Recon
     *
     * The settlement recon API returns a list of all transactions such as payments, refunds, transfers and adjustments that have been settled to you for a particular day or month.
     * ___
     * https://razorpay.com/docs/api/settlements/#settlement-recon
     */
    recon(params: {
      year: number;
      month: number;
      day?: number;
      count?: number;
      skip?: number;
    }) {
      return api.axios.get<ISettlementReconResponse>(
        `/settlements/recon/combined`,
        {
          params,
        }
      );
    },
  };
}
