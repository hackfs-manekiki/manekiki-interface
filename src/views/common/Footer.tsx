import { Box } from "@mui/material";

import type { FC } from "react";

type Props = {};

export const Footer: FC<Props> = () => {
  return (
    // magic css: footer stick at bottom
    <Box sx={{ position: "sticky", top: "100vh", height: 208 }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="208px"
        padding="30px 195px"
        sx={{ backgroundColor: "#AEAEFC" }}
      >
      <Box>
        <img src="static/images/icon-2.png" width="97px" height="18px" />
       </Box>
       <Box>
          <img src="static/images/icon-3.png"  />
          <img src="static/images/credit.png" />
       </Box>
      </Box>
    </Box>
  );
};
