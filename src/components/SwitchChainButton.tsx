import { useCallback } from "react";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { getAddChainParameters } from "src/constants/chains";

import type { FC } from "react";

export const SwitchChainButton: FC<{}> = () => {
  const { connector, chainId } = useWeb3React();

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      // if we're already connected to the desired chain, return
      if (desiredChainId === chainId) {
        return;
      }

      // if they want to connect to the default chain and we're already connected, return
      if (desiredChainId === -1 && chainId !== undefined) {
        return;
      }

      if (connector instanceof WalletConnect || connector instanceof Network) {
        connector.activate(desiredChainId === -1 ? undefined : desiredChainId);
      } else {
        connector.activate(
          desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId),
        );
      }
    },
    [connector, chainId],
  );

  return (
    <FormControl sx={{ minWidth: 80 }} size="small">
      <Select value={chainId} onChange={(e) => switchChain(+e.target.value)}>
        <MenuItem value={1}>Mainnet</MenuItem>
        <MenuItem value={10}>Optimism</MenuItem>
        <MenuItem value={42161}>Arbitrum</MenuItem>
        <MenuItem value={1337802}>Kiln Testnet</MenuItem>
        <MenuItem value={56}>BSC</MenuItem>
      </Select>
    </FormControl>
  );
};
