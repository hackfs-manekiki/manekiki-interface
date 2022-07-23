import { Autocomplete, Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import { createCompanyStore } from "src/stores/createCompanyStore";
import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import type { FC } from "react";
const suggestions = [
  "Suggestion",
  "Salary vault",
  "Marketing vault",
  "Invest vault",
  "Operation vault",
  "Development vault",
];

type Props = {
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
export const CreateCompanyStepTwo: FC<Props> = observer(() => {
  const [isAdding, setIsAdding] = useState(true);

  useEffect(() => {
    setIsAdding(createCompanyStore.vaults.length === 0);
  }, [createCompanyStore.vaults]);

  const handleAddVault = (name: string) => {
    createCompanyStore.addVault(name);
  };

  const inputRef = useRef<HTMLInputElement>();

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography
        sx={{ fontSize: 20, fontWeight: 600, mb: 3 }}
        textTransform="capitalize"
        textAlign="center"
      >
        {`Add Company's Vault`}
      </Typography>
      <Stack spacing={2} mb={2}>
        {createCompanyStore.vaults.map((vault, index) => {
          return (
            <Stack key={vault.name} direction="row" spacing={1}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: 600,
                  height: 60,
                  px: 2,
                  borderRadius: 12,
                  backgroundColor: "#F4F4FF",
                }}
              >
                <Typography sx={{ fontSize: 20 }}>{vault.name}</Typography>
              </Box>
              <IconButton
                size="small"
                sx={{ color: "error.main", ":hover": { backgroundColor: "none" } }}
                disableRipple
                onClick={() => createCompanyStore.removeVault(vault)}
              >
                <FontAwesomeIcon icon={faMinusCircle} />
              </IconButton>
            </Stack>
          );
        })}
      </Stack>
      {!isAdding ? (
        <Button
          variant="outlined"
          sx={{ height: 60, width: 640, borderRadius: 12, background: "rgba(216, 216, 253, 0.1)" }}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          disableRipple
          onClick={() => setIsAdding(true)}
        >
          Add more vault
        </Button>
      ) : (
        <Stack direction="row" spacing={1}>
          <Autocomplete
            freeSolo
            options={suggestions.filter(
              (option) => !createCompanyStore.vaults.some((vault) => vault.name === option),
            )}
            // value={createCompanyStore.vaultName}
            onChange={(e, value) => {
              if (!value) return;
              createCompanyStore.addVault(value);
            }}
            // onInputChange={(e, value) => createCompanyStore.setVaultName(value ?? "")}
            getOptionDisabled={(option) => option === "Suggestion"}
            renderInput={(params) => (
              <GeneralOutlinedInput
                {...params}
                InputProps={{
                  ...params.InputProps,
                  style: { fontSize: 20, lineHeight: 1.4 },
                  inputRef,
                }}
                placeholder="Name Your Vault"
              />
            )}
            componentsProps={{
              paper: {
                sx: {
                  borderRadius: 12,
                  boxShadow: "0px 17px 24px rgba(189, 179, 199, 0.38)",
                },
              },
            }}
          />
          <IconButton
            size="small"
            sx={{ color: "#948DE6", ":hover": { backgroundColor: "none" } }}
            disableRipple
            onClick={() => {
              const vaultName = inputRef.current?.value;
              if (!vaultName) return;
              createCompanyStore.addVault(vaultName);
            }}
          >
            <FontAwesomeIcon icon={faPlusCircle} />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
});
