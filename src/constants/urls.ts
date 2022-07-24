import { createConstant } from "src/utils/createConstant";
import { SupportedChainIds } from "./enums/chain-id.enum";

export const urlConstants = createConstant({
  [SupportedChainIds.ETHEREUM_MAINNET]: {
    rpcUrl: "https://mainnet.infura.io/v3/",
  },
  [SupportedChainIds.POLYGON_MAINNET]: {
    rpcUrl: "https://polygonapi.terminet.io/rpc",
  },
  [SupportedChainIds.POLYGON_MUMBAI_TESTNET]: {
    rpcUrl: "https://polygontestapi.terminet.io/rpc",
  },
  [SupportedChainIds.LOCAL]: {
    rpcUrl: "http://localhost:8545/",
  },
  // [SupportedChainIds.BINANCE_SMART_CHAIN]: {
  //   rpcUrl: "https://bnb.link/rpc/",
  // },
});
