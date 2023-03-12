import { Typography, Grid, Skeleton, Stack } from '@mui/material';
import { useEffect } from 'react';
import { HostelCard } from '../hostel';
import { useDispatch, useSelector } from '../../redux/store';
import { getHostels } from '../../redux/slices/hostels';

export default function AppListing() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHostels(1));
  }, [dispatch]);
  const {
    hostels: { data },
    isLoading
  } = useSelector((state) => state.hostel);

  return (
    <div>
      <Stack py={3}>
        <Typography variant="h5">Explore Listings</Typography>
        <Typography variant="subtitle2">Search for hostels and hostels you may like</Typography>
      </Stack>
      <Grid container spacing={3}>
        {isLoading && !data.length
          ? [...Array(4)].map((_, index) => (
              <Grid item xs={12} sm={12} md={6} key={index}>
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  sx={{ paddingTop: '115%', borderRadius: 2 }}
                />
              </Grid>
            ))
          : data.slice(0, 3).map((hostel) => (
              <Grid key={hostel._id} item xs={12} sx={{ width: '100%' }} sm={12} md={6}>
                <HostelCard hostel={hostel} />
              </Grid>
            ))}
      </Grid>
    </div>
  );
}
