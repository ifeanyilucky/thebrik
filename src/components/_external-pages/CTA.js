import { Container, Box, Typography, Stack, Button } from '@mui/material';
import { useTheme } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import CustomCard from '../CustomCard';
import { PATH_PAGE, PATH_AUTH } from '../../routes/paths';

export default function CTA() {
  const theme = useTheme();
  return (
    <Container>
      <CustomCard sx={{ my: 10 }}>
        <Stack spacing={2.5} sx={{ px: { lg: 30, md: 20, sm: 15, xs: 3 }, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            We're changing the way hostel agents run their business
          </Typography>
          <Typography variant="body1" sx={{ px: { lg: 10, sm: 5 } }}>
            Grow faster with a website that helps you convert more customers.
          </Typography>
          <Stack
            direction={{ sm: 'row', xs: 'column' }}
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Button size="large" component={RouterLink} to={PATH_PAGE.hostels} variant="contained">
              Visit listings
            </Button>
            <Button size="large" component={RouterLink} to={PATH_AUTH.register} variant="outlined">
              Become an agents
            </Button>
          </Stack>
        </Stack>
      </CustomCard>
    </Container>
  );
}
