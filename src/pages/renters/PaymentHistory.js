import { useEffect } from 'react';
// material
import { Container, Typography, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import PaymentList from '../../components/customer/payment';
import { getPayments } from '../../redux/slices/renter';
import { useSelector, useDispatch } from '../../redux/store';

export default function PaymentHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPayments());
  }, [dispatch]);

  const { payments } = useSelector((state) => state.user);

  return (
    <Page title="My Payment History">
      <Container maxWidth="lg">
        <Stack spacing={1} my={3}>
          <Typography variant="h5">Payment history</Typography>
          <Typography variant="body2">See full details of your payment history</Typography>
        </Stack>

        <PaymentList payments={payments} />
      </Container>
    </Page>
  );
}
