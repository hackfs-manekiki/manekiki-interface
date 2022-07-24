import { Box, Typography } from "@mui/material";
import vault from "pages/company/[slug]/manage/vault";
import { ApprovalTable } from "src/components/tables/ApprovalTable";
import { HistoryTable } from "src/components/tables/HistoryTable";
import { useUserVaults } from "src/hooks/vaults/useUserVaults";
import { useVaultsByWalletAddress } from "src/hooks/vaults/useVaultsByWalletAddress";
import {
  DashboardVaultCard,
  DashboardVaultCardSkeleton,
} from "../components/dashboard/DashbordVaultCard";

export const CompanyDashboardPage = () => {
  // const { data: vaults, loading: isVaultLoading, error: isVaultError } = useUserVaults();
  const {
    data: vaults,
    loading: isVaultLoading,
    error: isVaultError,
  } = useVaultsByWalletAddress("0x05DEA85BEca75F220fa830E1E7112D794335E46B");
  console.log(`🚀 ~ vaults`, vaults);

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
            : vaults.map((vault, i) => <DashboardVaultCard key={i} vault={vault} />)}
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
