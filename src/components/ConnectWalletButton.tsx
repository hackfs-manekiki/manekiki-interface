import { useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { metaMask } from "src/utils/connectors/metaMask";
import { shortenAddress } from "src/utils/shortenAddress";

export const ConnectWalletButton = () => {
  const { connector, account, ENSName, isActive, isActivating, chainId } = useWeb3React();

  useEffect(() => {
    void metaMask.connectEagerly().catch(() => console.debug("MetaMask: Eagerly Connect Failed"));
  }, []);

  if (isActivating || !isActive) {
    return null;
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => {
          if (connector?.deactivate) {
            void connector.deactivate();
          } else {
            void connector.resetState();
          }
        }}
        sx={{
          color: "border.main",
          borderColor: "border.main",
          border: "1px solid",
          backgroundColor: "transparent",
          borderRadius: 999,
          height: 48,
          minWidth: 150,
        }}
      >
        <Typography color="textPrimary" sx={{ fontSize: 16 }}>
          {ENSName ?? shortenAddress(account)}
        </Typography>
      </Button>
    </>
  );

  // return (
  //   <>
  //     <Button
  //       variant="contained"
  //       sx={{
  //         background: theme.palette.gradient.linear.primary,
  //         borderRadius: 999,
  //         height: 48,
  //         width: 150,
  //       }}
  //       onClick={() => walletStore.setWalletOpen(true)}
  //     >
  //       <Typography sx={{ fontSize: 16, fontWeight: 600, color: "black" }}>Connect</Typography>
  //     </Button>
  //   </>
  // );
};
