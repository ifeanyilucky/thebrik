import {
  TableBody,
  Table,
  Card,
  TableContainer,
  TableRow,
  TableCell,
  Stack,
  TablePagination,
  Typography,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { sentenceCase } from 'change-case';
import { getComparator, applySortFilter } from './sort';
import { HostelListHead, HostelListToolbar, HostelMoreMenu } from '../../_dashboard/agentHostels';
import Scrollbar from '../../Scrollbar';
import SearchNotFound from '../../SearchNotFound';
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../Label';
//   ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'createdAt', label: 'Posted on', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  {}
];
//   ----------------------------------------------------------------------
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
export default function HostListings({ listings }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('price');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  console.log(listings);
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

  const handleFilterByName = (e) => {
    setFilterName(e.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listings.length) : 0;

  const filteredListings = applySortFilter(listings, getComparator(order, orderBy), filterName);

  const isHostelNotFound = filteredListings.length === 0;
  return (
    <CardStyle>
      <HostelListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <HostelListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredListings
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((hostel) => (
                  <TableRow hover key={hostel?._id} tabIndex={-1} role="checkbox">
                    <TableCell component="th" scope="row" padding="normal">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <ThumbImgStyle alt={hostel?.name} src={hostel?.images[0]} />
                        <Typography variant="subtitle2" noWrap>
                          {hostel?.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">
                      {hostel?.prices?.price && fCurrency(hostel?.prices?.price)}
                    </TableCell>
                    <TableCell align="left">{`${hostel?.area}, ${hostel?.state}`}</TableCell>
                    <TableCell align="left">
                      {hostel?.createdAt && fDate(hostel?.createdAt)}
                    </TableCell>
                    <TableCell align="left">
                      {hostel?.status && (
                        <Label
                          variant="ghost"
                          color={
                            (hostel?.status === 'Pending' && 'warning') ||
                            (hostel?.status === 'Declined' && 'error') ||
                            (hostel?.status === 'Deactivated' && 'error') ||
                            (hostel?.status === 'Awaiting approval' && 'warning') ||
                            (hostel?.status === 'Published' && 'success')
                          }
                        >
                          {hostel?.status}
                        </Label>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <HostelMoreMenu hostel={hostel} />
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
                    <SearchNotFound searchQuery={filterName} />
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
        count={listings.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </CardStyle>
  );
}
