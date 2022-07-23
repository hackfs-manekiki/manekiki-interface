import { createConstant } from "src/utils/createConstant";
import { SupportedChainIds } from "./enums/chain-id.enum";

export const ContractAddresses = createConstant<Record<"usdt" | "usdc" | "dai", string>>({
  [SupportedChainIds.ETHEREUM_MAINNET]: {
    usdt: "",
    usdc: "",
    dai: "",
  },
  [SupportedChainIds.POLYGON_MAINNET]: {
    usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    dai: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
  [SupportedChainIds.LOCAL]: {
    usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    dai: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
});
