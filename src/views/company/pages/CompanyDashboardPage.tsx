import { Box, Typography } from "@mui/material";
import { ApprovalTable } from "src/components/tables/ApprovalTable";
import { HistoryTable } from "src/components/tables/HistoryTable";
import { useUserVaults } from "src/hooks/vaults/useUserVaults";
import {
  DashboardVaultCard,
  DashboardVaultCardSkeleton,
} from "../components/dashboard/DashbordVaultCard";

export const CompanyDashboardPage = () => {
  // const { data: vaults, loading: isVaultLoading, error: isVaultError } = useUserVaults();
  const { data: vaults, loading: isVaultLoading, error: isVaultError } = useUserVaults();

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
        <Typography variant="h4">View Assets ({vaults?.length ?? "-"} Vaults)</Typography>
        <Box display="flex" flexWrap="wrap" sx={{ mt: 3 }}>
          {isVaultLoading
            ? Array.from({ length: 3 }).map((_, i) => <DashboardVaultCardSkeleton key={i} />)
            : vaults
                .sort((va, vb) => (va.name + va.address).localeCompare(vb.name + vb.address))
                .map((vault, i) => <DashboardVaultCard key={i} vault={vault} />)}
          {/* <DashboardVaultCard />
          <DashboardVaultCard />
          <DashboardVaultCardSkeleton /> */}
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
