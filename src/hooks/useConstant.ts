import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { ContractAddresses } from "src/constants/contracts";
import type { SupportedChainIds } from "src/constants/enums/chain-id.enum";

export const useConstant = () => {
  const context = useWeb3React();
  const chainId = context.chainId as SupportedChainIds;

  return useMemo(
    () => ({
      contractAddress: chainId ? ContractAddresses[chainId] : { usdt: "", usdc: "", dai: "" },
    }),
    [chainId],
  );
};
