import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { observer } from "mobx-react-lite";
import type { FC } from "react";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import { shortenAddress } from "src/utils/shortenAddress";

type Props = {};
export const CreateCompanyStepThree: FC<Props> = observer(() => {
  const { account, ENSName } = useWeb3React();
  return (
    <Grid container>
      <Grid item xs={4}>
        <Paper
          elevation={0}
          sx={{ width: 250, height: 315, borderRadius: 12, backgroundColor: "#D7D7FD" }}
        >
          <Stack spacing={2} p={3}>
            <Typography variant="h5">Owner</Typography>
            <Stack spacing={0.5}>
              <Typography sx={{ fontWeight: 600 }}>Your name</Typography>
              <GeneralOutlinedInput
                sx={{ width: "100%", "& > .MuiOutlinedInput-root > input": { py: 1.25 } }}
                placeholder="Input your name"
              />
            </Stack>
            <Stack spacing={0.5}>
              <Typography sx={{ fontWeight: 600 }}>Public Key</Typography>
              <Box
                px={2}
                display="flex"
                alignItems="center"
                sx={{ background: "rgba(241, 241, 255, 0.2)", height: 40, borderRadius: 12 }}
              >
                <Typography>{shortenAddress(account)}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
});
