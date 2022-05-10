import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from "@mui/material/Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#aaabab',
    // theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function StickyHeadTable({ columns, rows, source, rpp, openDialopg, setRowData, universities, departments }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(rpp ? rpp : 10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rowClick = (row) => {
    openDialopg();
    setRowData(row)

  }
  return (
    <Paper elevation={2} sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 550 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={'center'}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <StyledTableRow onClick={() => rowClick(row)} hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id] || '';
                      let university = {}
                      let department = {}
                      if (source === 'dashboard') {
                        department = departments.filter(r => r.id === row['department_id'])[0];
                        university = universities.filter(r => r.id === row['university_id'])[0];
                      }
                      return (
                        <StyledTableCell key={column.id} align={'center'}
                        >
                          {column.id === 'department_en' ? department.department_name_en :
                            column.id === 'department_ar' ? department.department_name_ar :
                              column.id === 'university' ?
                                <Chip label={university.university_name_en} sx={{ backgroundColor: university.color || '', color: 'white' }} variant="filled" /> :
                                column.id === 'color' ?
                                  <Chip label={value} color={'success'} variant="filled" sx={{ backgroundColor: value }} /> :
                                  column.id === 'logo' ?
                                    <Avatar sx={{ mr: 1 }} alt="logo" src={value} /> :
                                    column.id === 'isActive' ?
                                      <Typography
                                        variant="h7"
                                        component="div"
                                        sx={{ color: value === true ? '#009688' : '#f48fb1' }}>
                                        {value === true ? 'Active' : 'Suspended'}
                                      </Typography> :
                                      column.id === 'role' ?
                                        <Chip
                                          label={value}
                                          color={value === 'Admin' ? 'info' :
                                            value === 'SubAgent' ? 'warning' : 'primary'}
                                          variant="filled" /> :
                                        column.id === 'years' ?
                                          value + ' Years'
                                          :
                                          column.id === 'price_before' || column.id === 'price_after' ?
                                            <Typography
                                              variant="h7"
                                              component="div">
                                              {value}{row['currency'] === 'usd' ? '$' : 'TL'}
                                            </Typography>

                                            :
                                            value.length < 1 ? '---' : value}
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow >
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {
        source && source === 'dashboard' &&
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      }

    </Paper>
  );
}
