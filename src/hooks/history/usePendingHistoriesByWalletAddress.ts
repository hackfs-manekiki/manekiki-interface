import { useWeb3React } from "@web3-react/core";
import { axiosInstance } from "src/libs/axios";
import useSWR from "swr";
import type { RequestHistory } from "src/interfaces/request";

export const fetchPendingHistoriesByWalletAddress = async (
  walletAddress?: string,
): Promise<RequestHistory[]> => {
  if (!walletAddress) return [];
  try {
    const response = await axiosInstance.get<RequestHistory[]>(
      `/vault/request/${walletAddress}/pending`,
    );
    return response.data;
  } catch (e) {
    console.debug("fetchVaultsByWalletAddress:", e);
    return [];
    // throw e;
  }
};

export const usePendingHistoriesByWalletAddress = (walletAddress?: string) => {
  // const [vaults, setVaults] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState()
  const { account } = useWeb3React();
  const { data, error } = useSWR([`/vault/request/:walletAddress/pending`, walletAddress], () =>
    fetchPendingHistoriesByWalletAddress(walletAddress ?? account),
  );

  return {
    data: data ?? [],
    error,
    loading: !data && !error,
  };
};
