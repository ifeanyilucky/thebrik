import React from 'react';
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
  LandingPartner
} from '../components/_external-pages/landing';

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

export default function Home() {
  return (
    <Page title="Renting a hostel just got easier.">
      <LandingHero />
      <ContentStyle>
        <Simplify />
        <LandingSteps />
        <LandingWhyThebrik />
        <LandingBudget />
        {/* <LandingListings /> */}
        <LandingTestimonial />
        <LandingPartner />

        <LandingFAQ />
      </ContentStyle>
    </Page>
  );
}
