import {
  Card,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
  TableRow,
  TableCell,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
import PropTypes from 'prop-types';
import { applySortFilter, getComparator } from './sort';
import Label from '../../Label';
import { ProductListHead } from '../../_dashboard/hostel-list';
import Scrollbar from '../../Scrollbar';
import { fCurrency } from '../../../utils/formatNumber';
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'hostel', label: 'Hostel', alignRight: false },
  { id: 'Amount', label: 'Amount (NGN)', alignRight: false },
  { id: 'area', label: 'Area', alignRight: false },
  { id: 'createdAt', label: 'Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));

PaymentList.propTypes = {
  payments: PropTypes.array
};

export default function PaymentList({ payments }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('price');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(payments);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  // const handleFilterByName = (e) => {
  //   setFilterName(e.target.value);
  // };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - payments.length) : 0;

  const filteredPayments = applySortFilter(payments, getComparator(order, orderBy), filterName);

  const isHostelNotFound = filteredPayments.length === 0;
  return (
    <RootStyle>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ProductListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredPayments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((payment) => (
                  <TableRow hover key={payment?._id} tabIndex={-1} role="checkbox">
                    <TableCell component="th" scope="row" padding="normal">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography variant="subtitle2" noWrap>
                          {payment?.hostel?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      {payment?.amount && fCurrency(payment?.amount)}
                    </TableCell>
                    <TableCell align="left">{payment?.hostel?.area}</TableCell>
                    <TableCell align="left">
                      {payment?.createdAt && fDate(payment?.createdAt)}
                    </TableCell>
                    <TableCell align="left">
                      <Label variant="ghost" color="success">
                        {payment?.status && sentenceCase(payment?.status)}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            {isHostelNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <Paper>
                      <Typography gutterBottom align="center" variant="subtitle1">
                        No payment history
                      </Typography>
                      <Typography variant="body2" align="center">
                        You currently do not have any payment history &nbsp;
                      </Typography>
                    </Paper>
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Scrollbar>

      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={payments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </RootStyle>
  );
}
