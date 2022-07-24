import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { ContractAddresses } from "src/constants/contracts";
import { SupportedChainIds } from "src/constants/enums/chain-id.enum";

export const useConstant = () => {
  const context = useWeb3React();
  const chainId = context.chainId as SupportedChainIds;

  return useMemo(
    () => ({
      contractAddress: ContractAddresses[chainId ?? SupportedChainIds.POLYGON_MAINNET],
    }),
    [chainId],
  );
};
