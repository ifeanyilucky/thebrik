import { Container, Stack, Typography, Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../redux/store';
import { getBookings } from '../../redux/slices/renter';
import BookingsList from '../../components/customer/bookings';

export default function Bookings() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBookings());
  }, [dispatch]);
  const { bookings, isLoading } = useSelector((state) => state.user);
  console.log(bookings);
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
        <CircularProgress size={60} />
      </Box>
    );
  }
  return (
    <Container maxWidth="xl">
      <Stack spacing={1} my={3}>
        <Typography variant="h5">Bookings</Typography>
        <Typography variant="body2">See full details of your bookings</Typography>
      </Stack>

      <BookingsList bookings={bookings} />
    </Container>
  );
}
