import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import Link from "next/link";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { useUserVaults } from "src/hooks/vaults/useUserVaults";
import { createCompanyStore } from "src/stores/createCompanyStore";
import { VaultAddFundsCard } from "./VaultAddFundsCard";

export const CreateCompanyStepFive = observer(() => {
  const { data: vaults, loading: isVaultsLoading, error: isVaultsError } = useUserVaults();

  return (
    <>
      <Box width="100%">
        <Grid container columnSpacing={3.5} rowSpacing={3.5}>
          {vaults?.length > 0 &&
            vaults.map((vault, index) => {
              return (
                <Grid key={index} item xs={12} sm={4}>
                  <VaultAddFundsCard vault={vault} />
                </Grid>
              );
            })}
        </Grid>
        <Box
          width="100%"
          maxWidth={1000}
          display="flex"
          justifyContent="space-between"
          my={5}
          mx="auto"
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="text"
              startIcon={
                <Box>
                  <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                </Box>
              }
              onClick={createCompanyStore.previousStep}
            >
              <Typography variant="button" color="primary">
                Back
              </Typography>
            </Button>
            <Button variant="text" onClick={createCompanyStore.reset}>
              <Typography variant="button" color="primary">
                Start Over
              </Typography>
            </Button>
          </Stack>
          <Link href={`/company/${createCompanyStore.companySlug}/dashboard`} passHref>
            <PrimaryGradientButton
              disabled={!createCompanyStore.companyName}
              onClick={() => {
                createCompanyStore.reset();
              }}
            >
              <Typography variant="button" color="textPrimary">
                Continue
              </Typography>
            </PrimaryGradientButton>
          </Link>
        </Box>
      </Box>
    </>
  );
});
