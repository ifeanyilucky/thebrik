import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Grid, Box } from '@mui/material';
// import LandingHeroImage from './LandingHeroImage';
import HeroSearchbar from './HeroSearchbar';
//

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: theme.spacing(5),
  minHeight: '100%',
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(15),
    // position: 'fixed',
    alignItems: 'center'
  },
  backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.5)), url(/static/images/hero.bg-about.jpeg)`,
  backgroundSize: 'cover'
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  textAlign: 'center',
  color: '#fff',
  justifyContent: 'end',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    height: '100%',
    marginBottom: 0,
    display: 'inline-flex',
    flexDirection: 'column'
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  return (
    <>
      <RootStyle>
        <Container>
          <Grid
            alignItems="center"
            direction="row"
            justifyContent="space-around"
            paddingY={8}
            marginX="auto"
          >
            <Grid
              item
              md={7}
              sx={{ alignSelf: 'center', display: 'flex', justifyContent: 'space-around' }}
              sm={12}
              marginX="auto"
            >
              <ContentStyle>
                <Typography variant="h1">
                  Renting a{' '}
                  <Typography component="span" variant="h1" sx={{ color: 'primary.main' }}>
                    hostel
                  </Typography>{' '}
                  just got easier
                </Typography>
                <Typography variant="body1">
                  Thebrik is the complete hostel rental solution for agents and university students
                  - list a hostel, rent a hostel.
                </Typography>
                <Box sx={{ textAlign: 'left' }}>
                  <HeroSearchbar />
                </Box>
              </ContentStyle>
            </Grid>

            {/* <Grid item md={6} sm={12} sx={{ position: 'relative', marginTop: 4 }}>
              <LandingHeroImage />
            </Grid> */}
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
}
