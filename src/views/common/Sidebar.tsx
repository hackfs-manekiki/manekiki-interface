import { Box, Drawer, Typography } from "@mui/material";
import { useResponsive } from "src/hooks/useResponsive";

import type { DrawerProps } from "@mui/material";
import type { FC } from "react";

type Props = {} & DrawerProps;

export const Sidebar: FC<Props> = (props) => {
  const { ...drawerProps } = props;
  const { isMobile } = useResponsive({ noSsr: true });
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        width: 240,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          border: "none",
        },
      }}
      ModalProps={{ keepMounted: true }}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
      {...drawerProps}
    >
      <Box
        mt="60px"
        height="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ border: "2px dashed" }}
      >
        <Typography variant="h1">Sidebar</Typography>
      </Box>
    </Drawer>
  );
};
