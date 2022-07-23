import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { createCompanyStore } from "src/stores/createCompanyStore";
import { VaultAddFundsCard } from "./VaultAddFundsCard";

export const CreateCompanyStepFive = observer(() => {
  return (
    <Box width="100%">
      <Grid container columnSpacing={3.5} rowSpacing={3.5}>
        {createCompanyStore.vaults.map((vault, index) => {
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
        <PrimaryGradientButton>
          <Typography variant="button" color="textPrimary">
            Continue
          </Typography>
        </PrimaryGradientButton>
      </Box>
    </Box>
  );
});
