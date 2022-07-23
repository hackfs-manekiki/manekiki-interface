import { Box } from "@mui/material";
import { HistoryTable } from "src/components/tables/HistoryTable";

export const CompanyHistoryPage = () => {
  return (
    <Box px={4}>
      <HistoryTable pageSize={25} />
    </Box>
  );
};
