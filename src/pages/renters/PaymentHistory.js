import { useEffect } from 'react';
import { random } from 'lodash';
// material
import { Container, Typography, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import PaymentList from '../../components/customer/payment';
import { getPayments } from '../../redux/slices/renter';
import { useSelector, useDispatch } from '../../redux/store';
import { NotFound } from '../../components/customer/NotFound';
import { InvoiceToolbar } from '../../components/_dashboard/invoice';

const INVOICE = {
  id: 0,
  taxes: 5,
  discount: 10,
  status: 'paid',
  invoiceFrom: {
    name: 'Kathlyn Hauck',
    address: 'DieSachbearbeiter Choriner Straße 49 10435 Berlin',
    company: 'Durgan Group',
    email: 'Dion.collins23@gmail.com',
    phone: '227-940-9869'
  },
  invoiceTo: {
    name: 'Lesly Reichel',
    address: 'Keas 69 Str. 15234, Chalandri Athens, Greece',
    company: 'Stracke LLC',
    email: 'kurt_durgan46@hotmail.com',
    phone: '261-433-6689'
  },
  items: [...Array(3)].map((_, index) => ({
    id: Math.random(),
    title: 'mockData.text.title(index)',
    description: 'mockData.text.description(index)',
    qty: random(5),
    price: 4000
  }))
};

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
        <InvoiceToolbar invoice={INVOICE} />

        <PaymentList payments={payments} />
      </Container>
    </Page>
  );
}
