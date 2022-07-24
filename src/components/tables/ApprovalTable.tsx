import { useState } from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { SecondaryButton } from "../buttons/SecondaryButton";
import numeral from "numeral";
import dayjs from "dayjs";
import { usePendingUserHistories } from "src/hooks/history/usePendingUserHistories";

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
  const data = mockArray();
  const [page, setPage] = useState(1);
  const pageSize = 10;

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

  // TODO: query real data
  const { data: histories, loading: isHistoriesLoading } = usePendingUserHistories();
  const totalPage = isHistoriesLoading ? 1 : (histories.length + pageSize - 1) / pageSize;

  return (
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
                <StyledTableCell align="left">{history.requesterName}</StyledTableCell>
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
                  {history.status}
                </StyledTableCell>
                <TableCell sx={{ py: 0, border: "none", background: "transparent" }}>
                  <SecondaryButton
                    sx={{
                      width: 120,
                      height: 36,
                      px: 0,
                      my: "auto",
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
  );
};
