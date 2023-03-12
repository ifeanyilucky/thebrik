import { useState, useRef, useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Container, Typography, Button, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_PAGE } from '../../../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  backgroundColor: '#111827',
  color: 'white'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  marginBottom: theme.spacing(10),
  '@media (max-width: 900px)': {
    height: '100%',
    marginBottom: 0,
    textAlign: 'left',
    display: 'inline-flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  }
}));
const RightImage = styled(Grid)(({ theme }) => ({
  backgroundImage: 'url(/static/images/black-woman.jpeg)',
  backgroundOrigin: 'border-box',
  backgroundSize: 'cover',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    height: '460px'
  }
}));

// ----------------------------------------------------------------------

const testimonials = [
  {
    name: 'Johnson',
    id: 0,
    role: '300L Student, LASU',
    text: `I liked that they are contacting you after you booked a room to check all the details. Furthermore, they are answering questions really fast & friendly`
  },
  {
    name: 'Ebisidor',
    id: 1,
    role: '400L Student, LASU',
    text: `Along the booking journey. I am very please. Everything was well arranged & I manage to get a decent hostel for my studies that ticks all the boxes. 😁`
  },
  {
    name: 'Daniel',
    id: 3,
    role: '300L Student, LASU',
    text: `The company provide contact really easily. The team answers fast and the payment is really easy..
    `
  },
  {
    name: 'Feranmi',
    id: 4,
    role: '100L Student, LASU',
    text: `They gave me the best service. Not slowly forcing me to choose the expensive one but the best way to reach the campus. Excellent 🤗.
    `
  },
  {
    name: 'Esther',
    id: 5,
    role: '100L Student, LASU',
    text: `The company provide contact really easily. The team answers fast and the payment is really easy..
    `
  }
];

export default function LandingTestimonial() {
  const [active, setActive] = useState(0);
  const timeoutRef = useRef(null);
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActive((_active) => {
        if (_active === testimonials.length - 1) {
          return 0;
        }
        return _active + 1;
      });
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, 3800);
  }, [active]);
  return (
    <RootStyle>
      <Grid
        container
        spacing={5}
        alignItems="center"
        justifyContent="space-between"
        sx={{
          backgroundColor: '#111827',
          color: 'white',
          backgroundImage: 'url(/static/images/bg.png))'
        }}
      >
        <Grid item md={6}>
          <Container maxWidth="sm">
            <Stack spacing={2} pb={4} sx={{ paddingRight: { sm: 0, md: 5 } }}>
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                TESTIMONIAL
              </Typography>
              <Typography variant="h3">Don't just take our word for it, take theirs</Typography>
              <Typography variant="body1" sx={{ color: 'text.white' }}>
                {testimonials[active].text}
              </Typography>
              <Stack direction="row" spacing={1} py={3}>
                <Box
                  component="span"
                  sx={{
                    width: '2.5rem',
                    height: '0.25rem',
                    bgcolor: '#ffffff21',
                    ...(active === 0 && { bgcolor: '#fff' })
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    width: '2.5rem',
                    height: '0.25rem',
                    bgcolor: '#ffffff21',
                    ...(active === 1 && { bgcolor: '#fff' })
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    width: '2.5rem',
                    height: '0.25rem',
                    bgcolor: '#ffffff21',
                    ...(active === 2 && { bgcolor: '#fff' })
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    width: '2.5rem',
                    height: '0.25rem',
                    bgcolor: '#ffffff21',
                    ...(active === 3 && { bgcolor: '#fff' })
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    width: '2.5rem',
                    height: '0.25rem',
                    bgcolor: '#ffffff21',
                    ...(active === 4 && { bgcolor: '#fff' })
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    width: '2.5rem',
                    height: '0.25rem',
                    bgcolor: '#ffffff21',
                    ...(active === 5 && { bgcolor: '#fff' })
                  }}
                />
              </Stack>
              <Stack spacing={1} marginTop={2}>
                <Typography variant="subtitle1"> {testimonials[active].name} </Typography>
                <Typography variant="overline" textTransform="uppercase">
                  {testimonials[active].role}
                </Typography>
              </Stack>
            </Stack>
          </Container>
        </Grid>
        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{
            backgroundImage: 'url(/static/images/Man-reading.jpg)',
            height: { md: 570, sm: '222px', xs: '200px' },
            backgroundSize: 'cover',
            backgroundPosition: 'right'
          }}
        />
      </Grid>
    </RootStyle>
  );
}
