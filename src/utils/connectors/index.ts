import { coinbaseWallet, hooks as coinbaseWalletHooks } from "./coinbaseWallet";
import { hooks as metaMaskHooks, metaMask } from "./metaMask";
import { hooks as walletConnectHooks, walletConnect } from "./walletConnect";

// types
import type { Web3ReactHooks } from "@web3-react/core";
import type { CoinbaseWallet } from "@web3-react/coinbase-wallet";
import type { MetaMask } from "@web3-react/metamask";
import type { Network } from "@web3-react/network";
import type { WalletConnect } from "@web3-react/walletconnect";

export const connectors: [MetaMask | WalletConnect | CoinbaseWallet | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [walletConnect, walletConnectHooks],
  [coinbaseWallet, coinbaseWalletHooks],
  // [network, networkHooks],
];
