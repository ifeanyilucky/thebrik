import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import flashFill from '@iconify/icons-eva/flash-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import {
  Button,
  Container,
  Typography,
  Stack,
  Grid,
  AvatarGroup,
  Avatar,
  Box,
  TextField,
  InputAdornment
} from '@mui/material';
import LandingHeroImage from './LandingHeroImage';
import Iconify from '../../Iconify';
import { MHidden } from '../../@material-extend';
// routes
import { PATH_PAGE } from '../../../routes/paths';
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
  }
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
    height: '100%',
    marginBottom: 0,
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));

// ----------------------------------------------------------------------

export default function LandingHero() {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();
  const searchHandler = (e) => {
    if (location) navigate(`${PATH_PAGE.hostels}?location=${location}`);
  };
  return (
    <>
      <RootStyle>
        <Container>
          <Grid
            container
            spacing={3}
            alignItems="center"
            direction="row"
            justifyContent="space-between"
          >
            <Grid item md={6} sm={12}>
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
                {/* <Stack direction="row" spacing={1} sx={{ width: '100%', margin: '0 0 15px' }}>
                  <TextField
                    fullWidth
                    label="Enter a location"
                    sx={{ paddingRight: 0, position: 'relative' }}
                    paddingRight="0"
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                    name="location"
                    onKeyDown={searchHandler}
                    InputProps={{
                      endAdornment: (
                        <Button
                          size="large"
                          variant="contained"
                          sx={{ position: 'absolute', right: '4px' }}
                          endIcon={<Iconify icon="cil:arrow-right" />}
                          onClick={searchHandler}
                          onKeyDown={searchHandler}
                        >
                          Search
                        </Button>
                      ),
                      startAdornment: (
                        <InputAdornment position="start">
                          <Iconify icon="akar-icons:search" sx={{ height: 20, width: 20 }} />
                        </InputAdornment>
                      )
                    }}
                  />
                </Stack> */}
              </ContentStyle>
            </Grid>

            <Grid item md={6} sm={12} sx={{ position: 'relative', marginTop: 4 }}>
              <LandingHeroImage />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
}
