import { Box, Typography } from "@mui/material";
import { abi } from "src/abis";
import { ApprovalTable } from "src/components/tables/ApprovalTable";
import { HistoryTable } from "src/components/tables/HistoryTable";
import { DashboardVaultCard } from "../components/dashboard/DashbordVaultCard";

export const CompanyDashboardPage = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      sx={{
        backgroundColor: "#F8F8FF",
      }}
    >
      {/* <Sidebar /> */}
      <Box width="100%" padding="0 150px 0 35px">
        <Typography variant="h4">View Assets (3 Vaults)</Typography>
        <Box display="flex" flexWrap="wrap" sx={{ mt: 3 }}>
          <DashboardVaultCard />
          <DashboardVaultCard />
          <DashboardVaultCard />
        </Box>
        <Typography marginTop="74px" variant="h4">
          Pending Approval
        </Typography>
        <ApprovalTable />
        <Box>
          <HistoryTable />
        </Box>
      </Box>
    </Box>
  );
};
