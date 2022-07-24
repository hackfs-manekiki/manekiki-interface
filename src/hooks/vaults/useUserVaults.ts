import { useWeb3React } from "@web3-react/core";
import { useVaultsByWalletAddress } from "./useVaultsByWalletAddress";

export const useUserVaults = () => {
  const { account } = useWeb3React();

  return useVaultsByWalletAddress(account);
};
