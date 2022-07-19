import { useWeb3React } from "@web3-react/core";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const useRoutesGuard = () => {
  const { isActive, isActivating } = useWeb3React();
  const router = useRouter();

  useEffect(() => {
    if (router && !isActive && !isActivating) {
      router.push("/connect", undefined, {});
    }
  }, [isActive, isActivating, router]);
};
