import {
  CircularProgress,
  Button,
  Typography,
  Container,
  useMediaQuery,
  Dialog,
  Slide,
  IconButton,
  Box,
  Stack,
  Grid,
  Divider
} from '@mui/material';
import React, { forwardRef } from 'react';
import { truncate } from 'lodash';
import { useTheme } from '@mui/styles';
import PropTypes from 'prop-types';
import closeIcon from '@iconify/icons-ic/close';
import Iconify from '../../Iconify';
import { fDateTime } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../Label';

BookingDetails.propTypes = {
  details: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.any
};
export default function BookingDetails({ details, open, setOpen }) {
  const theme = useTheme();
  const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  console.log(details);

  return (
    <>
      <Dialog fullScreen open={open} onClose={() => setOpen(false)}>
        {!details ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              height: '20vh'
            }}
          >
            <CircularProgress size={30} />
          </Box>
        ) : (
          <Container maxWidth="sm">
            <Box sx={{ position: 'absolute', top: 1, right: 1 }}>
              <IconButton onClick={() => setOpen(false)}>
                <Iconify icon={closeIcon} />
              </IconButton>
            </Box>
            <Stack spacing={3} mt={3}>
              <Stack>
                <Typography variant="h5">Booking details</Typography>
                <Typography variant="body2">Here's a quick overview of this booking</Typography>
              </Stack>
              <Box>
                <Label
                  variant="ghost"
                  color={
                    (details?.status === 'Pending' && 'warning') ||
                    (details?.status === 'Completed' && 'success')
                  }
                >
                  {details?.status}
                </Label>
              </Box>
              <Grid container rowSpacing={3}>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant="overline">Hostel name</Typography>
                  <Typography variant="body2">
                    {truncate(details?.hostel?.name, { length: 18 })}
                  </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant="overline">Area</Typography>
                  <Typography variant="body2">{details?.hostel?.area}</Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                  <Typography variant="overline">Booking date</Typography>
                  <Typography variant="body2">
                    {details?.date && fDateTime(details?.date)}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {/* PRICE BREAK DOWN BELOW */}
              <Stack spacing={2}>
                <Typography variant="subtitle1">Price Breakdown</Typography>
                <Grid container rowSpacing={2}>
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="overline">RENT</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {details?.hostel?.prices?.price && fCurrency(details?.hostel?.prices?.price)}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="overline">Agency Fee</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {details?.hostel?.prices?.agencyFee &&
                        fCurrency(details?.hostel?.prices?.agencyFee)}
                    </Typography>
                  </Grid>
                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="overline">Agreement & Comm. Fee</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {details?.hostel?.prices?.agreementCommissionFee &&
                        fCurrency(details?.hostel?.prices?.agreementCommissionFee)}
                    </Typography>
                  </Grid>
                  {details?.hostel?.prices?.cautionFee !== 0 && (
                    <Grid item md={6} sm={6} xs={6}>
                      <Typography variant="overline">Caution fee</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {details?.hostel?.prices?.cautionFee &&
                          fCurrency(details?.hostel?.prices?.cautionFee)}
                      </Typography>
                    </Grid>
                  )}

                  <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="overline">Service charge</Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {details?.hostel?.prices?.serviceCharge &&
                        fCurrency(details?.hostel?.prices?.serviceCharge)}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack>
                <Typography variant="subtitle1" textTransform="uppercase">
                  Total
                </Typography>
                <Typography variant="subtitle1">
                  {details?.hostel?.prices?.totalCost &&
                    fCurrency(details?.hostel?.prices?.totalCost)}
                </Typography>
              </Stack>
            </Stack>
          </Container>
        )}
      </Dialog>
    </>
  );
}
