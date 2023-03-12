import { Container, Typography, Grid, Stack, Button, Box } from '@mui/material';
import { styled } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_PAGE } from '../../../routes/paths';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  marginTop: theme.spacing(10)
}));

export default function LandingPartner() {
  return (
    <RootStyle>
      <Container>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid Item md={7} sm={12} mb={{ sm: 4, xs: 4 }}>
            <Box component="img" src="/static/images/woman-box.webp" alt="partnership-img" />
          </Grid>
          <Grid Item md={5} sm={12}>
            <Stack spacing={2}>
              <Typography variant="overline" sx={{ color: 'primary.main' }}>
                Agent network
              </Typography>
              <Typography variant="h3">Become an agent on Thebrik</Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                Are you a local agent? Get free access to our platform to widen the reach of your
                offers. Join the community of topmost agents and landlords now.
              </Typography>
              <Box>
                <Button
                  component={RouterLink}
                  to={PATH_PAGE.becomeAgent}
                  size="large"
                  variant="contained"
                >
                  Find out more
                </Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
