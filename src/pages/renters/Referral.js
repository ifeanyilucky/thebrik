import { useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Stack,
  Card,
  CardContent,
  Box,
  Button,
  CircularProgress,
  Backdrop
} from '@mui/material';
import { styled } from '@mui/styles';
import Page from '../../components/Page';
import { useAuth } from '../../hooks/useAuth';
import { fCurrency, fNumber } from '../../utils/formatNumber';
import { useDispatch, useSelector } from '../../redux/store';
import { getReferredUsers } from '../../redux/slices/renter';

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));
export default function Referral() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getReferredUsers());
  }, []);
  const { referral, isLoading } = useSelector((state) => state.user);

  const { user } = useAuth();

  return (
    <Page title="Referral">
      <Container maxWidth="xl">
        <Stack my={2} spacing={1}>
          <Typography variant="h5">Referral</Typography>
          <Typography variant="body2">Thebrik Referral Program.</Typography>
        </Stack>

        <Grid container spacing={4} sx={{ minWidth: '100%' }}>
          <Grid item sm="12" md="8" sx={{ minWidth: '100%' }}>
            {isLoading ? (
              <Backdrop open sx={{ zIndex: 9999 }}>
                <CircularProgress />
              </Backdrop>
            ) : (
              <CardStyle>
                <CardContent>
                  <Typography variant="subtitle1" sx={{ mb: 4 }}>
                    You referral stats
                  </Typography>
                  <Grid container spacing={2} sx={{ width: '100%' }}>
                    <Grid item md={5} sm={12} xs={12} height="100%" width="100%">
                      <Box
                        sx={{
                          border: '1px solid #f4f4f4',
                          minHeight: '100%',
                          borderRadius: '0.5rem'
                        }}
                        py={2}
                        px={2}
                      >
                        <Stack spacing={1.5}>
                          <Typography variant="overline">Referred users</Typography>
                          <Typography variant="h4">{fNumber(referral.users?.length)}</Typography>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item md={7} sm={12} xs={12}>
                      <Box
                        sx={{ border: '1px solid #f4f4f4', height: '100%', borderRadius: '0.5rem' }}
                        py={2}
                        px={2}
                      >
                        <Stack spacing={1.5}>
                          <Typography variant="overline">Referral bonus</Typography>
                          <Typography variant="h4">{fCurrency(referral.bonus)}</Typography>
                          <Box>
                            <Button disabled={!(referral.bonus > 5000)}>Withdraw</Button>
                          </Box>
                        </Stack>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardStyle>
            )}
          </Grid>
          <Grid item sm="12" md="4" sx={{ minWidth: '100%' }}>
            <CardStyle>
              <CardContent sx={{ height: '100%' }}>
                <Box
                  sx={{
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    height: '100%'
                  }}
                >
                  <div>
                    <Typography variant="subtitle1">Your referral code:</Typography>
                    <Typography variant="h3" sx={{ color: 'primary.main' }}>
                      {user?.referralId}
                    </Typography>
                    <Typography variant="caption">
                      Invite friends to use your referral code.
                    </Typography>
                  </div>
                </Box>
              </CardContent>
            </CardStyle>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
