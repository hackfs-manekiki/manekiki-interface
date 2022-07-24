import { forwardRef } from "react";
import { faChevronLeft, faMinusCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
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
import { useWeb3React } from "@web3-react/core";
import { FactoryABI } from "src/abis";
import { BigNumber, ethers } from "ethers";
import type { TransactionReceipt } from "@ethersproject/providers";
import { PrimaryGradientButton } from "src/components/buttons/PrimaryGradientButton";
import { useConstant } from "src/hooks/useConstant";

type Props = {};
export const CreateCompanyStepFour: FC<Props> = observer(() => {
  const { account, connector, provider } = useWeb3React();

  const { contractAddress } = useConstant();

  const handleCreateVaults = async () => {
    if (!provider) return;
    const vaultFactory = new ethers.Contract(
      contractAddress.factory,
      FactoryABI,
      provider.getSigner(),
    );

    const params = createCompanyStore.vaults.map((vault) => {
      return {
        name: vault.name,
        admins: vault.admins.map((admin) => ({
          name: admin.name,
          member: admin.address,
        })),
        approvers: vault.approvers.map((approver) => ({
          name: approver.name,
          approver: approver.address,
          budget: BigNumber.from(approver.budgetUsd).mul(1e6),
        })),
        members: vault.employees.map((employee) => ({
          name: employee.name,
          member: employee.address,
          // budget: BigNumber.from(member.budgetUsd).mul(1e6),
        })),
      };
    });

    const response = await vaultFactory.batchCreateVault(params);

    const txReceipt: TransactionReceipt = await provider.waitForTransaction(response.hash);

    // const logs = txReceipt.logs.filter((log) => log.topics[0] === topic);

    // const factoryInterface = new ethers.utils.Interface(FactoryABI);
    // const _results = logs.map((log) =>
    //   factoryInterface.decodeEventLog("VaultSetup", log.data, log.topics),
    // );

    createCompanyStore.nextStep();
  };

  return (
    <>
      <Stack spacing={3} alignItems="center">
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
            // disabled={continueButtonDisabled}
            onClick={handleCreateVaults}
          >
            <Typography variant="button" color="textPrimary">
              Continue
            </Typography>
          </PrimaryGradientButton>
        </Box>
      </Stack>
    </>
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
