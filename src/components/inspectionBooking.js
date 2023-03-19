import React, { useState, useEffect } from 'react';
import {
  TextField,
  Stack,
  MenuItem,
  Link,
  Typography,
  Box,
  CircularProgress,
  Divider,
  FormHelperText
} from '@mui/material';
import { Formik, Form } from 'formik';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateTimePicker, LocalizationProvider, LoadingButton } from '@mui/lab';
import { Link as RouterLink, useNavigate, useSearchParams, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import { result, find } from 'lodash';
import * as yup from 'yup';
import { useDispatch, useSelector } from '../redux/store';
import { PATH_PAGE, PATH_AUTH, PATH_DASHBOARD } from '../routes/paths';
import { fCurrency } from '../utils/formatNumber';
import { getBookings, createBooking } from '../redux/slices/renter';
import PriceBreakdown from './payment/price-breakdown';

InspectionBooking.propTypes = {
  user: PropTypes.object,
  hostel: PropTypes.object,
  userInspections: PropTypes.array,
  isLoading: PropTypes.bool
};
export default function InspectionBooking({ user, hostel }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [setToastMsg] = useState('');
  const { firstName, lastName, tel, email } = user || {};
  const {
    prices: { agencyFee, cautionFee, price, agreementCommissionFee, totalCost }
  } = hostel;
  const [redirect] = useSearchParams();
  const redirectLogin = () => {
    navigate(`${PATH_AUTH.login}?redirect=${pathname}`);
  };
  const { pathname } = useLocation();

  const { isLoading, error } = useSelector((state) => state.user);

  const validationSchema = yup.object().shape({
    date: yup.date().nullable()
  });
  const rentFee = price * 0.1;
  const initValues = {
    date: null,
    hostel,
    hostelArea: hostel.area,
    hostelName: hostel.name,
    totalCost
  };
  const feeStyle = {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between'
  };

  // useEffect(()=> {
  //   if()
  // },[])

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '20vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }
  return (
    <Formik
      initialValues={initValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        if (firstName && lastName && tel && email) {
          dispatch(createBooking(values));
        } else {
          alert('update profile information');
          navigate(PATH_DASHBOARD.account);
        }
      }}
      render={({ values, setFieldValue }) => (
        <Form>
          <Stack spacing={2}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                type="text"
                label="Type of inspection"
                onChange={(e) => setFieldValue('type', e.target.value)}
                select
                value={values.inspection_type}
                disabled={!user && true}
                required
              >
                <MenuItem value="physical">Physical</MenuItem>
                <MenuItem value="virtual">Virtual</MenuItem>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <DateTimePicker
                    label="Select date and time"
                    value={values.date}
                    onChange={(value) => setFieldValue('date', value)}
                    renderInput={(params) => <TextField {...params} required />}
                    disabled={!user && true}
                    reduceAnimations
                    clearable
                    disablePast
                  />
                </Stack>
              </LocalizationProvider>{' '}
            </Stack>
            {user ? (
              ''
            ) : (
              <FormHelperText sx={{ textAlign: 'right', color: 'red' }}>
                Please login to book a viewing
              </FormHelperText>
            )}

            <Divider sx={{ borderStyle: 'dashed' }} />
            <PriceBreakdown hostel={hostel} />
            {user ? (
              <LoadingButton
                loading={isLoading}
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                disabled={!!(!values.date || user.role !== 'Member')}
              >
                Book inspection
              </LoadingButton>
            ) : (
              <LoadingButton
                fullWidth
                variant="contained"
                size="large"
                type="submit"
                onClick={redirectLogin}
              >
                Login
              </LoadingButton>
            )}

            <Typography variant="caption" sx={{ alignItems: 'center', textAlign: 'center' }}>
              You won't be charged yet.
            </Typography>
          </Stack>
        </Form>
      )}
    />
  );
}
