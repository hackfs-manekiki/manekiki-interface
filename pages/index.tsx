import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { Sidebar } from "src/components/Sidebar";
import { Switch, useTheme } from "@mui/material";

const Home: NextPage = () => {
  const theme = useTheme()
  return (
    <Box
      minHeight="100vh"
      display="flex"
      sx={{
        backgroundColor: theme.palette.background.content
      }}
    >
      <Sidebar />
      <Box
        width="100%"
        margin="71px 0 0 216px"
        padding="0 150px 0 35px"
      >
        <Typography variant="h4">
          View Assets (3 Vaults)
        </Typography>
      </Box>
      {/* <WalletSelectDialog open={true} /> */}
      {/* <MetaMaskCard /> */}
    </Box>
  );
};

export default Home;
