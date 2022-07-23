import { forwardRef, useState } from "react";
import { faChevronLeft, faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Dialog, IconButton, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { GeneralSelect } from "src/components/selects/GeneralSelect";
import { createCompanyStore } from "src/stores/createCompanyStore";
import { shortenAddress } from "src/utils/shortenAddress";
import { GeneralOutlinedInput } from "src/components/inputs/GeneralOutlinedInput";
import NumberFormat from "react-number-format";
import type { FC } from "react";
import type { IconButtonProps } from "@mui/material";
import type { InputAttributes } from "react-number-format";
import { useWeb3React } from "@web3-react/core";
import { FactoryABI } from "src/abis";
import { BigNumber, ethers } from "ethers";
import type { TransactionReceipt } from "@ethersproject/providers";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import type { NextPage } from "next";

export const CompanyManageVaultPage: NextPage = () => {
  const { account } = useWeb3React();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Dialog
        open={isDialogOpen}
        sx={{
          ".MuiDialog-paper": {
            width: 500,
            borderRadius: 12,
            boxShadow: "0px 14px 34px #676478",
          },
        }}
        onClose={() => setIsDialogOpen(false)}
      >
        <Box display="flex" flexDirection="column" alignItems="center" py={5}>
          <Typography sx={{ fontSize: 28, lineHeight: 1.25, fontWeight: 700, mb: 2.25 }}>
            Confirm to save changes
          </Typography>
          <Typography variant="body2">Confirm to save changes</Typography>
          <Stack direction="row" spacing={3} mt={5} height={36}>
            <Button
              variant="outlined"
              onClick={() => setIsDialogOpen(false)}
              sx={{ width: 120, borderRadius: 18, border: "1px solid #BBBBFF" }}
            >
              <Typography>
                <b>Cancel</b>
              </Typography>
            </Button>
            <PrimaryGradientButton sx={{ height: 36 }}>
              <Typography color="textPrimary">
                <b>Confirm</b>
              </Typography>
            </PrimaryGradientButton>
          </Stack>
        </Box>
      </Dialog>
      <Stack spacing={3} alignItems="center" px={12}>
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
            <Typography component="span">({shortenAddress(account)})</Typography>
          </Typography>
          <Typography variant="caption" sx={{ mt: 0.5 }}>
            You can manage everything in this company: vaults, members, and authorizations
          </Typography>
        </Box>

        {createCompanyStore.vaults.map((vault, index) => {
          return (
            <Box
              key={index}
              width="100%"
              py={4}
              px={8}
              sx={{ backgroundColor: "transparent", borderRadius: 24, border: "1px solid #BBBBFF" }}
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
        <Box width="100%" maxWidth={1000} display="flex" justifyContent="space-between" pb={5}>
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
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <Typography variant="button" color="textPrimary">
              Save
            </Typography>
          </PrimaryGradientButton>
        </Box>
      </Stack>
    </>
  );
};

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
