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
})<{ isSidebarHidden: boolean }>(({ isSidebarHidden }) => ({
  flexGrow: 1, // full-width
  display: "flex",
  flexDirection: "column",
  marginTop: 127,
  marginLeft: isSidebarHidden ? 0 : 216,
}));

export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isSidebarHidden = useMemo(() => {
    return Routes.SIDEBAR_HIDDEN.some((route) =>
      route instanceof RegExp ? route.test(router.pathname) : route === router.pathname,
    );
  }, [router.pathname]);

  const isFooterHidden = useMemo(() => {
    return Routes.FOOTER_HIDDEN.some((route) =>
      route instanceof RegExp ? route.test(router.pathname) : route === router.pathname,
    );
  }, [router.pathname]);

  const { isActive, isActivating } = useWeb3React();

  const isConnected = !isActivating && isActive;

  const backgroundColor = ["/create-company", "/select-company"].includes(router.pathname)
    ? "#FEFFF8"
    : "#F8F8FF";

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh" sx={{ backgroundColor }}>
        <Navbar sx={{ position: "fixed", top: 0, height: 88 }} />
        <Box flex={1} display="flex" flexDirection="column">
          {!isSidebarHidden && (
            <Sidebar />
            // <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
          )}
          <Main isSidebarHidden={isSidebarHidden}>
            {isConnected ? children : <ConnectWalletPage />}
          </Main>
          {!isFooterHidden && <Footer />}
        </Box>
      </Box>
    </>
  );
};
