import { Container, Card, CardContent, Box, Stack, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Receipt() {
  const { receiptid } = useParams();
  return (
    <Box sx={{ bgcolor: '#efefef', height: '100%', paddingY: 4 }}>
      <Container>
        <Stack sx={{ alignItems: 'center', justifyContent: 'space-around' }}>
          <Box maxWidth="sm" sx={{ width: '100%' }}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Typography variant="h4" mb={3}>
                  Receipt
                </Typography>
                <Typography variant="body1">Date: 3 August, 2023</Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
