import { Box, Stack, Typography } from "@mui/material";

import type { FC } from "react";
import { useMuiTheme } from "src/hooks/themes";
import { ManekikiIcon, ManekikiText } from "src/svgs";

type Props = {};

export const Footer: FC<Props> = () => {
  const theme = useMuiTheme();

  return (
    // magic css: footer stick at bottom
    <Box sx={{ position: "sticky", top: "100vh", height: 208, zIndex: theme.zIndex.drawer + 1 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="208px"
        padding="30px 195px"
        sx={{ backgroundColor: "#AEAEFC" }}
      >
        <Box>
          <ManekikiText />
        </Box>
        <Stack direction="row" spacing={0.5} alignItems="flex-end">
          <ManekikiIcon />
          <Typography sx={{ color: "#7B7BEA", fontSize: 12, lineHeight: 1.25 }}>
            <b>© 2022 Manekiki. All rights reserved</b>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
