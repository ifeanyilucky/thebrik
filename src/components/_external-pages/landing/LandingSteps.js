import React from 'react';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  Grid,
  Card,
  Container,
  Typography,
  useMediaQuery,
  Button,
  Stack
} from '@mui/material';
import _ from 'lodash';
import { varFadeInUp, MotionInView } from '../../animate';
import Iconify from '../../Iconify';
// ----------------------------------------------------------------------

const CARDS = [
  {
    icon: 'icon-park-solid:find',
    title: 'Find your hostel',
    value: 0,
    description:
      'We offer flexible options, designed around your needs. Browse hostels by where you want to live'
  },
  {
    icon: 'icon-park-solid:inspection',
    title: 'Book an inspection',
    value: 1,
    description:
      'You can easily book a tour of your prospective hostel online. Our neighbourhood reps are readily available to show you around at no cost to you.'
  },
  {
    icon: 'ri:secure-payment-fill',
    title: 'Pay securely & move in',
    value: 2,
    description:
      'Once you pay the initial payments, the place is yours. We protect your money and transfer it to the landlord only 24 hours after you’ve moved-in.'
  }
];
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(4)
  }
}));

// ----------------------------------------------------------------------

export default function LandingSteps() {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const TabStyle = styled(Stack)(({ theme }) => ({
    direction: 'column',
    cursor: 'pointer',
    paddingLeft: '1rem'
  }));

  const TabContent = ({ children, value, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

  return (
    <RootStyle>
      <Container maxWidth="lg">
        <Box sx={{ mb: { xs: 8, md: 8 } }}>
          <Typography variant="h3" sx={{ textAlign: 'center' }}>
            How to get started
          </Typography>

          <Typography
            component="p"
            variant="overline"
            sx={{ mt: 2, color: 'text.secondary', textAlign: 'center' }}
          >
            It's a pretty straightforward process, really.
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="space-between" alignItems="center">
          <Grid item md={6}>
            <Stack direction="column">
              <TabStyle
                className={value === 0 && 'active-tab'}
                onClick={() => handleChange(0)}
                py={2}
                spacing={1.4}
              >
                <Typography variant="h6">Find your hostel</Typography>
                <Typography variant="body1">
                  Check through our flexible options to pick any hostel that matches your taste.
                </Typography>
              </TabStyle>
              <TabStyle
                className={value === 1 && 'active-tab'}
                onClick={() => handleChange(1)}
                py={2}
                spacing={1.4}
              >
                <Typography variant="h6">Book an inspection</Typography>
                <Typography variant="body1">
                  Book a schedule with us to inspect any hostel of your choice, our representatives
                  are readily available to show you around at no cost at all.
                </Typography>
              </TabStyle>
              <TabStyle
                className={value === 2 && 'active-tab'}
                onClick={() => handleChange(2)}
                py={2}
                spacing={1.4}
              >
                <Typography variant="h6">Pay securely & move in</Typography>
                <Typography variant="body1">
                  Proceed to make your full payments of your booked hostel with zero delays and
                  become the official owner of your hostel in 24 hours.
                </Typography>
              </TabStyle>
            </Stack>
          </Grid>

          <Grid item md={6}>
            <TabContent value={0} index={value}>
              <MotionInView variants={varFadeInUp}>
                <Box component="img" src="static/images/search-hostel.svg" sx={{ width: '100%' }} />
              </MotionInView>
            </TabContent>
            <TabContent value={1} index={value}>
              <MotionInView variants={varFadeInUp}>
                <Box
                  component="img"
                  src="static/images/hostel-inspect.svg"
                  sx={{ width: '100%' }}
                />
              </MotionInView>
            </TabContent>
            <TabContent value={2} index={value}>
              <MotionInView variants={varFadeInUp}>
                <Box component="img" src="static/images/hostel-pay.svg" sx={{ width: '100%' }} />
              </MotionInView>
            </TabContent>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
