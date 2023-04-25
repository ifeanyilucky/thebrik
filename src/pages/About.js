import React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Container, Stack, Grid, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Page from '../components/Page';
import { PATH_PAGE } from '../routes/paths';
import Iconify from '../components/Iconify';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0)
}));

const whyItems = [
  {
    title: 'Swift rental process',
    icon: 'bi:house-check-fill'
  },
  {
    title: 'Free inspection',
    icon: 'heroicons:calendar-days-20-solid'
  },
  {
    title: 'Best-market pricing',
    icon: 'icon-park-solid:market-analysis'
  },
  {
    title: 'Maximum security',
    icon: 'material-symbols:security'
  },
  {
    title: 'Flexible payment',
    icon: 'bi:credit-card'
  },
  {
    title: 'No extra charges',
    icon: 'mdi:eye-off-outline'
  }
];

function About() {
  return (
    <>
      <Page title="About us">
        <Container maxWidth="xl">
          <Grid container sx={{ justifyContent: 'space-between', alignItems: 'center', py: 8 }}>
            <Grid item md={7}>
              <Box maxWidth="md" sx={{ px: { sm: 2, md: 10 } }}>
                <Typography variant="overline">Solving a common problem.</Typography>
                <Typography variant="h2">Bringing your hostel closer to you.</Typography>{' '}
                {/* <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary'
                  }}
                >
                  Thebrik exists because hostel affordability needs to be addressed today.
                </Typography> */}
              </Box>
            </Grid>
          </Grid>
        </Container>
        <Box
          sx={{
            height: { sm: 'auto', md: '500px' },
            width: '100%',

            overflow: 'hidden'
          }}
        >
          <Box
            component="img"
            src="/static/images/hero.bg-about.jpeg"
            alt="hero-img"
            sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
          />
        </Box>
        <RootStyle>
          <Container>
            <Grid container spacing={5} alignItems="center">
              <Grid item md={8} xs={12} sm={12}>
                <Typography variant="h2" />
              </Grid>
              <Grid item md={8} xs={12} sm={12}>
                <Stack spacing={4}>
                  <Typography variant="overline" sx={{ color: 'primary.main' }}>
                    About us
                  </Typography>
                  <Typography variant="body1">
                    Thebrik was founded for one simple reason: To help students secure their off
                    campus hostel and a perfect place to live. We understand the challenges and the
                    excitement of looking for a new hostel—and we make it as easy and safe as
                    possible for every student. Since 2021, Thebrik has been fulfilling this reason,
                    the innovation of making our services digital will make our works more effective
                    and will further ease students of the challenges and stress of finding hostels.
                    {/* and we've already helped a lot of students find their perfect hostel.  */}
                    We understand the hassles in getting accommodation as a student that ticks all
                    the right boxes, and we share in your frustrations because we’ve been there too.
                    That’s why we took it on ourselves to offer the best way to get accommodation in
                    the best area for the best price—just for you!
                  </Typography>
                </Stack>
              </Grid>
            </Grid>

            <Grid py={8} sx={{ width: 1 }} container spacing={4} justifyContent="space-between">
              <Grid item md="3">
                <Typography variant="h2">50+</Typography>
                <Typography variant="overline">Students since inception</Typography>
              </Grid>

              <Grid item md="3">
                <Typography variant="h2">10+</Typography>
                <Typography variant="overline">Agents since DEC 2022</Typography>
              </Grid>
              <Grid item md="3">
                <Typography variant="h2">30+</Typography>
                <Typography variant="overline">Listings since DEC 2022</Typography>
              </Grid>
              {/* <Grid item md="3">
                <Typography variant="h2"> &#8358; 5m+</Typography>
                <Typography variant="overline">Payment processed</Typography>
              </Grid> */}
            </Grid>
          </Container>
        </RootStyle>

        <RootStyle style={{ backgroundColor: '#000' }}>
          <Container>
            <Grid
              container
              spacing={{ md: 8, xs: 2 }}
              justifyContent="space-between"
              verticalAlign="middle"
            >
              <Grid item md={5}>
                <Typography variant="overline" color="#fff">
                  Why Thebrik
                </Typography>
                <Typography variant="h1" color="#fff">
                  We're here for you
                </Typography>
                <Typography sx={{ my: 2 }} variant="body1" color="#fff">
                  We are building the most convenient way for the modern day Nigeria students to get
                  their suitable hostel. Our customers are at the center of everything we do, and we
                  are obsessed with creating a pleasant experience throughout their entire journey.
                </Typography>
                <Box mt={5}>
                  <RouterLink to={PATH_PAGE.hostels}>
                    <Button variant="contained" color="secondary" size="large">
                      Get started
                    </Button>
                  </RouterLink>
                </Box>
              </Grid>
              <Grid item md={7}>
                <Grid container spacing={5}>
                  {whyItems.map((item) => (
                    <Grid md={6} sm={6} xs={6} item key={item.title}>
                      <Stack spacing={2}>
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
                          <Iconify sx={{ color: '#fff' }} fontSize="20px" color icon={item.icon} />
                        </Box>
                        <Typography variant="body1" color="#fff">
                          {item.title}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
        <RootStyle>
          <Container>
            <Grid
              container
              spacing={{ md: 8, xs: 2 }}
              justifyContent="space-between"
              verticalAlign="middle"
              alignItems="center"
            >
              <Grid item md={5}>
                <Typography variant="h1">Our mission</Typography>
                <Typography sx={{ my: 2 }} variant="body1">
                  To be the first choice for student accommodation, where student can rent their
                  ideal hostel through a tech-enabled, simple & trustworthy platform that handles
                  the entire student journey. Our dream is to make renting as simple and fast as
                  possible by providing a hassle-free and flexible housing solution. We work to
                  teleport student into their preferred hostels anywhere, We connect with them. We
                  bring the reality to them.
                </Typography>
              </Grid>
              <Grid item md={6}>
                <Box component="img" src="/static/images/customer-overlap.svg" />
              </Grid>
            </Grid>
          </Container>
        </RootStyle>
      </Page>
    </>
  );
}

export default About;
