import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Dialog, InputLabel, Stack, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { SecondaryButton } from "../buttons/SecondaryButton";
import numeral from "numeral";
import dayjs from "dayjs";
import { usePendingUserHistories } from "src/hooks/history/usePendingUserHistories";
import { PrimaryGradientButton } from "../buttons/PrimaryGradientButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useWeb3React } from "@web3-react/core";
import { useUserVaults } from "src/hooks/vaults/useUserVaults";
import { ethers } from "ethers";
import { VaultABI } from "src/abis";
import { shortenAddress } from "src/utils/shortenAddress";
import type { RequestHistory } from "src/interfaces/request";

const mockArray = () => {
  const arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(mockData);
  }
  return arr;
};

const mockData: Approvals = {
  detail: "Pinata - August",
  price: 300,
  priceDenom: "USDC",
  requester: "Apemon",
  dateTime: "16/7/2022, 11:11:12",
  status: "pending",
};

type TableProps = {
  data: Approvals[];
  onViewDetail: any;
};

type Approvals = {
  detail: string;
  price: number;
  priceDenom: string;
  requester: string;
  dateTime: string;
  status: string;
};

const headers = ["Detail", "Price", "Requester", "Date/Time", "Status"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "0",
  backgroundColor: "white",
}));

export const ApprovalTable = () => {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [dialogData, setDialogData] = useState<RequestHistory>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  const { data: vaults, loading: isVaultsLoading } = useUserVaults();
  const { provider, account } = useWeb3React();

  const canApprove = useMemo(() => {
    if (!provider || !account || !dialogData) {
      return false;
    }
    const vault = vaults.find((vault) => vault.address === dialogData.vaultAddress);
    if (!vault) {
      return false;
    }
    return (
      vault.admins.some((admin) => admin.address === account.toLowerCase()) ||
      vault.approvers.some((approver) => {
        return (
          approver.address === account.toLowerCase() &&
          +ethers.utils.formatUnits(approver.budget, 6) > +dialogData.amount
        );
      })
    );
  }, [vaults, account, dialogData, provider]);

  const handleApprove = async () => {
    if (!provider || !dialogData) return;
    const signer = provider.getSigner();
    const vaultContract = new ethers.Contract(dialogData.vaultAddress, VaultABI, signer);
    const requestId = dialogData.requestId;
    setIsApproving(true);
    const { hash } = await vaultContract.approveRequest(requestId);
    const receipt = await provider.waitForTransaction(hash);
    handleCloseDialog();
    setIsApproving(false);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setDialogData(undefined);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const getHeaderAlignment = (header: typeof headers[number]) => {
    switch (header) {
      case "Price":
        return "right";
      case "Status":
        return "center";
      default:
        return "left";
    }
  };

  const { data: histories, loading: isHistoriesLoading } = usePendingUserHistories();
  const totalPage = useMemo(() => {
    if (!histories) return 1;
    return Math.ceil(histories.length / pageSize);
  }, [histories, pageSize]);

  return (
    <>
      <TableContainer sx={{ boxShadow: "none", backgroundColor: "transparent" }} component={Paper}>
        <Table
          sx={{
            minWidth: 650,
            borderSpacing: "0 1rem",
            borderCollapse: "unset",
            boxShadow: "none",
          }}
        >
          <TableHead
            sx={{
              boxShadow: "none",
            }}
          >
            <TableRow>
              {headers.map((header, index) => {
                return (
                  <TableCell
                    sx={{
                      border: "0px",
                    }}
                    key={index}
                    align={getHeaderAlignment(header)}
                  >
                    <Typography fontWeight="700">{header}</Typography>
                  </TableCell>
                );
              })}
              <TableCell sx={{ border: "none" }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {histories
              .slice(page - 1 * pageSize, page * pageSize + pageSize)
              .map((history, index) => (
                <TableRow
                  key={index}
                  sx={{
                    borderRadius: 6,
                  }}
                >
                  <StyledTableCell
                    sx={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                    }}
                    component="th"
                    scope="row"
                  >
                    {history.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Typography variant="body2" sx={{ color: "#40A331" }}>
                      {`${numeral(history.amount).format("0,0.[000]")} ${history.denom}`}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {history.requesterName ?? shortenAddress(history.requesterAddress, 7)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {dayjs(history.requestTimestamp).format("DD/MM/YYYY, HH:mm:ss")}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                    align="center"
                  >
                    <Typography variant="body2" textTransform="capitalize">
                      {history.status?.toLowerCase()}
                    </Typography>
                  </StyledTableCell>
                  <TableCell sx={{ py: 0, border: "none", background: "transparent" }}>
                    <SecondaryButton
                      sx={{
                        width: 120,
                        height: 36,
                        px: 0,
                        my: "auto",
                      }}
                      onClick={() => {
                        setDialogData(history);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Typography variant="body2" color="textPrimary">
                        <b>View Details</b>
                      </Typography>
                    </SecondaryButton>
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell colSpan={5} sx={{ p: 0, border: "none" }}>
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChangePage}
                  sx={{
                    width: "fit-content",
                    ml: "auto",
                    fontSize: "12px",
                    "& .MuiPaginationItem-previousNext": {
                      background: "#D8D8FD",
                      color: "#8383FF",
                    },
                    "& .MuiPaginationItem-root": {
                      fontWeight: "700",
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#EF7D70 !important",
                      color: "white",
                    },
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        {/* <Box mr={22} mt={1} display="flex" justifyContent="flex-end">
        <Pagination
          count={totalPage}
          page={page}
          onChange={handleChangePage}
          sx={{
            fontSize: "12px",
            "& .MuiPaginationItem-previousNext": {
              background: "#D8D8FD",
              color: "#8383FF",
            },
            "& .MuiPaginationItem-root": {
              fontWeight: "700",
            },
            "& .Mui-selected": {
              backgroundColor: "#EF7D70 !important",
              color: "white",
            },
          }}
        />
      </Box> */}
      </TableContainer>
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        sx={{ ".MuiDialog-paper": { backgroundColor: "#F8F8FF", width: 600, borderRadius: 12 } }}
      >
        {dialogData && (
          <Box px={6.5} py={5}>
            <Typography variant="h3">Payment Details</Typography>
            <Stack spacing={3} mt={4}>
              <Box>
                <InputLabel sx={{ mb: 1 }}>
                  <Typography color="textPrimary">
                    <b>Payment name*</b>
                  </Typography>
                </InputLabel>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F4F4F7",
                    borderRadius: 6,
                    height: 36,
                    px: 2,
                  }}
                >
                  <Typography variant="body2">{dialogData.name}</Typography>
                </Box>
              </Box>
              <Box>
                <InputLabel sx={{ mb: 1 }}>
                  <Typography color="textPrimary">
                    <b>Request from*</b>
                  </Typography>
                </InputLabel>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F4F4F7",
                    borderRadius: 6,
                    height: 36,
                    px: 2,
                  }}
                >
                  <Typography variant="body2">{dialogData.vaultName}</Typography>
                </Box>
              </Box>
              <Box>
                <Stack direction="row" spacing={2}>
                  <Box width="50%">
                    <InputLabel sx={{ mb: 1 }}>
                      <Typography color="textPrimary">
                        <b>Amount*</b>
                      </Typography>
                    </InputLabel>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#F4F4F7",
                        borderRadius: 6,
                        height: 36,
                        px: 2,
                      }}
                    >
                      <Typography variant="body2">
                        {numeral(dialogData.amount).format("0,0.[000]")}
                      </Typography>
                    </Box>
                  </Box>
                  <Box width="50%">
                    <InputLabel sx={{ mb: 1 }}>
                      <Typography color="textPrimary">
                        <b>Currency*</b>
                      </Typography>
                    </InputLabel>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#F4F4F7",
                        borderRadius: 6,
                        height: 36,
                        px: 2,
                      }}
                    >
                      <Typography variant="body2">{dialogData.denom}</Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>
              <Box>
                <InputLabel sx={{ mb: 1 }}>
                  <Typography color="textPrimary">
                    <b>Details</b>
                  </Typography>
                </InputLabel>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#F4F4F7",
                    borderRadius: 6,
                    height: 36,
                    px: 2,
                  }}
                >
                  <Typography variant="body2">{dialogData.detail}</Typography>
                </Box>
              </Box>
            </Stack>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={5}>
              <Button
                variant="text"
                startIcon={
                  <Box>
                    <FontAwesomeIcon size="sm" icon={faChevronLeft} />
                  </Box>
                }
                onClick={() => {
                  setIsDialogOpen(false);
                  setDialogData(undefined);
                }}
              >
                <Typography>Back</Typography>
              </Button>
              {canApprove ? (
                <Stack direction="row" spacing={3}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#F1F1FF",
                      border: "1px solid #BBBBFF",
                      borderRadius: 999,
                      width: 120,
                      height: 36,
                    }}
                    onClick={handleCloseDialog}
                  >
                    <Typography sx={{ color: "#6F6FE8" }}>Reject</Typography>
                  </Button>
                  <PrimaryGradientButton
                    sx={{ minWidth: 120, height: 36 }}
                    onClick={handleApprove}
                    startIcon={
                      isApproving && (
                        <Box>
                          <FontAwesomeIcon icon={faSpinner} spin />
                        </Box>
                      )
                    }
                    disabled={!canApprove}
                  >
                    <Typography color="textPrimary">
                      {isApproving ? "Approving" : "Approve"}
                    </Typography>
                  </PrimaryGradientButton>
                </Stack>
              ) : (
                <Typography color="error.main" variant="body2">
                  *You cannot approve this payment
                </Typography>
              )}
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
};
