import styled from "@emotion/styled";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const headers = ["Dessert", "Calories", "Fat (g)", "Carbs (g)", "Protein (g)"];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '0'
}));

export const BaseTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table 
        sx={{
          minWidth: 650,
          borderSpacing: '0 2em',
          borderCollapse: 'unset',
          boxShadow: 'none'
        }}
      >
        <TableHead
          sx={{
            boxShadow: 'none'
          }}
        >
          <TableRow>
            {headers.map((header) => {
              return (
                <TableCell key={header} align="left">
                  <Typography fontWeight="700">
                    {header}
                  </Typography>
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody
        >
          {rows.map((row) => (
            <TableRow key={row.name} 
              sx={{ 
                borderRadius: 6,
                background: "white",
              }}
            >
              <StyledTableCell 
                sx={{
                  borderTopLeftRadius: '10px',
                  borderBottomLeftRadius: '10px',
                }}
                component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="left">{row.calories}</StyledTableCell>
              <StyledTableCell align="left">{row.fat}</StyledTableCell>
              <StyledTableCell align="left">{row.carbs}</StyledTableCell>
              <StyledTableCell 
              sx={{
                borderTopRightRadius: '10px',
                borderBottomRightRadius: '10px',
              }} align="left">{row.protein}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
