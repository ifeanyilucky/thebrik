import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Stack,
  Link,
  TableBody,
  Button,
  Divider,
  TableContainer,
  TableCell,
  TableHead,
  Table,
  TableRow
} from '@mui/material';
import { styled } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { sentenceCase } from 'change-case';
import PropTypes from 'prop-types';
import { NotFound } from '../customer/NotFound';
import { fCurrency } from '../../utils/formatNumber';
import { fDateTime } from '../../utils/formatTime';
import Scrollbar from '../Scrollbar';
import Label from '../Label';
import Iconify from '../Iconify';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));

RecentBookings.propTypes = {
  inspections: PropTypes.array
};

export default function RecentBookings({ inspections }) {
  console.log(inspections);

  return (
    <RootStyle>
      <CardContent>
        <Typography variant="h5">Recent bookings</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} mb={2}>
          Here's a breakdown of your recent bookings.
        </Typography>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 720 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Customer</TableCell>
                  <TableCell>Apartment</TableCell>
                  <TableCell>Booking date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {inspections.map((row) => (
                  <TableRow key={row?._id}>
                    <TableCell>
                      {row?.user?.firstName} {row?.user?.lastName}
                    </TableCell>
                    <TableCell>{row?.hostel?.name}</TableCell>
                    <TableCell>{row?.date && fDateTime(row?.date)}</TableCell>
                    <TableCell>
                      <Label
                        variant={'light'}
                        color={
                          (row?.status === 'in_progress' && 'warning') ||
                          (row?.status === 'out_of_date' && 'error') ||
                          'success'
                        }
                      >
                        {sentenceCase(row?.status)}
                      </Label>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 2, textAlign: 'right' }}>
          <Button
            to="#"
            size="small"
            color="inherit"
            component={RouterLink}
            endIcon={<Iconify icon={arrowIosForwardFill} />}
          >
            View All
          </Button>
        </Box>
      </CardContent>
    </RootStyle>
  );
}
