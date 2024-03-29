import styled from "@emotion/styled";
import {
  Alert,
  Box,
  Button,
  Dialog,
  Snackbar,
  Stack,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { ManekikiLogo } from "src/svgs";

import type { BoxProps } from "@mui/material";

import { useState } from "react";
import { ConnectWalletButton } from "src/components/ConnectWalletButton";
import { WalletSelectDialog } from "../wallet/WalletSelectDialog";
import { walletStore } from "src/stores/walletStore";
import { observer } from "mobx-react-lite";
import { useRouter } from "next/router";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { MockTokenABI } from "src/abis";
import { MetaMask } from "@web3-react/metamask";

import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled(Box, {
  shouldForwardProp: (props: string) => props !== "isScrollTriggered" && props !== "bgColor",
})<{ isScrollTriggered: boolean; bgColor: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: none;
  background-color: ${({ isScrollTriggered, bgColor }) =>
    isScrollTriggered ? bgColor : "transparent"};
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  transition: background-color 200ms;
`;

type Props = {
  sx?: BoxProps["sx"];
};

export const Navbar: FC<Props> = observer((props) => {
  const theme = useTheme();
  const router = useRouter();
  const slug = router.query.slug as string;
  const isScrollTriggered = useScrollTrigger({ disableHysteresis: true, threshold: 30 });

  const { account, chainId, provider, connector } = useWeb3React();

  const navbarBgColor = ["/create-company", "/select-company"].includes(router.pathname)
    ? "#FEFFF8"
    : "#F8F8FF";

  const [addTokenModalOpen, setAddTokenModalOpen] = useState(false);
  const [mintStatus, setMintStatus] = useState<number>();
  const [isMintingKiUsd, setIsMintingKiUsd] = useState(false);

  const handleMintKiUsd = async () => {
    if (!provider || chainId !== 80001) return;
    const signer = provider.getSigner();
    const kiUsdContract = new ethers.Contract(
      "0xf95f381faB58F70c435eC873b33DF1f7aE6BFE14",
      MockTokenABI,
      signer,
    );
    setIsMintingKiUsd(true);
    try {
      const { hash } = await kiUsdContract.mint(account, ethers.utils.parseUnits("10000", 6));
      const receipt = await provider.waitForTransaction(hash);
      setMintStatus(receipt.status);
    } catch {
      // pass
    }
    setIsMintingKiUsd(false);
    setAddTokenModalOpen(true);
  };

  const handleAddKiUsd = async () => {
    if (chainId !== 80001) return;
    setAddTokenModalOpen(false);
    await connector.provider?.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address: "0xf95f381faB58F70c435eC873b33DF1f7aE6BFE14",
          symbol: "KiUSD",
          decimals: 6,
        },
      },
    });
  };

  return (
    <>
      <WalletSelectDialog open={walletStore.isWalletOpen} />
      <Wrapper sx={{ ...props.sx }} isScrollTriggered={isScrollTriggered} bgColor={navbarBgColor}>
        <Box
          sx={{
            px: 5.25,
            width: "100%",
            display: "grid",
            gridTemplateColumns: "calc(160px - 0.5rem) 1fr",
            columnGap: "1rem",
            alignItems: "center",
            [theme.breakpoints.down("md")]: {
              display: "flex",
              justifyContent: "space-between",
            },
          }}
        >
          <Link href={slug ? `/company/${slug}/dashboard` : "select-company"} passHref>
            <Box component="a" color={theme.palette.mode === "light" ? "black" : "white"} px={1.5}>
              <ManekikiLogo height={28} width={null} style={{ verticalAlign: "middle" }} />
            </Box>
          </Link>
          <Box display="flex" justifyContent="flex-end" alignItems="center" pr={1} width="100%">
            <Stack direction="row" spacing={3} alignItems="center">
              {chainId === 80001 && (
                <>
                  <PrimaryGradientButton
                    onClick={handleMintKiUsd}
                    disabled={isMintingKiUsd}
                    startIcon={
                      isMintingKiUsd && (
                        <Box>
                          <FontAwesomeIcon icon={faSpinner} spin />
                        </Box>
                      )
                    }
                  >
                    <Typography color="textPrimary">
                      {isMintingKiUsd ? "Minting..." : "Mint kiUSD"}
                    </Typography>
                  </PrimaryGradientButton>
                  <Snackbar
                    open={mintStatus !== undefined}
                    autoHideDuration={500}
                    onClose={() => setMintStatus(undefined)}
                  >
                    {mintStatus === 1 ? (
                      <Alert severity="success">Minted 10,000 KiUSD</Alert>
                    ) : (
                      <Alert severity="error">Mint failed</Alert>
                    )}
                  </Snackbar>
                  {connector && connector instanceof MetaMask && (
                    <Dialog
                      open={addTokenModalOpen}
                      onClose={() => setAddTokenModalOpen(false)}
                      sx={{
                        ".MuiDialog-paper": {
                          backgroundColor: "white",
                          borderRadius: 12,
                          width: 400,
                        },
                      }}
                    >
                      <Stack spacing={2} px={4} py={4} alignItems="center">
                        <Typography variant="h6" color="textPrimary">
                          Add KiUSD to MetaMask?
                        </Typography>
                        <Button
                          onClick={handleAddKiUsd}
                          variant="outlined"
                          sx={{ width: 120, borderRadius: 999 }}
                        >
                          Add
                        </Button>
                      </Stack>
                    </Dialog>
                  )}
                </>
              )}
              <ConnectWalletButton />
            </Stack>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
});
