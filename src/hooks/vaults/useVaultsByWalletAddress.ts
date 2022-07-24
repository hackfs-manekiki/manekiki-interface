import { useWeb3React } from "@web3-react/core";
import { axiosInstance } from "src/libs/axios";
import useSWR from "swr";
import type { Vault } from "src/interfaces/vault";

export const fetchVaultsByWalletAddress = async (walletAddress?: string): Promise<Vault[]> => {
  if (!walletAddress) return [];
  try {
    const response = await axiosInstance.get<Vault[]>(`/vault/vault/${walletAddress}`);
    return response.data;
  } catch (e) {
    console.debug("fetchVaultsByWalletAddress:", e);
    return [];
    // throw e;
  }
};

export const useVaultsByWalletAddress = (walletAddress?: string) => {
  // const [vaults, setVaults] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState()
  const { account } = useWeb3React();
  const { data, error } = useSWR([`/vault/vault/:walletAddress`, walletAddress], () =>
    fetchVaultsByWalletAddress(walletAddress?.toLowerCase() ?? account?.toLowerCase()),
  );

  return {
    data: data ?? [],
    error,
    loading: !data && !error,
  };
};
