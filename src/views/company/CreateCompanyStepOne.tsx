import { Box, Typography } from "@mui/material";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import { createCompanyStore } from "src/stores/createCompanyStore";
import type { FC } from "react";

type Props = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const CreateCompanyStepOne: FC<Props> = ({ onKeyDown }) => {
  console.log(createCompanyStore.companyName);
  return (
    <Box>
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
    </Box>
  );
};
