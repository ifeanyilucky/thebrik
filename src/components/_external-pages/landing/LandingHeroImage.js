import { useState } from 'react';
import { Box, Stack, Grow, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, EffectCoverflow } from 'swiper';
import 'swiper/modules/effect-coverflow/effect-coverflow.min.css';
import Logo from '../../Logo';
import { varFadeInUp, MotionInView } from '../../animate';

export default function LandingHeroImage() {
  // const [current, setCurrent] = useState(0);
  // const images = [
  //   '/static/images/bedroom.jpg',
  //   '/static/images/young-african-woman-taking-her-phone.jpg',
  //   '/static/images/bedroom.jpg',
  //   '/static/images/space-details-1.jpg',
  //   '/static/images/young-african-woman-taking-her-phone.jpg'
  // ];
  return (
    <ImageWrapper>
      <Box component="img" src="/static/images/hero.png" alt="hero-image" sx={{ marginX: 'auto' }} />
    </ImageWrapper>
  );
}

const ImageWrapper = styled.div`
  .swiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 300px;
    height: 300px;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
  }
`;
