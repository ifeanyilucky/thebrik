import { Container, Typography, Grid, Stack, Button, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/styles';
import PropTypes from 'prop-types';
import { HostelCard } from '../../hostel';

const RootStyle = styled('div')(({ theme }) => ({
  padding: '5rem 0'
}));

export default function LandingListings({ hostels, loading }) {
  console.log(hostels);
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid
          container
          spacing={1}
          direction={{ md: 'row', sm: 'column-reverse' }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={5} sx={{ position: 'relative', mb: { sm: 3, xs: 3 } }}>
            <Stack spacing={2}>
              <Typography variant="h3">Explore amazing hostels on Thebrik</Typography>
              <Typography variant="body1">
                Thebrik-managed apartments are move-in ready and all bills inclusive. When you
                subscribe, you have complete access to more benefits than you can imagine. Living
                essentials including cooking gas supply, up to 24 hours power supply, treated water,
                waste management and and facility maintenance including plumbing, painting and AC
                repair.
              </Typography>
              <Box marginBottom={5}>
                <Button size="large" variant="outlined" color="inherit">
                  Browse hostels
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              {loading
                ? [...Array(4)].map((_, index) => (
                    <Box key={index}>
                      <Skeleton
                        variant="rectangular"
                        width="100%"
                        sx={{ paddingTop: '115%', borderRadius: 2 }}
                      />
                    </Box>
                  ))
                : hostels.map((hostel) => (
                    <Box key={hostel._id}>
                      <HostelCard hostel={hostel} />
                    </Box>
                  ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

LandingListings.propTypes = {
  loading: PropTypes.bool,
  hostels: PropTypes.arrayOf(PropTypes.object)
};
