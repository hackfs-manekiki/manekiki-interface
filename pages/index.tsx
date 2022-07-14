import { Box, Typography } from "@mui/material";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Box
      minHeight="50vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        border: "2px dashed",
      }}
    >
      <Typography variant="h1">Main</Typography>
    </Box>
  );
};

export default Home;
