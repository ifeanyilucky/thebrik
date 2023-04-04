import { Container, Typography, Grid, Stack, Card, CardContent } from '@mui/material';
import { styled } from '@mui/styles';
import Page from '../../components/Page';

export default function Referral() {
  const CardStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    backgroundColor: '#fff',
    [theme.breakpoints.up('md')]: {
      height: '100%'
    }
  }));
  return (
    <Page title="Referral">
      <Container maxWidth="xl">
        <Stack my={2} spacing={1}>
          <Typography variant="h5">Referral</Typography>
        </Stack>

        <Grid container spacing={4}>
          <Grid item sm="12" md="8">
            <CardStyle>
              <CardContent>
                <Typography variant="subtitle1">You referral stats</Typography>
              </CardContent>
            </CardStyle>
          </Grid>
          <Grid item sm="12" md="4">
            <CardStyle>
              <CardContent>
                <Typography variant="subtitle1">Introduce a client</Typography>
              </CardContent>
            </CardStyle>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
