import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Box, Grid, Divider, Skeleton, Container, Typography, Stack } from '@mui/material';

// react share
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon
} from 'react-share';
// import { getProduct } from '../../redux/slices/product';
// routes
import { PATH_PAGE } from '../routes/paths';
// hooks
import { useDispatch, useSelector } from '../redux/store';
// components
import Page from '../components/Page';
import Markdown from '../components/Markdown';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';
import { HostelDetailsSummary } from '../components/hostel-details';

import Masonry from '../components/masonry';
import Amenity from '../components/Amenity';
import { useAuth } from '../hooks/useAuth';
import { getHostel } from '../redux/slices/hostels';
import { useAnalyticEventTracker } from '../hooks/useAnalyticEventTracker';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} lg={7}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      </Grid>
      <Grid item xs={12} md={6} lg={5}>
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" height={240} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
    </Grid>
  </Container>
);

export default function HostelDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getHostel(id));
  }, [id]);

  // useEffect(() => {
  //   dispatch(getHostels());
  // }, [dispatch]);

  const { hostel, isLoading } = useSelector((state) => state.hostel);

  // const filterOutCurrent = data.filter(({ _id }) => _id !== hostel?._id);
  // const nearbyHostels = filterOutCurrent.filter(({ area }) => area === hostel?.area);

  const title = `${hostel?.name} | Thebrik.co`;
  const url = window.location.href;
  const iconSize = 32;
  const gaEventTracker = useAnalyticEventTracker('Social share');
  if (isLoading && !hostel) {
    return SkeletonLoad;
  }

  return (
    <Page title={(hostel && `${hostel?.name}`) || 'Hostel'}>
      {hostel && (
        <>
          <Container maxWidth="lg">
            <Stack
              justifyContent="space-between"
              alignItems={{ sm: 'start', xs: 'start', md: 'center' }}
              direction={{ xs: 'column', sm: 'column', md: 'row' }}
            >
              <HeaderBreadcrumbs
                heading={hostel?.name}
                links={[
                  {
                    name: 'Hostels',
                    href: PATH_PAGE.hostels
                  },
                  { name: sentenceCase(hostel?.name) }
                ]}
              />

              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                <Typography variant="body1">Share:</Typography>
                <TwitterShareButton
                  onClick={() => gaEventTracker(`shared ${url}`, 'twitter')}
                  url={url}
                  title={title}
                >
                  <TwitterIcon size={iconSize} round />
                </TwitterShareButton>
                <FacebookShareButton
                  onClick={() => gaEventTracker(`shared ${url}`, 'facebook')}
                  url={url}
                  quote={title}
                  className="share-button"
                >
                  <FacebookIcon size={iconSize} round />
                </FacebookShareButton>
                <WhatsappShareButton
                  onClick={() => gaEventTracker(`shared ${url}`, 'whatsapp')}
                  url={url}
                  className="share-button"
                >
                  <WhatsappIcon size={iconSize} round />
                </WhatsappShareButton>
                <LinkedinShareButton
                  onClick={() => gaEventTracker(`shared ${url}`, 'linkedIn')}
                  url={url}
                  title={title}
                  className="share-button"
                >
                  <LinkedinIcon size={iconSize} round />
                </LinkedinShareButton>

                <TelegramShareButton
                  onClick={() => gaEventTracker(`shared ${url}`, 'telegram')}
                  url={url}
                  title={title}
                  className="share-button"
                >
                  <TelegramIcon size={iconSize} round />
                </TelegramShareButton>
              </Stack>
            </Stack>
          </Container>
          <Masonry hostel={hostel} />
          <Container maxWidth="lg">
            <Grid
              container
              sx={{
                sm: { paddingTop: 3 },
                md: { paddingTop: 3 },
                xs: { flexFlow: 'row-reverse' }
              }}
            >
              <Grid item xs={12} md={8} sx={{ paddingRight: { md: 3 } }} lg={8}>
                <Box sx={{ py: 3 }}>
                  <Typography variant="h4">{hostel?.name}</Typography>
                  <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
                    <LocationIcon />
                    <Typography variant="body2" sx={{ textTransform: 'uppercase', py: 1 }}>
                      {`${hostel?.area}, ${hostel.state} `}
                    </Typography>
                  </Stack>
                  <Box display="flex">
                    <Typography variant="body2">
                      {`${hostel?.bedrooms} Bedroom(s)`} &bull;
                    </Typography>

                    <Typography variant="body2">
                      &nbsp; {`${hostel?.bathrooms} Bathroom(s)`} &bull;
                    </Typography>

                    <Typography variant="body2">&nbsp; {`${hostel?.toilets} Toilet(s)`}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <Box sx={{ py: 2 }}>
                  <Markdown children={hostel.description} />
                </Box>

                <Grid container sx={{ my: 8 }}>
                  <Stack>
                    <Typography variant="h6" mb={3}>
                      AMENITIES
                    </Typography>
                    <Stack>
                      <Amenity amenities={hostel?.amenities} />
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <HostelDetailsSummary hostel={hostel} user={user} />
              </Grid>
            </Grid>
          </Container>
          {/* <Stack>
              <GoogleMapReact bootstrapURLKeys={} zoom=""  />
            </Stack> */}

          {/* <Container>
            {nearbyHostels.length ? (
              <Stack sx={{ marginTop: 2 }}>
                <Typography variant="h5">Nearby hostel</Typography>
                <Grid direction="row" container spacing={2.5} marginTop={3}>
                  {nearbyHostels.slice(0, 3).map((hostel) => (
                    <Grid item md={4} sm={6} xs={12} key={hostel._id}>
                      <HostelCard hostel={hostel} id={hostel._id} />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            ) : null}
          </Container> */}
        </>
      )}
    </Page>
  );
}

const LocationIcon = () => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="s-mr-1"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2702 7.5583C10.2702 6.5799 9.47739 5.78711 8.49971 5.78711C7.52131 5.78711 6.72852 6.5799 6.72852 7.5583C6.72852 8.53598 7.52131 9.32878 8.49971 9.32878C9.47739 9.32878 10.2702 8.53598 10.2702 7.5583Z"
      stroke="#4B4F63"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{' '}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.49965 14.9961C7.65073 14.9961 3.1875 11.3824 3.1875 7.60342C3.1875 4.64496 5.56545 2.24609 8.49965 2.24609C11.4339 2.24609 13.8125 4.64496 13.8125 7.60342C13.8125 11.3824 9.34857 14.9961 8.49965 14.9961Z"
      stroke="#4B4F63"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
