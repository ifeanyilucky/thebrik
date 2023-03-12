import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Skeleton, Grid, Box, Button, Stack, Typography } from '@mui/material';
import HostelCard from './HostelCard';
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

HostelList.propTypes = {
  hostels: PropTypes.array.isRequired,
  isLoad: PropTypes.bool
};

export default function HostelList({ hostels, isLoad, ...other }) {
  if (!isLoad && !hostels.length) {
    return (
      <Grid item md={6} mx="auto">
        <Stack spacing={3} textAlign="center" mx="auto">
          <Typography variant="h3">Could not find anymore hostels</Typography>
          <Typography variant="body2">
            Apply filter to see other hostels, if you do not find any hostel you like currently
            listed on the site please click on the button below to let us know what your preferences
            are
          </Typography>
          <Stack textAlign="center">
            <Box width="140px" mx="auto">
              <Button
                variant="contained"
                component={RouterLink}
                size="medium"
                to={PATH_PAGE.specialRequest}
                fullWidth
              >
                Tell us
              </Button>
            </Box>
          </Stack>
        </Stack>
      </Grid>
    );
  }
  return (
    <Grid container spacing={3} {...other}>
      {isLoad
        ? [...Array(12)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton
                variant="rectangular"
                width="100%"
                sx={{ paddingTop: '115%', borderRadius: 2 }}
              />
            </Grid>
          ))
        : hostels.map((hostel) => (
            <Grid key={hostel._id} item xs={12} sm={12} md={4}>
              <HostelCard hostel={hostel} />
            </Grid>
          ))}
    </Grid>
  );
}
