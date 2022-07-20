import { forwardRef } from "react";
import { faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, IconButton, MenuItem, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { GeneralSelect } from "src/components/selects/GeneralSelect";
import { createCompanyStore } from "src/stores/createCompanyStore";
import { shortenAddress } from "src/utils/shortenAddress";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import NumberFormat from "react-number-format";
import type { FC } from "react";
import type { IconButtonProps } from "@mui/material";
import type { InputAttributes } from "react-number-format";

type Props = {};
export const CreateCompanyStepFour: FC<Props> = observer(() => {
  return (
    <Stack spacing={3}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        width="100%"
        px={8}
        py={3}
        sx={{ backgroundColor: "#D7D7FD", borderRadius: 12 }}
      >
        <Typography>
          <Typography component="span" fontSize={20} fontWeight={600}>
            {createCompanyStore.owner.name}
          </Typography>
          <Typography component="span">
            <i>{" - Owner "}</i>
          </Typography>
          <Typography component="span">
            ({shortenAddress(createCompanyStore.owner.address)})
          </Typography>
        </Typography>
        <Typography variant="caption" sx={{ mt: 0.5 }}>
          You can manage everything in this company:vaults, member, and authorization
        </Typography>
      </Box>

      {createCompanyStore.vaults.map((vault, index) => {
        return (
          <Box
            key={index}
            py={4}
            px={8}
            sx={{ backgroundColor: "white", borderRadius: 24, border: "1px solid #BBBBFF" }}
          >
            <Typography variant="h4">{vault.name}</Typography>
            <Stack spacing={5} mt={3}>
              {/* Admins */}
              <Box
                display="grid"
                sx={{
                  gridTemplateColumns: "160px 1fr",
                  columnGap: 3.375,
                }}
              >
                <Box>
                  <Typography fontWeight={600}>Admin</Typography>
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    Can manage this vault with no budget limitation
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  {vault.admins.map((admin, index) => {
                    return (
                      <Stack direction="row" spacing={1} key={index}>
                        <GeneralSelect
                          label="Select member"
                          sx={{ width: 240 }}
                          value={admin.id}
                          onChange={(e) => {
                            const fromId = admin.id;
                            const toId = e.target.value as string;
                            createCompanyStore.changeAdminOfVault(vault, fromId, toId);
                          }}
                        >
                          {createCompanyStore.members.map((member, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={member.id}
                                disabled={vault.admins.some((admin) => admin.id === member.id)}
                              >
                                <Typography>
                                  <Typography component="span" fontSize={16}>
                                    {member.name}
                                  </Typography>{" "}
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    ({member.role})
                                  </Typography>
                                </Typography>
                              </MenuItem>
                            );
                          })}
                        </GeneralSelect>
                        <RemoveIcon
                          onClick={() => createCompanyStore.removeAdminFromVault(vault, admin)}
                        />
                      </Stack>
                    );
                  })}

                  <Button
                    disableRipple
                    variant="text"
                    sx={{
                      mt: 1,
                      width: 120,
                      height: 36,
                      backgroundColor: "transparent !important",
                    }}
                    onClick={() => createCompanyStore.addAdminToVault(vault)}
                    startIcon={
                      <Box>
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </Box>
                    }
                  >
                    <Typography fontWeight={600}>Add more</Typography>
                  </Button>
                </Stack>
              </Box>

              {/* Approvers */}
              <Box
                display="grid"
                sx={{
                  gridTemplateColumns: "160px 1fr",
                  columnGap: 3.5,
                }}
              >
                <Box>
                  <Typography fontWeight={600}>Approver</Typography>
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    Can approve payments up to the Approved budget{" "}
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  {vault.approvers.map((approver, index) => {
                    return (
                      <Stack direction="row" spacing={1} key={index}>
                        <GeneralSelect
                          label="Select member"
                          sx={{ width: 240 }}
                          value={approver.id}
                          onChange={(e) => {
                            const fromId = approver.id;
                            const toId = e.target.value as string;
                            createCompanyStore.changeApproverOfVault(vault, fromId, toId);
                          }}
                        >
                          {createCompanyStore.members.map((member, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={member.id}
                                disabled={
                                  vault.approvers.some((approver) => approver.id === member.id) ||
                                  vault.admins.some((admin) => admin.id === member.id)
                                }
                              >
                                <Typography>
                                  <Typography component="span" fontSize={16}>
                                    {member.name}
                                  </Typography>{" "}
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    ({member.role})
                                  </Typography>
                                </Typography>
                              </MenuItem>
                            );
                          })}
                        </GeneralSelect>
                        <GeneralOutlinedInput
                          type="text"
                          sx={{ width: 240 }}
                          InputProps={{
                            endAdornment: <Typography sx={{ ml: 1 }}>USD</Typography>,
                            inputComponent: NumberFormatCustom as any,
                          }}
                          onKeyDown={(e) => {
                            if (["ArrowDown", "ArrowUp"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}
                          onWheel={(e) => (e.target as HTMLInputElement).blur()}
                          inputProps={{ style: { textAlign: "right" } }}
                          value={`${approver.budgetUsd}`}
                          onChange={(e) =>
                            createCompanyStore.setVaultApproverBudget(
                              vault,
                              approver.id,
                              +e.target.value,
                            )
                          }
                        />
                        <RemoveIcon
                          onClick={() =>
                            createCompanyStore.removeApproverFromVault(vault, approver)
                          }
                        />
                      </Stack>
                    );
                  })}

                  <Button
                    disableRipple
                    variant="text"
                    sx={{
                      mt: 1,
                      width: 120,
                      height: 36,
                      backgroundColor: "transparent !important",
                    }}
                    onClick={() => createCompanyStore.addApproverToVault(vault)}
                    startIcon={
                      <Box>
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </Box>
                    }
                  >
                    <Typography fontWeight={600}>Add more</Typography>
                  </Button>
                </Stack>
              </Box>

              {/* Employees */}
              <Box
                display="grid"
                sx={{
                  gridTemplateColumns: "160px 1fr",
                  columnGap: 3.375,
                }}
              >
                <Box>
                  <Typography fontWeight={600}>Employee</Typography>
                  <Typography variant="caption" sx={{ mt: 0.5 }}>
                    Can only request payment{" "}
                  </Typography>
                </Box>
                <Stack spacing={2}>
                  {vault.employees.map((employee, index) => {
                    return (
                      <Stack direction="row" spacing={1} key={index}>
                        <GeneralSelect
                          label="Select member"
                          sx={{ width: 240 }}
                          value={employee.id}
                          onChange={(e) => {
                            const fromId = employee.id;
                            const toId = e.target.value as string;
                            createCompanyStore.changeEmployeeOfVault(vault, fromId, toId);
                          }}
                        >
                          {createCompanyStore.members.map((member, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={member.id}
                                disabled={
                                  vault.admins.some((admin) => admin.id === member.id) ||
                                  vault.approvers.some((employee) => employee.id === member.id) ||
                                  vault.employees.some((employee) => employee.id === member.id)
                                }
                              >
                                <Typography>
                                  <Typography component="span" fontSize={16}>
                                    {member.name}
                                  </Typography>{" "}
                                  <Typography
                                    component="span"
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    ({member.role})
                                  </Typography>
                                </Typography>
                              </MenuItem>
                            );
                          })}
                        </GeneralSelect>
                        <RemoveIcon
                          onClick={() =>
                            createCompanyStore.removeEmployeeFromVault(vault, employee)
                          }
                        />
                      </Stack>
                    );
                  })}

                  <Button
                    disableRipple
                    variant="text"
                    sx={{
                      mt: 1,
                      width: 120,
                      height: 36,
                      backgroundColor: "transparent !important",
                    }}
                    onClick={() => createCompanyStore.addEmployeeToVault(vault)}
                    startIcon={
                      <Box>
                        <FontAwesomeIcon icon={faPlus} size="sm" />
                      </Box>
                    }
                  >
                    <Typography fontWeight={600}>Add more</Typography>
                  </Button>
                </Stack>
              </Box>
            </Stack>
          </Box>
        );
      })}
    </Stack>
  );
});

const RemoveIcon: FC<IconButtonProps> = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      size="small"
      sx={{ color: "error.main", backgroundColor: "transparent !important" }}
      disableRipple
    >
      <FontAwesomeIcon icon={faMinusCircle} />
    </IconButton>
  );
};

const NumberFormatCustom = forwardRef<
  NumberFormat<InputAttributes>,
  { onChange: (event: { target: { value: string } }) => void }
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({ target: { value: values.value } });
      }}
      thousandSeparator
      isNumericString
    />
  );
});
