import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Container, Typography, Stack } from '@mui/material';
// components
import Page from '../../components/Page';
import PaymentList from '../../components/host/payments';
import { useSelector, useDispatch } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';

export default function PaymentHistory() {
  const dispatch = useDispatch();

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
