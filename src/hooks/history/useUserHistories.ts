import { useWeb3React } from "@web3-react/core";
import { useHistoriesByWalletAddress } from "./useHistoriesByWalletAddress";

export const useUserHistories = () => {
  const { account } = useWeb3React();
  return useHistoriesByWalletAddress(account);
};
