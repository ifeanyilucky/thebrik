import React, { useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import Page from '../components/Page';
import {
  Simplify,
  LandingFAQ,
  LandingHero,
  LandingSteps,
  LandingBudget,
  LandingWhyThebrik,
  LandingTestimonial,
  LandingListings
} from '../components/_external-pages/landing';
import { useDispatch, useSelector } from '../redux/store';
import { getHostels } from '../redux/slices/hostels';

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHostels());
  }, [dispatch]);

  const {
    hostels: { data },
    isLoading
  } = useSelector((state) => state.hostel);
  console.log(data);
  return (
    <Page title="Renting a hostel just got easier.">
      <LandingHero />
      <ContentStyle>
        <Simplify />
        <LandingSteps />
        <LandingWhyThebrik />
        <LandingBudget />
        <LandingListings hostels={data} loading={isLoading} />
        <LandingTestimonial />
        {/* <LandingPartner /> */}

        <LandingFAQ />
      </ContentStyle>
    </Page>
  );
}
