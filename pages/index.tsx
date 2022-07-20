import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { Sidebar } from "src/components/Sidebar";
import { Switch, useTheme } from "@mui/material";
import { BaseTable } from "src/components/tables/BaseTable";
import { ApprovalTable } from "src/components/tables/ApprovalTable";
import { HistoryTable } from "src/components/tables/HistoryTable";

const Home: NextPage = () => {
  const theme = useTheme()
  return (
    <Box
      minHeight="100vh"
      display="flex"
      sx={{
        backgroundColor: '#F8F8FF'
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
        <Typography marginTop="74px" variant="h4">
          Pending Approval
        </Typography>
        <ApprovalTable />
        <Box>
          <HistoryTable />
        </Box>
      </Box>
      {/* <WalletSelectDialog open={true} /> */}
      {/* <MetaMaskCard /> */}
    </Box>
  );
};

export default Home;
