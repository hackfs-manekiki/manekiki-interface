import { Box, Button, Stack, Typography } from "@mui/material";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import { createCompanyStore } from "src/stores/createCompanyStore";
import type { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const CreateCompanyStepOne: FC<Props> = ({ onKeyDown }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography
        sx={{ fontSize: 20, fontWeight: 600, mb: 3 }}
        textTransform="capitalize"
        textAlign="center"
      >
        name your company
      </Typography>
      <GeneralOutlinedInput
        autoFocus
        onKeyDown={onKeyDown}
        value={createCompanyStore.companyName}
        onChange={(e) => createCompanyStore.setCompanyName(e.target.value)}
        InputProps={{ style: { fontSize: 20, lineHeight: 1.4 } }}
      />
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
        <PrimaryGradientButton
          disabled={!createCompanyStore.companyName}
          onClick={createCompanyStore.nextStep}
        >
          <Typography variant="button" color="textPrimary">
            Continue
          </Typography>
        </PrimaryGradientButton>
      </Box>
    </Box>
  );
};
