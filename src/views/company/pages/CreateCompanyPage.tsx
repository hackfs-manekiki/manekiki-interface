import styled from "@emotion/styled";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Step, StepConnector, StepLabel, Stepper, Typography } from "@mui/material";
import { Observer, observer } from "mobx-react-lite";
import type { NextPage } from "next";
import { useMemo } from "react";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { createCompanyStore } from "src/stores/createCompanyStore";
import { CreateCompanyStepFive } from "../components/create-company/CreateCompanyStepFive";
import { CreateCompanyStepFour } from "../components/create-company/CreateCompanyStepFour";
import { CreateCompanyStepOne } from "../components/create-company/CreateCompanyStepOne";
import { CreateCompanyStepThree } from "../components/create-company/CreateCompanyStepThree";
import { CreateCompanyStepTwo } from "../components/create-company/CreateCompanyStepTwo";

const steps = [
  {
    label: "Name Your Company",
  },
  {
    label: "Create Vault",
  },
  {
    label: "Add Members",
  },
  {
    label: "Set Authorizations",
  },
  {
    label: "Add Funds",
  },
];

const StyledStepConnector = styled(StepConnector)(({ theme }) => ({
  top: "unset",
  bottom: 9,
  "& .MuiStepConnector-line": {
    borderTopWidth: 3,
    borderTopColor: theme.palette.common.blue,
  },
  "&.Mui-completed, &.Mui-active": {
    "& .MuiStepConnector-line": {
      borderTopWidth: 3,
      borderTopColor: theme.palette.common.red,
    },
  },
}));

const StyledStepIcon = styled("div")<{
  completed?: boolean;
  active?: boolean;
}>(({ theme, active, completed }) => ({
  backgroundColor: theme.palette.common.blue,
  zIndex: 1,
  color: "transparent",
  width: 20,
  height: 20,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(active && {
    backgroundColor: "transparent",
    boxShadow: `inset 0 0 0 3px ${theme.palette.common.red}, inset 0 0 0 17px #FFF`,
  }),
  ...(completed && {
    backgroundColor: theme.palette.common.red,
  }),
}));

export const CreateCompanyPage: NextPage = observer(() => {
  const { activeStep } = createCompanyStore;

  const continueButtonDisabled = useMemo(() => {
    switch (createCompanyStore.activeStep) {
      case 0:
        return !createCompanyStore.companyName;
      case 1:
        return createCompanyStore.vaults.length === 0;
      default:
        return false;
    }
    // ? eslint + mobx = wrong suggestions
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createCompanyStore.activeStep, createCompanyStore.companyName, createCompanyStore.vaults]);

  const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter" || continueButtonDisabled) return;
    createCompanyStore.nextStep();
    e.stopPropagation();
  };

  return (
    <Observer>
      {() => (
        <Box
          display="flex"
          flexDirection="column"
          flex={1}
          justifyContent="flex-start"
          alignItems="center"
          mt={7.75}
          pb={4}
          sx={{ backgroundColor: "background.onboard" }}
        >
          <Typography sx={{ fontWeight: 700, fontSize: 28 }} textTransform="uppercase">
            create company asset in 5 steps
          </Typography>
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<StyledStepConnector />}
            sx={{ width: "100%", maxWidth: 1100, mt: 6 }}
          >
            {steps.map((step, index) => {
              return (
                <Step key={step.label}>
                  <StepLabel
                    sx={{
                      "&.MuiStepLabel-alternativeLabel": {
                        flexDirection: "column-reverse",
                        "& .MuiStepLabel-label": {
                          mt: 0,
                          mb: 2,
                          color: "common.blue",
                          "&.Mui-active, &.Mui-completed": {
                            color: "common.red",
                          },
                        },
                      },
                    }}
                    StepIconComponent={StyledStepIcon}
                  >
                    <Typography variant="h5" color="inherit" whiteSpace="normal">
                      {index + 1}. {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Box mt={6} minHeight={350} width="100%" maxWidth={1200}>
            {activeStep === 0 && <CreateCompanyStepOne onKeyDown={handleEnterKeyPress} />}
            {activeStep === 1 && <CreateCompanyStepTwo />}
            {activeStep === 2 && <CreateCompanyStepThree />}
            {activeStep === 3 && <CreateCompanyStepFour />}
            {activeStep === 4 && <CreateCompanyStepFive />}
          </Box>

          {/* <Box width="100%" maxWidth={1000} display="flex" justifyContent="space-between" my={5}>
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
            <PrimaryGradientButton
              disabled={continueButtonDisabled}
              onClick={createCompanyStore.nextStep}
            >
              <Typography variant="button" color="textPrimary">
                Continue
              </Typography>
            </PrimaryGradientButton>
          </Box> */}
        </Box>
      )}
    </Observer>
  );
});
