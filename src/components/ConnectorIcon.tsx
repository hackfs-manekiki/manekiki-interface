import { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect";
import { MetaMaskIcon, WalletConnectIcon } from "src/svgs";
import { Box } from "@mui/material";

import type { FC } from "react";
import type { BoxProps } from "@mui/material";
import type { Connector } from "@web3-react/types";

type Props = {
  connector: Connector;
} & BoxProps;
export const ConnectorIcon: FC<Props> = ({ connector, ...props }) => {
  if (connector instanceof MetaMask)
    return (
      <Box height={36} {...props}>
        <MetaMaskIcon height={"100%"} width={null} />
      </Box>
    );
  if (connector instanceof WalletConnect)
    return (
      <Box height={28} {...props}>
        <WalletConnectIcon height={"100%"} width={null} />
      </Box>
    );
  if (connector instanceof CoinbaseWallet)
    return (
      <Box
        component="img"
        src="/static/images/coinbase-wallet-icon.jpeg"
        {...props}
        sx={{ width: 32, height: 32, borderRadius: 999, ...props.sx }}
      />
    );
  // if (connector instanceof Network) return "Network";
  // if (connector instanceof GnosisSafe) return "Gnosis Safe";
  return null;
};
