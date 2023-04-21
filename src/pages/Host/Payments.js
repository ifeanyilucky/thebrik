// material
import { Container, Typography, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import PaymentList from '../../components/host/payments';

export default function PaymentHistory() {
  const payments = [];

  return (
    <Page title="Payments">
      <Container maxWidth="lg">
        <Stack spacing={1} my={3}>
          <Typography variant="h5">Payments</Typography>
          <Typography variant="body2">Manage payments on Thebrik</Typography>
        </Stack>
        <PaymentList payments={payments} />
      </Container>
    </Page>
  );
}
