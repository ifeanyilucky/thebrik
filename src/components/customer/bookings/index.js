import { useState } from 'react';
import { truncate } from 'lodash';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
  TablePagination
} from '@mui/material';

// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
// components
import Page from '../../Page';
import Label from '../../Label';
import Scrollbar from '../../Scrollbar';
import SearchNotFound from '../../SearchNotFound';
import { ProductListHead, ProductListToolbar } from '../../_dashboard/hostel-list';
import { applySortFilter, getComparator } from './sorting';
import BookingDetails from './booking-details';
import BookingMenu from './booking-menu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Hostel name', alignRight: false },
  { id: 'cost', label: 'Cost', alignRight: false },
  { id: 'bookingDate', label: 'Booking date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: true },
  { id: '' }
];

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));
const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  margin: theme.spacing(0, 2),
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BookingsList({ bookings }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [orderBy, setOrderBy] = useState('createdAt');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings.length) : 0;

  const filteredBookings = applySortFilter(bookings, getComparator(order, orderBy), filterName);

  const isBookingNotFound = filteredBookings.length === 0;
  const [bookingDetails, setBookingDetails] = useState(null);
  const [bookingDetailsOpen, setBookingDetailsOpen] = useState(false);
  return (
    <Page title="Bookings">
      <BookingDetails
        details={bookingDetails}
        open={bookingDetailsOpen}
        setOpen={setBookingDetailsOpen}
      />
      <CardStyle>
        <ProductListToolbar filterName={filterName} onFilterName={handleFilterByName} />

        <Scrollbar>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ProductListHead
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={bookings.length}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {filteredBookings
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row?._id} tabIndex={-1}>
                      <TableCell component="th" scope="row" padding="none">
                        <Box
                          sx={{
                            py: 2,
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <ThumbImgStyle alt={row?.hostel?.name} src={row?.hostel?.images[0]} />
                          <Typography variant="subtitle2" noWrap>
                            {truncate(row?.hostel?.name, { length: 20, omission: '...' })}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="left">
                        {fCurrency(row?.hostel?.prices?.totalCost)}
                      </TableCell>
                      <TableCell>{row?.date && fDate(row?.date)}</TableCell>
                      <TableCell align="right">
                        {row?.status && (
                          <Label
                            variant="ghost"
                            color={
                              (row?.status === 'Pending' && 'warning') ||
                              (row?.status === 'Completed' && 'success')
                            }
                          >
                            {row?.status}
                          </Label>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <BookingMenu
                          onView={() => {
                            setBookingDetails(row);
                            setBookingDetailsOpen(true);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              {isBookingNotFound && (
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={6}>
                      <Box sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </Box>
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
          count={bookings.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardStyle>
    </Page>
  );
}
