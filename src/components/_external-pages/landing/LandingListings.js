import { Container, Typography, Grid, Stack, Button, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/styles';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Lazy } from 'swiper';
import { HostelCard } from '../../hostel';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/lazy/lazy.min.css';
import { PATH_PAGE } from '../../../routes/paths';

const RootStyle = styled('div')(({ theme }) => ({
  padding: '5rem 0'
}));

export default function LandingListings({ hostels, loading }) {
  console.log(hostels);
  return (
    <RootStyle>
      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        <Grid spacing={1} alignItems="center">
          <Grid item xs={12} md={7} sx={{ position: 'relative', mx: 'auto', mb: { sm: 3, xs: 3 } }}>
            <Stack spacing={2} sx={{ textAlign: 'center' }}>
              <Typography variant="h3">Explore amazing hostels on Thebrik</Typography>
              <Typography variant="body1" />
            </Stack>
          </Grid>
          <Grid item sx={{ width: '100%' }}>
            <Box container spacing={3}>
              <Swiper
                style={{
                  '--swiper-navigation-color': '#000',
                  '--swiper-pagination-color': '#000'
                }}
                pagination={{
                  type: 'bullets'
                }}
                lazy
                modules={[Pagination, Navigation, Lazy]}
                className="mySwiper"
                slidesPerView={4}
                spaceBetween={20}
                breakpoints={{
                  1024: {
                    slidesPerView: 3
                  },
                  769: {
                    slidesPerView: 2
                  },
                  320: {
                    slidesPerView: 1
                  }
                }}
              >
                {loading
                  ? [...Array(12)].map((_, index) => (
                      <Box key={index}>
                        <Skeleton
                          variant="rectangular"
                          width="100%"
                          sx={{ paddingTop: '115%', borderRadius: 2 }}
                        />
                      </Box>
                    ))
                  : hostels.map((hostel) => (
                      <SwiperSlide key={hostel._id}>
                        <Box marginBottom={5}>
                          <HostelCard hostel={hostel} />
                        </Box>
                      </SwiperSlide>
                    ))}
              </Swiper>
            </Box>
            <Box marginTop={5} textAlign="center">
              <Button
                size="large"
                component={RouterLink}
                to={PATH_PAGE.hostels}
                variant="outlined"
                color="inherit"
              >
                Explore now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

LandingListings.propTypes = {
  loading: PropTypes.bool,
  hostels: PropTypes.arrayOf(PropTypes.object)
};
