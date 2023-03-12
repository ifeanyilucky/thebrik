import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Container, Stack, Grid, Box } from '@mui/material';
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import { AgentFaqList } from '../components/FaqsList';

const SectionStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0)
  }
}));
const HeroImageStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '1rem',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center'
  }
}));

const howTo = [
  {
    title: 'Register an account',
    description: 'Register an account by clicking on the sign up button at the top.',
    icon: 'heroicons:user-group-solid',
    iconColor: '#135bfd'
  },
  {
    title: 'List your hostel',
    description: 'Fill all required information and upload your hostel for verification.',
    icon: 'mdi:list-box',
    iconColor: '#135bfd'
  },
  {
    title: 'Start earning',
    description: 'Sit back and let Thebrik do the work and earn you money.',
    icon: 'fluent:receipt-money-20-filled',
    iconColor: '#135bfd'
  }
];

function WorkWithUs() {
  return (
    <>
      <Page title="Become an agent on Thebrik">
        <SectionStyle>
          <Container>
            <Box>
              <Grid container spacing={5}>
                <Grid item md={7} sm={12}>
                  <Grid columns={{ xs: 7, sm: 7, md: 7 }} container spacing={2}>
                    <Grid item md={7} sm={6}>
                      <Typography variant="h1">
                        Become our agent and start &nbsp;
                        <Box
                          component="span"
                          variant="inherit"
                          fontWeight="700"
                          color="primary.main"
                        >
                          earning
                        </Box>
                        &nbsp; now
                      </Typography>
                    </Grid>
                    <Grid item md={4}>
                      <Typography variant="body1">
                        With access to our network of thousands of students and working
                        professionals, Thebrik is the easiest way to generate income on your rental
                        property.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item md={5} sm={12}>
                  <HeroImageStyle
                    component="img"
                    src="https://res.cloudinary.com/thebrick-realty/image/upload/v1657198148/thebrick.com.ng/assets/elderly-man_o1612y.webp"
                    alt="elderly-man"
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </SectionStyle>
        <SectionStyle>
          <Container sx={{ py: 10 }}>
            <Stack>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid sx={{ paddingRight: { md: 15 } }} pb={5} item md={6}>
                  <Typography variant="h3" sx={{ mb: 3 }}>
                    Thebrik finds you the best tenants, faster
                  </Typography>
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="h6">High occupancy</Typography>
                      <Typography variant="body2">
                        With thousands of students in our network; we’re able to get your property
                        occupied three times faster than the traditional method being used.
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="h6">Vetted students</Typography>
                      <Typography variant="body2">
                        We only admit verified tenants into your property. You are guaranteed the
                        peace of mind that your property is being used responsibly.
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h6">Flexible solution</Typography>
                      <Typography variant="body2">
                        Whether you have a room for single students, a block of hostels or spare
                        room, we have a solution that works for you.
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
                <Grid item md={6} mx="auto">
                  <HeroImageStyle
                    sx={{
                      position: 'relative',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Box
                      component="img"
                      src="/static/images/happy-young-agent.jpg"
                      sx={{ borderRadius: 1.4, margin: '0 auto' }}
                    />
                  </HeroImageStyle>
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </SectionStyle>
        <SectionStyle>
          <Container>
            <Stack spacing={2} pb={5} textAlign="center">
              <Typography variant="h3">If you don’t earn, we don’t too.</Typography>
              <Typography variant="body1">
                So sit back & relax, while we take care of your property.
              </Typography>
            </Stack>
            <Grid container spacing={5}>
              {howTo.map((_) => (
                <Grid item md={4} key={_.id}>
                  <Stack spacing={1.5} px={{ md: 4, sm: 2, xs: 2 }}>
                    <Box
                      sx={{
                        bgcolor: _.iconColor,
                        width: '50px',
                        height: '50px',
                        display: 'flex',
                        alignItems: 'center',
                        borderRadius: '18px',
                        justifyContent: 'center'
                      }}
                    >
                      <Iconify sx={{ color: 'white' }} fontSize="20px" color icon={_.icon} />
                    </Box>
                    <Typography variant="h6">{_.title}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.primary' }}>
                      {_.description}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </SectionStyle>
        <SectionStyle>
          <Container>
            <Stack spacing={2} pb={5} textAlign="center">
              <Typography variant="h2">Got a question?</Typography>
              <Typography variant="body1">
                So sit back & relax, while we take care of your property.
              </Typography>
            </Stack>
            <AgentFaqList />
          </Container>
        </SectionStyle>
      </Page>
    </>
  );
}

export default WorkWithUs;
