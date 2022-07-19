import { useEffect, useState } from "react";
import { hooks, metaMask } from "src/utils/connectors/metaMask";

import type { FC } from "react";
import { BaseCard } from "./BaseCard";

const { useChainId, useAccounts, useIsActivating, useIsActive, useProvider, useENSNames } = hooks;

type MetaMaskCardProps = {};
export const MetaMaskCard: FC<MetaMaskCardProps> = () => {
  const chainId = useChainId();
  const accounts = useAccounts();
  const isActivating = useIsActivating();

  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  const [error, setError] = useState<Error>();

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => console.debug("MetaMask: Eagerly Connect Failed"));
  }, []);

  return (
    <div>
      <BaseCard
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        isActive={isActive}
        error={error}
        setError={setError}
        accounts={accounts}
        provider={provider}
        ENSNames={ENSNames}
      />
    </div>
  );
};
