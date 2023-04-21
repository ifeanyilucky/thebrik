import React from 'react';
import { Container, Grid, Typography, Stack } from '@mui/material';
import OverviewCard from '../../components/customer/overview';
import HelpCenterCard from '../../components/customer/HelpCenterCard';
import AppListing from '../../components/customer/AppListing';
import { useAuth } from '../../hooks/useAuth';
import Page from '../../components/Page';

export default function CustomerOverview() {
  const greetings = ['Good morning', 'Good afternoon', 'Good evening'][
    parseInt((new Date().getHours() / 24) * 3, 10)
  ];
  const { user } = useAuth();
  console.log(user);
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Stack my={2} spacing={1}>
          <Typography variant="h5">
            {greetings}, {user?.firstName}
          </Typography>
          <Typography variant="body2">Welcome to your dashboard</Typography>
        </Stack>
        <Grid container spacing={4}>
          <Grid item sm={12} xs={12} md={7}>
            <OverviewCard />
          </Grid>
          <Grid item sm={12} xs={12} md={5}>
            <HelpCenterCard />
          </Grid>
          <Grid item md={12} xs={12} sm={12}>
            <AppListing />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
