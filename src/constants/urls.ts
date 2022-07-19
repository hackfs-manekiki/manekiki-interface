import { createConstant } from "src/utils/createContant";
import { SupportedChainIds } from "./enums/chain-id.enum";

export const urlConstants = createConstant({
  [SupportedChainIds.ETHEREUM_MAINNET]: {
    rpcUrl: "https://mainnet.infura.io/v3/",
  },
  [SupportedChainIds.BINANCE_SMART_CHAIN]: {
    rpcUrl: "https://bnb.link/rpc/",
  },
});
