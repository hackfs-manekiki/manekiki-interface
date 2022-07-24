import { useWeb3React } from "@web3-react/core";
import axios from "axios";
import { useMemo } from "react";
import { useLaggySWR } from "./useLaggySwr";

export const useNativeTokenPrice = () => {
  const { chainId } = useWeb3React();

  const tokenId = useMemo(() => {
    switch (chainId) {
      case 137:
      case 80001:
        return "matic-network";
      default:
        return "ethereum";
    }
  }, [chainId]);

  const fetcher = async () => {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
      params: {
        ids: tokenId,
        vs_currencies: "usd",
        // include_market_cap: true,
        // include_24hr_vol: true,
        // include_24hr_change: true,
        // include_last_updated_at: true,
      },
    });
    return data[tokenId];
  };

  const { data, error } = useLaggySWR(["/simple/price", tokenId], fetcher);

  return (
    data ?? {
      usd: 0,
      // usd_market_cap: 0,
      // usd_24h_vol: 0,
      // usd_24h_change: 0,
      // last_updated_at: 0,
    }
  );
};
