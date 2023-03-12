import React from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import { Stack, Box, Grid, Typography } from '@mui/material';
import Iconify from './Iconify';

Amenity.propTypes = {
  amenities: PropTypes.object
};
const amenitiesIcon = {
  tapWater: 'healthicons:running-water-outline',
  tiles: 'arcticons:quicktiles',
  electricity: 'healthicons:electricity',
  parking: 'gis:car',
  fence: 'mdi:fence'
};

export default function Amenity({ amenities }) {
  return (
    <>
      <Grid container spacing={5} direction="row">
        {amenities.runningWater === true && (
          <Grid item md={4} sm={6} xs={6} sx={{ width: '100%' }}>
            <Stack spacing={1.2}>
              <Iconify icon={amenitiesIcon.tapWater} sx={{ fontSize: '40px' }} />
              <Typography variant="body1" color="text.primary" sx={{ width: 'auto' }}>
                Running water
              </Typography>
            </Stack>
          </Grid>
        )}

        {amenities.electricity === true && (
          <Grid item md={4} sm={6} xs={6} sx={{ width: '100%' }}>
            <Stack spacing={1.2}>
              <Iconify icon={amenitiesIcon.electricity} sx={{ width: '40px', height: '40px' }} />
              <Typography variant="body1" color="text.primary" sx={{ width: 'auto' }}>
                Power supply
              </Typography>
            </Stack>
          </Grid>
        )}
        {amenities.tiles === true && (
          <Grid item md={4} sm={6} xs={6} sx={{ width: '100%' }}>
            <Stack spacing={1.2}>
              <Iconify icon={amenitiesIcon.tiles} sx={{ width: '40px', height: '40px' }} />
              <Typography variant="body1" color="text.primary" sx={{ width: 'auto' }}>
                All round tiles
              </Typography>
            </Stack>
          </Grid>
        )}

        <Grid item md={4} sm={6} xs={6} sx={{ width: '100%' }}>
          <Stack spacing={1.2}>
            <Iconify icon={amenitiesIcon.fence} sx={{ width: '40px', height: '40px' }} />
            <Typography variant="body1" color="text.primary" sx={{ width: 'auto' }}>
              Fenced with gate
            </Typography>
          </Stack>
        </Grid>
        {amenities.parking === true && (
          <Grid item md={4} sm={6} xs={6} sx={{ width: '100%' }}>
            <Stack spacing={1.2}>
              <Iconify icon={amenitiesIcon.parking} sx={{ width: '40px', height: '40px' }} />
              <Typography variant="body1" color="text.primary" sx={{ width: 'auto' }}>
                Parking space
              </Typography>
            </Stack>
          </Grid>
        )}
      </Grid>
    </>
  );
}
