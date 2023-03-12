import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Stack,
  Divider,
  Link,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { fCurrency } from '../../utils/formatNumber';
import { PATH_DASHBOARD, PATH_AGENT } from '../../routes/paths';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));
const bookings = [];
const paidHostels = [];
const earnings = 0.0;

OverviewCard.propTypes = {
  listings: PropTypes.array,
  isLoading: PropTypes.bool
};
export default function OverviewCard({ listings, isLoading }) {
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
        <CircularProgress size={30} />
      </Box>
    );
  }
  return (
    <RootStyle>
      <CardContent>
        <Typography variant="subtitle1">Overview</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }} mb={2}>
          Here's a quick overview of your listings.
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={5} sm={6} xs={12} height="100%">
            <Box
              sx={{ border: '1px solid #f4f4f4', minHeight: '100%', borderRadius: '0.5rem' }}
              py={2}
              px={2}
            >
              <Stack spacing={1.5}>
                <Typography variant="overline">Hostels Listed</Typography>
                <Typography variant="h4">{listings?.length}</Typography>
                <Stack spacing={1} direction="row" divider={<Divider orientation="vertical" />}>
                  <Link
                    component={RouterLink}
                    to={PATH_AGENT.listings}
                    sx={{ textDecoration: 'underline' }}
                  >
                    <Typography variant="body2">See all</Typography>
                  </Link>
                  <Link
                    component={RouterLink}
                    to={PATH_AGENT.new}
                    sx={{ textDecoration: 'underline' }}
                  >
                    <Typography variant="body2">Add new listing</Typography>
                  </Link>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid item md={7} sm={6} xs={12}>
            <Box
              sx={{ border: '1px solid #f4f4f4', height: '100%', borderRadius: '0.5rem' }}
              py={2}
              px={2}
            >
              <Stack spacing={1.5}>
                <Typography variant="overline">Earnings</Typography>
                <Typography variant="h4">{fCurrency(earnings)}</Typography>
                <Typography variant="caption">This month</Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </RootStyle>
  );
}
