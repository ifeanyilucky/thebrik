import { Container, Typography, Box, Grid, Stack, Button } from '@mui/material';
import Iconify from '../components/Iconify';
import Page from '../components/Page';

export default function ListYourProperty() {
  const howTo = [
    {
      title: 'Get in touch',
      description: 'Fill out a form or request a call and provide your property details'
    },
    {
      title: 'Schedule an inspection',
      description: `We’ll contact you to arrange an inspection of your property and finalise our agreement`
    },
    {
      title: 'Sign an agreement',
      description: `We’ll send you a service agreement with mutually agreed terms`
    },
    {
      title: 'Earn rental income',
      description: `We’ll list your unit and help you find tenants, once we do, you’ll start earning rental income`
    }
  ];
  return (
    <Page title="List your hostel">
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h2" marginBottom={3}>
            How to list your hostel on Thebrik
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', paddingX: { xs: 1, sm: 10, md: 20 } }}
          >
            Take your hostel from vacant to occupied in four easy steps
          </Typography>
        </Box>
        <Grid container spacing={5}>
          {howTo.map((_, index) => (
            <Grid item md={6} key={index}>
              <Stack spacing={1.5} px={{ md: 4, sm: 2, xs: 2 }}>
                <Box
                  sx={{
                    bgcolor: '#135bfd',
                    color: '#fff',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '18px',
                    justifyContent: 'center'
                  }}
                >
                  <Typography variant="h4">{index + 1}</Typography>
                </Box>
                <Typography variant="h6">{_.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {_.description}
                </Typography>
              </Stack>
            </Grid>
          ))}{' '}
        </Grid>
        <Stack sx={{ marginY: 6 }}>
          <Box sx={{ textAlign: 'center', maxWidth: '508px', margin: '0 auto' }}>
            <Typography variant="h3">Ready to list your hostel now?</Typography>
            <Typography variant="body1" sx={{ my: 1 }}>
              Place a call or email us now to start earning quick rental income on your property
              only on Thebrik
            </Typography>
            <Button variant="contained" size="large">
              Get started
            </Button>
          </Box>
        </Stack>
      </Container>
    </Page>
  );
}
