import { useMemo, useState } from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faExternalLink } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserHistories } from "src/hooks/history/useUserHistories";
import numeral from "numeral";
import dayjs from "dayjs";
import { shortenAddress } from "src/utils/shortenAddress";

const mockData: ApprovalHistory = {
  from: "Tech",
  to: "Apemon",
  detail: "Pinata - August",
  price: 300,
  priceDenom: "USDC",
  requester: "Apemon",
  dateTime: "16/7/2022 11:11:12",
  status: "Complete",
  approver: "Ren",
};
type TableProps = {
  data: ApprovalHistory[];
  onViewDetail: any;
};

type ApprovalHistory = {
  from: string;
  to: string;
  detail: string;
  price: number;
  priceDenom: string;
  requester: string;
  dateTime: string;
  status: string;
  approver: string;
};

const headers = ["Vault", "To", "Detail", "Price", "Requester", "Date/Time", "Status", "Approver"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "0",
  backgroundColor: "white",
}));

type Props = {
  pageSize?: number;
};
export const HistoryTable = ({ pageSize = 10 }) => {
  const router = useRouter();
  const slug = router.query.slug as string;
  const data = Array.from({ length: 28 }).map(() => ({ ...mockData }));
  const [page, setPage] = useState(1);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // TODO: query real data
  const {
    data: histories,
    loading: isHistoriesLoading,
    error: isHistoriesError,
  } = useUserHistories();

  const totalPage = useMemo(() => {
    if (!histories) return 1;
    return Math.ceil(histories.length / pageSize);
  }, [histories, pageSize]);

  return (
    <Box>
      <Box width="100%" display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4">History</Typography>
        </Box>
        {router.pathname === "/company/[slug]/history" ? null : (
          <Link href={{ pathname: "/company/[slug]/history", query: { slug } }} passHref>
            <Button
              variant="text"
              sx={{ color: "#EF7D70", ":hover": { backgroundColor: "transparent" } }}
              endIcon={
                <Box mt={0.5} ml={-0.5}>
                  <FontAwesomeIcon icon={faChevronRight} size="xs" />
                </Box>
              }
            >
              <Typography sx={{ fontSize: 14, lineHeight: "17px" }}>see more</Typography>
            </Button>
          </Link>
        )}
      </Box>
      <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: "transparent" }}>
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
              {headers.map((header) => {
                return (
                  <TableCell
                    sx={{
                      border: "0px",
                    }}
                    key={header}
                    align="left"
                  >
                    <Typography fontWeight="700">{header}</Typography>
                  </TableCell>
                );
              })}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {histories.slice((page - 1) * pageSize, page * pageSize).map((history) => (
              <TableRow
                key={history.detail}
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
                  scope="from"
                >
                  {history.vaultName ?? "??"}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2">{history.recipientName}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2">{history.detail}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2" sx={{ color: "#40A331" }}>
                    {`${numeral(history.amount).format("0,0.[000]")} ${history.denom}`}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2">{history.requesterName}</Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2"></Typography>
                  {dayjs(history.approveTimestamp).format("DD/MM/YYYY, HH:mm:ss")}
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2" textTransform="capitalize">
                    {history.status?.toLowerCase()}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="left">
                  <Typography variant="body2">
                    {history.approverName || shortenAddress(history.approverAddress, 5)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  sx={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                >
                  <IconButton
                    sx={{
                      color: "white",
                      backgroundColor: "common.purple",
                      width: 24,
                      height: 24,
                      fontSize: 16,
                      ":hover": {
                        backgroundColor: "common.purple",
                      },
                    }}
                  >
                    <FontAwesomeIcon icon={faExternalLink} size="xs" />
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={9} sx={{ p: 0, border: "none" }}>
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChangePage}
                  sx={{
                    fontSize: "12px",
                    width: "fit-content",
                    ml: "auto",
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
        {/* <Box mt={2} mb={5} mr={0} display="flex" justifyContent="flex-end">
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
    </Box>
  );
};
