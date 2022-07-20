import styled from "@emotion/styled";
import { Box, Stack, Typography, useScrollTrigger, useTheme } from "@mui/material";
import Link from "next/link";
import { ThemeToggleSwitch } from "src/components/ThemeToggleSwitch";
import { ManekikiLogo, NextJSIcon } from "src/svgs";

import type { BoxProps } from "@mui/material";

import type { FC } from "react";
import { ConnectWithSelect } from "src/components/ConnectWithSelect";
import { ConnectWalletButton } from "src/components/ConnectWalletButton";
import { WalletSelectDialog } from "../wallet/WalletSelectDialog";
import { walletStore } from "src/stores/walletStore";
import { observer } from "mobx-react-lite";
import { SwitchChainButton } from "src/components/SwitchChainButton";
import { useRouter } from "next/router";

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
  const isScrollTriggered = useScrollTrigger({ disableHysteresis: true, threshold: 30 });
  const navbarBgColor = router.pathname.startsWith("/company") ? "#FEFFF8" : "#F5F5F5";

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
          <Link href="/" passHref>
            <Box component="a" color={theme.palette.mode === "light" ? "black" : "white"} px={1.5}>
              <ManekikiLogo height={28} width={null} style={{ verticalAlign: "middle" }} />
            </Box>
          </Link>
          <Box display="flex" justifyContent="flex-end" alignItems="center" pr={1} width="100%">
            <Stack direction="row" spacing={3} alignItems="center">
              <ConnectWalletButton />
            </Stack>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
});
