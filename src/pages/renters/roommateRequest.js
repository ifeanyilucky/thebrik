import React from 'react';

// material
import { Container, Typography, Stack } from '@mui/material';
// redux

// hooks
// components
import Page from '../../components/Page';

import RoommateRequestForm from '../../components/_dashboard/RoommateRequestForm';
// ----------------------------------------------------------------------

export default function RoommateRequest() {
  return (
    <Page title="Roommate request">
      <Container maxWidth={'lg'}>
        <Stack spacing={1} my={3}>
          <Typography variant="h5">Roommate request</Typography>
          <Typography variant="body2">Enter the information below</Typography>
        </Stack>
        <RoommateRequestForm />
      </Container>
    </Page>
  );
}
