import * as React from 'react';
import { Typography, Container, Stack, Link, Box } from '@mui/material';
import FaqsList from '../components/FaqsList';
import Page from '../components/Page';

export default function Faqs() {
  return (
    <Page title="Frequently Asked Questions">
      <Container maxWidth="md">
        <Box className="faq_header">
          <Stack alignItems="center" justifyContent="center" py={6}>
            <img src="static/svg/people-group.svg" alt="people" />
            <Typography variant="h2">FAQs</Typography>
            <Typography variant="h6" padding={3}>
              You have questions, We have answers
            </Typography>
          </Stack>
        </Box>
        <FaqsList />
        <Stack sx={{ textAlign: 'center' }} paddingTop={6} spacing={3}>
          <Typography variant="h4">Still have questions? Shoot.</Typography>
          <Typography variant="body1">
            If you can’t find the answer you are looking for, please don't hesitate to contact us.{' '}
            <br />
            <Link color="inherit" underline="hover" href="mailto:thebrik.co@gmail.com">
              thebrik.co@gmail.com
            </Link>
          </Typography>
        </Stack>
      </Container>
    </Page>
  );
}
