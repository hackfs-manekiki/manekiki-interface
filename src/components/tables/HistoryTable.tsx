import { useState } from "react";
import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { SecondaryButton } from "../buttons/SecondaryButton";

const mockArray = () => {
  let arr = [];
  for (let i = 0; i < 10; i++) {
    arr.push(mockData);
  }
  return arr;
};

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

const headers = ["From", "To", "Detail", "Price", "Requester", "Date/Time", "Status", "Approver"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: "0",
  backgroundColor: "white",
}));

export const HistoryTable = () => {
  const data = mockArray();
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalPage = (data.length + pageSize - 1) / pageSize;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box marginTop="30px">
      <Box width="100%" display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h4">History</Typography>
        </Box>
        <Box>
          <a src="google.com">see more</a>
        </Box>
      </Box>
      <TableContainer component={Paper}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page - 1 * pageSize, page * pageSize + pageSize).map((row) => (
              <TableRow
                key={row.detail}
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
                  {row.from}
                </StyledTableCell>
                <StyledTableCell align="left">{row.to}</StyledTableCell>
                <StyledTableCell align="left">{row.detail}</StyledTableCell>
                <StyledTableCell align="left">{`${row.price} ${row.priceDenom}`}</StyledTableCell>
                <StyledTableCell align="left">{row.requester}</StyledTableCell>
                <StyledTableCell align="left">{row.dateTime}</StyledTableCell>
                <StyledTableCell align="left">{row.status}</StyledTableCell>
                <StyledTableCell
                  sx={{
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                  }}
                  align="left"
                >
                  {row.approver}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box marginRight="150px" marginTop="42px" display="flex" justifyContent="flex-end">
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
        </Box>
      </TableContainer>
    </Box>
  );
};
