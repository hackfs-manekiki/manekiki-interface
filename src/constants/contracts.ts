import { createConstant } from "src/utils/createConstant";
import { SupportedChainIds } from "./enums/chain-id.enum";

export type ContractAddressKey = "usdt" | "usdc" | "kiusd" | "factory";
export const ContractAddresses = createConstant<Record<ContractAddressKey, string>>({
  [SupportedChainIds.ETHEREUM_MAINNET]: {
    factory: "",
    usdt: "",
    usdc: "",
    kiusd: "",
    // dai: "",
  },
  [SupportedChainIds.POLYGON_MAINNET]: {
    factory: "",
    usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    kiusd: "",
    // dai: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
  [SupportedChainIds.POLYGON_MUMBAI_TESTNET]: {
    factory: "0x155409cdfd8139b64de978d960cbd18bbbb508bc",
    // weth: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889", // paradigm
    usdt: "0x3813e82e6f7098b9583FC0F33a962D02018B6803", // sushiswap
    usdc: "0x742DfA5Aa70a8212857966D491D67B09Ce7D6ec7", // sushiswap
    kiusd: "0xf95f381faB58F70c435eC873b33DF1f7aE6BFE14",
    // dai: "0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1", // sushiswap
    // der20: "0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1"
  },
  [SupportedChainIds.LOCAL]: {
    factory: "",
    usdt: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    usdc: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    kiusd: "",
    // dai: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
  },
});
