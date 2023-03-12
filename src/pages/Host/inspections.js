import React, { useEffect, useState } from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CardContent,
  Box,
  CircularProgress
} from '@mui/material';
import addListIcon from '@iconify/icons-ant-design/file-add-outline';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
import { HostelListHead, HostelListToolbar } from '../../components/_dashboard/agentHostels';
import { useAuth } from '../../hooks/useAuth';
import { PATH_AGENT } from '../../routes/paths';
//
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'Title', alignRight: false },
  { id: 'price', label: 'Initial Payment (NGN)', alignRight: false },
  { id: 'area', label: 'Area', alignRight: false },
  { id: 'date', label: 'Inspection date', alignRight: false },
  { id: 'availabilityStatus', label: 'Status', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (hostel) => hostel?.hostel?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Listings() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected] = useState([]);
  const [orderBy, setOrderBy] = useState('price');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();

  const { inspections } = useSelector((state) => state.properties);
  const { account } = useAuth();
  console.log(inspections);

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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inspections.length) : 0;

  const filteredInspections = applySortFilter(
    inspections,
    getComparator(order, orderBy),
    filterName
  );

  const isHostelNotFound = filteredInspections.length === 0;
  // const {}=
  if (!inspections)
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '20vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  return (
    <Page title="My Listings">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Inspection booking for agent
          </Typography>
        </Stack>
        {inspections === 0 && filterName === '' ? (
          <Empty account={account} />
        ) : (
          <Card>
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
                    {filteredInspections
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((inspection) => {
                        const { _id, name, price, avatarUrl, isVerified, area, school } =
                          inspection?.hostel;
                        const isItemSelected = selected.indexOf(name) !== -1;
                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell component="th" scope="row" padding="normal">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt={name} src={avatarUrl} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{fCurrency(price)}</TableCell>
                            <TableCell align="left">{`${area}, ${school}`}</TableCell>
                            <TableCell align="left">{fDate(inspection?.date)}</TableCell>
                            <TableCell align="left">
                              {isVerified ? (
                                <Label variant="ghost" color="success">
                                  {sentenceCase('available')}
                                </Label>
                              ) : (
                                <Label variant="ghost" color="warning">
                                  {sentenceCase('pending approval')}
                                </Label>
                              )}
                            </TableCell>

                            {/* <TableCell align="right">
                              <HostelMoreMenu hostel={hostel} />
                            </TableCell> */}
                          </TableRow>
                        );
                      })}
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
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={inspections.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        )}
      </Container>
    </Page>
  );
}

function Empty({ account }) {
  return (
    <Stack
      sx={{
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}
      spacing={3}
      maxWidth={500}
    >
      <Typography variant="h2">Hello {account.firstName},</Typography>
      <Typography variant="body1">
        Listing your hostel is the first step to take as Thebrik agent and we’ve made that super
        easy for you.
      </Typography>
      <Card sx={{ border: '1px solid var(--border-color)' }}>
        <CardContent>
          <Icon icon={addListIcon} fontSize="63px" color="var(--primary-color)" />
          <Typography variant="body2" sx={{ marginBottom: 1.5 }}>
            Show the world what they're missing!
          </Typography>
          <Button variant="contained" component={RouterLink} to={PATH_AGENT.new} size="large">
            List your first property
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}
