import type { SupportedChainIds } from "src/constants/enums/chain-id.enum";

export const createConstant = <T>(constant: Record<SupportedChainIds, T>) => constant;
