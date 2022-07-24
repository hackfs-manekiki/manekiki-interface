import { useWeb3React } from "@web3-react/core";
import { utils } from "ethers";
import { Contract, Provider as MulticallProvider } from "ethers-multicall";
import { useEffect, useState } from "react";
import { ERC20ABI } from "src/abis";
import { useConstant } from "../useConstant";
import { useNativeTokenPrice } from "../useNativeTokenPrice";

export const useVaultBalances = (vaultAddress: string) => {
  const { provider, chainId } = useWeb3React();

  const { contractAddress } = useConstant();
  const { usd: nativeTokenPrice } = useNativeTokenPrice();

  const [ethBalance, setEthBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);
  const [usdtBalance, setUsdtBalance] = useState(0);
  const [usdcBalance, setUsdcBalance] = useState(0);

  useEffect(() => {
    if (provider && vaultAddress) {
      const fetchBalances = async () => {
        const multicall = new MulticallProvider(provider, chainId);
        const daiContract = new Contract(contractAddress.dai, ERC20ABI);
        const usdtContract = new Contract(contractAddress.usdt, ERC20ABI);
        const usdcContract = new Contract(contractAddress.usdc, ERC20ABI);

        const [ethBalance, daiBalance, usdtBalance, usdcBalance] = await multicall.all([
          multicall.getEthBalance(vaultAddress),
          daiContract.balanceOf(vaultAddress),
          usdtContract.balanceOf(vaultAddress),
          usdcContract.balanceOf(vaultAddress),
        ]);

        const formattedEther = +utils.formatEther(ethBalance);
        const formattedDai = +utils.formatUnits(daiBalance, 18);
        const formattedUsdt = +utils.formatUnits(usdtBalance, 6);
        const formattedUsdc = +utils.formatUnits(usdcBalance, 6);
        setEthBalance(formattedEther);
        setDaiBalance(formattedDai);
        setUsdtBalance(formattedUsdt);
        setUsdcBalance(formattedUsdc);
      };

      fetchBalances();
    }
  }, [vaultAddress, contractAddress, provider, chainId, nativeTokenPrice]);

  return {
    ethBalance,
    ethBalanceUsd: ethBalance * nativeTokenPrice,
    daiBalance,
    usdcBalance,
    usdtBalance,
    totalBalanceUsd: ethBalance * nativeTokenPrice + daiBalance + usdcBalance + usdtBalance,
  };
};
