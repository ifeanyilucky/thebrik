import React from 'react';
import { styled } from '@mui/material/styles';
import Marquee from 'react-fast-marquee';
import { Typography, Container, Grid, Box, Stack } from '@mui/material';
import Iconify from '../../Iconify';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0)
}));

export default function Simplify() {
  const images = [
    '/static/images/prof-2.webp',
    '/static/images/young-african-woman-taking-her-phone.jpg',
    'static/images/lady-with-phone.svg',
    'static/images/happy-woman-talking-phone.jpg',
    'static/images/young-black-man.webp'
  ];
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative', mb: 8 }}>
        <Stack spacing={8}>
          <Box maxWidth="sm">
            <Typography variant="h3" lineHeight="1.5">
              Simplifying hostel hunting for university students
            </Typography>
          </Box>

          <Grid container>
            <Grid item md={6}>
              <Box sx={{ display: 'flex', fleFlow: 'direction', alignItems: 'center', mb: 3 }}>
                <Iconify icon="ooui:cancel" sx={{ width: '20px', color: 'error.main' }} />
                <Typography variant="body1" fontWeight={700} paddingLeft={3}>
                  THE PROBLEM
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body1">
                Hostel hunting is no doubt a drudgery every student wishes to get away from. The
                struggles and troubles faced in this challenge is by no means a small one, students
                are constantly faced with problems of getting scammed, not knowing the right agents
                to deal with and so on.
              </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item md={6}>
              <Box sx={{ display: 'flex', fleFlow: 'direction', alignItems: 'center', mb: 3 }}>
                <Iconify icon="charm:circle-tick" sx={{ width: '20px', color: 'success.main' }} />
                <Typography variant="body1" fontWeight={700} paddingLeft={3}>
                  THE SOLUTION
                </Typography>
              </Box>
            </Grid>
            <Grid item md={6}>
              <Typography variant="body1">
                Thebrik offers the most direct solutions to these problems. Through our accessible
                services, Thebrik makes it safe, easy, convenient and fast for students to get
                hostels of their choices
              </Typography>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      <Marquee gradient={false}>
        <Stack direction="row" sx={{ justifyContent: 'center', alignItems: 'center' }}>
          {images.map((img, index) => (
            <Box
              key={index}
              sx={{
                mx: 2,
                borderRadius: '50px',
                width: { md: '300px', xs: '150px' },
                height: { md: '120px', xs: '150px' },
                overflow: 'hidden'
              }}
            >
              <Box
                component="img"
                src={img}
                alt={index}
                sx={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Box>
          ))}
        </Stack>
      </Marquee>
    </RootStyle>
  );
}
