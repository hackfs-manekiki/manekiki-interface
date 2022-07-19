import { GnosisSafe } from "@web3-react/gnosis-safe";
import { Network } from "@web3-react/network";
import { WalletConnect } from "@web3-react/walletconnect";
import { useCallback, useState } from "react";
import { getAddChainParameters } from "src/constants/chains";
import { Button } from "@mui/material";

import type { FC } from "react";
import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import type { Web3ReactHooks } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { getConnectorName } from "src/utils/getConnectorName";
import { walletStore } from "src/stores/walletStore";

type ConnectorCardProps = {
  connector: MetaMask | WalletConnect | CoinbaseWallet | Network | GnosisSafe;
  chainId?: ReturnType<Web3ReactHooks["useChainId"]>;
  isActivating?: ReturnType<Web3ReactHooks["useIsActivating"]>;
  isActive?: ReturnType<Web3ReactHooks["useIsActive"]>;
  error?: Error | undefined;
  setError?: (error: Error | undefined) => void;
  hooks?: Web3ReactHooks;
};

export const ConnectorCard: FC<ConnectorCardProps> = ({ connector }) => {
  const isNetwork = connector instanceof Network;
  const [desiredChainId, _setDesiredChainId] = useState<number>(isNetwork ? 1 : -1);

  const onClick = useCallback(async () => {
    try {
      if (connector instanceof GnosisSafe) {
        await connector.activate();
      } else if (connector instanceof WalletConnect || connector instanceof Network) {
        await connector.activate(desiredChainId === -1 ? undefined : desiredChainId);
      } else {
        await connector.activate(
          desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId),
        );
      }
    } catch (error) {
      console.log(`🚀 ~ error`, error);
      // Toast/Alert
    }
    walletStore.setWalletOpen(false);
  }, [connector, desiredChainId]);

  return (
    <Button
      onClick={onClick}
      variant="text"
      sx={{ width: "100%", height: 100, borderRadius: 16, backgroundColor: "#383838" }}
    >
      {/* <Paper sx={{ borderRadius: 16, width: "100%", height: 100 }}> */}
      {getConnectorName(connector)}
      {/* </Paper> */}
    </Button>
  );
};
