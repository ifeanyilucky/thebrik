import React, { useEffect } from 'react';
import { Container, Grid, Typography, Stack } from '@mui/material';
import OverviewCard from '../../components/host/overview-card';
import HelpCenterCard from '../../components/customer/HelpCenterCard';
import { useAuth } from '../../hooks/useAuth';
import RecentBookings from '../../components/host/recent-bookings';
import { useDispatch, useSelector } from '../../redux/store';
import { getListing, getInspections, getRemittance } from '../../redux/slices/host';
import Page from '../../components/Page';

export default function AgentOverview() {
  const greetings = ['Good morning', 'Good afternoon', 'Good evening'][
    parseInt((new Date().getHours() / 24) * 3, 10)
  ];
  const dispatch = useDispatch();
  const { user } = useAuth();
  useEffect(() => {
    dispatch(getListing());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInspections());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getRemittance());
  }, []);

  const { isLoading, listings, inspections, remittance } = useSelector((state) => state.host);

  console.log(remittance);
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
            <OverviewCard listings={listings} isLoading={isLoading} />
          </Grid>
          <Grid item sm={12} xs={12} md={5}>
            <HelpCenterCard />
          </Grid>
          <Grid item md={12} xs={12} sm={12}>
            <RecentBookings inspections={inspections} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
