import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";

export const DashBoardPage: NextPage = () => {
  const router = useRouter();

  const slug = router.query.slug as string;

  return (
    <Box>
      <Typography variant="h1">DashBoardPage: {slug} </Typography>
    </Box>
  );
};
