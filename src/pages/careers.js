import { Container, Button, Typography, Stack, Box } from '@mui/material';

export default function Careers() {
  return (
    <Container maxWidth="md">
      <Stack spacing={2} sx={{ marginX: 'auto', textAlign: 'center', mt: 3 }}>
        <Typography variant="h2">We’ve got big plans—and they include you!</Typography>
        <Box maxWidth="sm" sx={{ alignSelf: 'center' }}>
          <Typography variant="body1">
            Want to bring your fullest self to work? Passionate about customers and transforming the
            way local agents run their business? We’ve been looking for you.
          </Typography>
        </Box>
        <Box>
          <Button variant="contained" size="large">
            See open roles
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
