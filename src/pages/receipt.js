import {
  Container,
  Card,
  CardContent,
  Box,
  Stack,
  Divider,
  Typography,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { fCurrency } from '../utils/formatNumber';
import Logo from '../components/Logo';
import { fDate } from '../utils/formatTime';

export default function Receipt() {
  const { receiptid } = useParams();
  return (
    <Box sx={{ bgcolor: '#efefef', height: '100%', paddingY: 4 }}>
      <Container>
        <Stack sx={{ alignItems: 'center', justifyContent: 'space-around' }}>
          <Box maxWidth="sm" sx={{ width: '100%' }}>
            <Card sx={{ width: '100%' }}>
              <CardContent>
                <Stack
                  direction="row"
                  sx={{ justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Box mb={3}>
                    <Typography variant="h5" mb={1.3}>
                      Receipt
                    </Typography>
                    <Typography variant="overline" color="gray">
                      Date: 3 August, 2023
                    </Typography>
                    <br />
                    <Typography variant="caption" color="gray">
                      id: d345tre-2345rr-23ed2-3e34
                    </Typography>
                  </Box>
                  <Logo />
                </Stack>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Stack my={3} spacing={2}>
                  <Typography variant="h6" color="primary.main">
                    Thank you for using Thebrik
                  </Typography>

                  <Typography variant="body2">
                    If you have any questions, please let us know.
                  </Typography>
                </Stack>
                <TableContainer>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body2">Subsequent fee</Typography>
                        </TableCell>
                        <TableCell padding="none">{fCurrency(40000)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell padding="none">
                          <Typography variant="body2"> Agreement & commission fee</Typography>
                        </TableCell>
                        <TableCell padding="none">{fCurrency(2000)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body2">Agency fee</Typography>
                        </TableCell>
                        <TableCell padding="none">{fCurrency(2000)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell padding="none">Caution fee</TableCell>
                        <TableCell padding="none">{fCurrency(24000)}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Typography variant="body2">Service charge</Typography>
                        </TableCell>
                        <TableCell padding="none">
                          <Typography variant="body2">{fCurrency(24000)}</Typography>
                        </TableCell>
                      </TableRow>
                      <Divider />

                      <TableRow>
                        <TableCell>
                          <Typography variant="subtitle1">Total</Typography>
                        </TableCell>
                        <TableCell padding="none">
                          <Typography variant="subtitle1">{fCurrency(24000)}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
