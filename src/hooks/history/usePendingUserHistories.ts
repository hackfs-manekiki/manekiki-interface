import { useWeb3React } from "@web3-react/core";
import { usePendingHistoriesByWalletAddress } from "./usePendingHistoriesByWalletAddress";

export const usePendingUserHistories = () => {
  const { account } = useWeb3React();
  return usePendingHistoriesByWalletAddress(account);
};
