import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
  Stack,
  Link,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/styles';
import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../routes/paths';
import { getBookings, getPayments } from '../../redux/slices/renter';
import { useDispatch, useSelector } from '../../redux/store';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));

export default function OverviewCard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);
  const { bookings, isLoading, payments } = useSelector((state) => state.user);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '20vh'
        }}
      >
        <CircularProgress size={30} />
      </Box>
    );
  }
  return (
    <>
      <RootStyle>
        <CardContent>
          <Typography variant="subtitle1">Overview</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} mb={2}>
            Here's a quick overview of what's happening
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={5} sm={6} xs={12} height="100%">
              <Box
                sx={{ border: '1px solid #f4f4f4', minHeight: '100%', borderRadius: '0.5rem' }}
                py={2}
                px={2}
              >
                <Stack spacing={1.5}>
                  <Typography variant="overline">Booked Hostels</Typography>
                  <Typography variant="h4">{bookings?.length}</Typography>
                  <Link
                    component={RouterLink}
                    to={PATH_DASHBOARD.bookings}
                    sx={{ textDecoration: 'underline' }}
                  >
                    See all
                  </Link>
                </Stack>
              </Box>
            </Grid>
            <Grid item md={7} sm={6} xs={12}>
              <Box
                sx={{ border: '1px solid #f4f4f4', height: '100%', borderRadius: '0.5rem' }}
                py={2}
                px={2}
              >
                <Stack spacing={1.5}>
                  <Typography variant="overline">Hostel paid for</Typography>
                  <Typography variant="h4">{payments?.length}</Typography>
                  <Link
                    component={RouterLink}
                    to={PATH_DASHBOARD.paymentHistory}
                    sx={{ textDecoration: 'underline' }}
                  >
                    See all
                  </Link>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </RootStyle>
    </>
  );
}
