import { Container, Typography, Grid, Stack, Button, Box } from '@mui/material';
import { styled } from '@mui/styles';

const RootStyle = styled('div')(({ theme }) => ({
  padding: '5rem 0'
}));

export default function LandingListings() {
  return (
    <RootStyle>
      <Container>
        <Typography variant="h3">Make money of your hostel, as graduate</Typography>
        <Typography variant="body1">
          You can make money off your hostel when you list it on our platform for rent
        </Typography>
      </Container>
    </RootStyle>
  );
}
