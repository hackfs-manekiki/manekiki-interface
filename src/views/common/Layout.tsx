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

type Props = {
  children: ReactNode;
};

// * Main can only appear once in html (see: https://www.w3schools.com/tags/tag_main.asp)
const Main = styled("main", {
  shouldForwardProp: (prop: string) => ![""].includes(prop),
})<{}>(() => ({
  flexGrow: 1, // full-width
}));

export const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isFooterHidden = useMemo(() => {
    return Routes.FOOTER_HIDDEN.some((route) =>
      route instanceof RegExp ? route.test(router.pathname) : route === router.pathname,
    );
  }, [router.pathname]);

  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navbar sx={{ position: "sticky", top: 0, height: "60px", border: "2px dashed" }} />
        <Box flex={1} display="flex" flexDirection="column">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(!sidebarOpen)} />
          <Main>
            {children}
            {!isFooterHidden && <Footer />}
          </Main>
        </Box>
      </Box>
    </>
  );
};
