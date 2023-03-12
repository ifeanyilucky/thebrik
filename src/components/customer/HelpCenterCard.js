import { Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { styled } from '@mui/styles';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../Iconify';
import { PATH_PAGE } from '../../routes/paths';

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));
const IconWrapper = styled(Box)({
  background: '#135bfd',
  borderRadius: '50%',
  height: '40px',
  width: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});
export default function HelpCenterCard() {
  return (
    <RootStyle>
      <CardContent>
        <Typography variant="subtitle1">Help centre</Typography>
        <Typography variant="body2" mb={3} mt={1}>
          Need help? Our support team has you covered
        </Typography>

        <Stack spacing={2} sx={{ width: '100%' }}>
          <Box
            component={RouterLink}
            to={PATH_PAGE.faqs}
            sx={{
              borderRadius: 1,
              border: '1px solid #f4f4f4',
              width: '100%',
              textDecoration: 'none',
              color: 'text.primary'
            }}
            py={3}
            px={2}
          >
            <Stack spacing={3} direction="row" alignItems="center">
              <IconWrapper>
                <Iconify icon="fluent:shield-task-20-filled" fontSize="20px" color="white" />
              </IconWrapper>
              <Typography variant="body2" fontWeight="500">
                Read our FAQS
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              borderRadius: 1,
              border: '1px solid #f4f4f4',
              textDecoration: 'none',
              color: 'text.primary'
            }}
            component="a"
            href="mailto:thebrik.co@gmail.com"
            py={3}
            px={2}
          >
            <Stack spacing={3} direction="row" alignItems="center">
              <IconWrapper>
                <Iconify icon="heroicons:envelope-open-20-solid" fontSize="20px" color="white" />
              </IconWrapper>
              <Typography variant="body2" fontWeight="500">
                Contact Thebrik Support
              </Typography>
            </Stack>
          </Box>
          <Box
            sx={{
              borderRadius: 1,
              border: '1px solid #f4f4f4',
              textDecoration: 'none',
              color: 'text.primary'
            }}
            py={3}
            px={2}
          >
            <Stack spacing={3} direction="row" alignItems="center">
              <IconWrapper>
                <Iconify icon="fontisto:bell-alt" fontSize="20px" color="white" />
              </IconWrapper>
              <Typography variant="body2" fontWeight="500">
                Updates from Thebrik
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </CardContent>
    </RootStyle>
  );
}
