import { Container, Card, CardContent, Stack, Grid, Box, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 2)
}));

export default function Contact() {
  //   console.log(config);
  return (
    <Container>
      <Card sx={{ backgroundImage: 'url(/static/images/bg.png)', tetAlign: 'center' }}>
        <CardContent>
          <Typography variant="h3">Follow us on social media</Typography>
          {/* <Stack spacing={3}>
                <
          </Stack> */}
        </CardContent>
      </Card>
    </Container>
  );
}
