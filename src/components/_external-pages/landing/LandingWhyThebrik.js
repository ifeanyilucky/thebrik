// material
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Stack, Box } from '@mui/material';
import Iconify from '../../Iconify';
// routes
// import { PATH_PAGE } from '../../../routes/paths';
//
// import { varFadeInUp, MotionInView } from '../../animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    marginBottom: 0
  }
}));

// ----------------------------------------------------------------------

const whyThebrik = [
  {
    title: 'Book inspection',
    text: 'You can easily book a tour of your prospective hostel online. Our neighbourhood reps are readily available to show you around at no cost to you.',
    icon: 'heroicons:calendar-days-20-solid',
    iconColor: '#135bfd',
    id: '01'
  },
  {
    title: 'List & earn',
    text: 'When you join the Thebrik community, not only do you help yourself find apartments easily, you earn when you link us directly to your landlord.',
    icon: 'bi:credit-card',
    iconColor: '#135bfd',
    id: '02'
  },
  {
    title: 'Co-sharing option',
    text: 'Rent a student friendly hostel with your friends. Chose from the hostels around the school axis.',
    icon: 'fa-solid:user',
    iconColor: '#135bfd',
    id: '03'
  },
  {
    title: 'No hidden charges',
    text: 'Our packages are totally transparent and have no hidden/extra charges. With Thebrik you enjoy a "pay once" package.',
    icon: 'mdi:eye-off-outline',
    id: '04',
    iconColor: '#135bfd'
  }
];

export default function LandingWhyThebrik() {
  return (
    <RootStyle>
      <Container>
        <Grid
          container
          spacing={{ md: 8, xs: 2 }}
          justifyContent="space-between"
          verticalAlign="middle"
        >
          <Grid item xs={12} md={5} sx={{ display: 'flex' }}>
            <ContentStyle>
              <Typography variant="h2" sx={{ mb: 3 }}>
                Designed for everyone.
              </Typography>
              <Typography
                sx={{
                  mb: { md: 5, xs: 0 }
                }}
              >
                We do what we can to help you get the best out of getting hostel.
              </Typography>
            </ContentStyle>
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          {whyThebrik.map((_) => (
            <Grid item md={3} key={_.id}>
              <Stack spacing={1.5}>
                <Box
                  sx={{
                    bgcolor: _.iconColor,
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    borderRadius: '18px',
                    justifyContent: 'center'
                  }}
                >
                  <Iconify sx={{ color: 'white' }} fontSize="20px" color icon={_.icon} />
                </Box>
                <Typography variant="h6">{_.title}</Typography>
                <Typography variant="body2" sx={{ color: 'text.primary' }}>
                  {_.text}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </RootStyle>
  );
}
