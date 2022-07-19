import { useMemo, useState } from "react";
import { Box } from "@mui/material";
import { Footer } from "./Footer";
import { Routes } from "src/constants/routes";
import { useRouter } from "next/router";
import styled from "@emotion/styled";

// * Type Imports
import type { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { useWeb3React } from "@web3-react/core";
import { ConnectWalletPage } from "../connect/pages/ConnectWalletPage";

type Props = {
  children: ReactNode;
};

// * Main can only appear once in html (see: https://www.w3schools.com/tags/tag_main.asp)
const Main = styled("main", {
  shouldForwardProp: (prop: string) => ![""].includes(prop),
})<{}>(() => ({
  flexGrow: 1, // full-width
  display: "flex",
  flexDirection: "column",
  marginTop: 88,
}));

export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const isFooterHidden = useMemo(() => {
    return Routes.FOOTER_HIDDEN.some((route) =>
      route instanceof RegExp ? route.test(router.pathname) : route === router.pathname,
    );
  }, [router.pathname]);

  const { isActive, isActivating } = useWeb3React();

  const isConnected = !isActivating && isActive;

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar sx={{ position: "fixed", top: 0, height: 88 }} />
        <Box flex={1} display="flex" flexDirection="column">
          {/* <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} /> */}
          <Main>
            {isConnected ? children : <ConnectWalletPage />}
            {!isFooterHidden && <Footer />}
          </Main>
        </Box>
      </Box>
    </>
  );
};
