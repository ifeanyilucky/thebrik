// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Stack, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../Iconify';
import { PATH_PAGE } from '../../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  marginBottom: theme.spacing(10)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// ----------------------------------------------------------------------

export default function LandingBenefit() {
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
              <Typography variant="h3">Benefit of renting with us</Typography>
              <Typography variant="body1">
                Unlike local agents, Thebrik offers services that are accessible at your comfort.
                Rent with us to enjoy unlimited flexibility in our offers that will suit your taste
                and like. Furthermore, you have nothing to worry about as hostels uploaded for rent
                are thoroughly screened and verified to ensure they meet student friendly criteria.
                With us, transparency, safety, and convenience is always guaranteed.
              </Typography>
              <Box marginBottom={5}>
                <Button
                  size="large"
                  variant="outlined"
                  component={RouterLink}
                  to={PATH_PAGE.hostels}
                  color="inherit"
                >
                  Browse hostels
                </Button>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box component="img" src="/static/images/customer-overlap.svg" alt="hostel-payment" />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
