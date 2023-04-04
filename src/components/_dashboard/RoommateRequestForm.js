import { useState, useCallback, useEffect } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useFormik, FormikProvider, Form } from 'formik';
import _ from 'lodash';
// material
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Stack,
  Box,
  Divider,
  MenuItem,
  TextField,
  Typography,
  InputAdornment
} from '@mui/material';

export default function RoomateRequestForm() {
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  const phoneRegEx =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const propertySchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    studentStatus: Yup.string().required('Hostel area is required'),
    gender: Yup.number().required('Agency fee is required'),
    phoneNumber: Yup.string()
      .matches(phoneRegEx, 'Phone number is invalid')
      .required('Phone number is required')
      .min(10, 'Phone number is invalid')
      .max(11, 'Phone number is invalid')
  });

  const formik = useFormik({
    initialState: {
      category: '',
      numberOfBed: '',
      minimumBudget: '',
      maximumBudget: '',
      location: '',
      fullName: '',
      tel: '',
      email: '',
      studentStatus: ''
    },
    onSubmit: async (values) => {
      console.log(values);
    },
    validationSchema: propertySchema
  });

  const { getFieldProps, isSubmitting, handleSubmit } = formik;
  const status = [
    'Incoming student',
    '100L',
    '200L',
    '300L',
    '400L',
    'Final year',
    'Not a student'
  ];

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2} sx={{ px: { lg: 15, md: 10, sm: 0, xs: 0 }, textAlign: 'center' }}>
        <FormikProvider value={formik}>
          <Form onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ textAlign: 'left' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField fullWidth {...getFieldProps('category')} label="Category" select>
                  <MenuItem value="For Rent">For Rent</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Number of bed"
                  type="number"
                  {...getFieldProps('numberOfBed')}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  label="Budget (Min.)"
                  {...getFieldProps('minimumBudget')}
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                    type: 'number'
                  }}
                />
                <TextField
                  label="Budget (Max.)"
                  {...getFieldProps('maximumBudget')}
                  fullWidth
                  type="number"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                    type: 'number'
                  }}
                />
              </Stack>
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Typography variant="body2">Provide information on location of hostel</Typography>

              <TextField label="Preferred location" fullWidth {...getFieldProps('location')} />
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Typography variant="body2">Your information</Typography>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField label="Full name" fullWidth {...getFieldProps('fullName')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField type="tel" label="Phone number" {...getFieldProps('tel')} fullWidth />
                <TextField type="email" label="Email" fullWidth {...getFieldProps('email')} />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                  type="text"
                  label="Student status"
                  {...getFieldProps('studentStatus')}
                  fullWidth
                  select
                >
                  {status.map((s, i) => (
                    <MenuItem key={i} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
                {/* <TextField type="email" label="Email" fullWidth {...getFieldProps('email')} /> */}
              </Stack>
              <Box textAlign="center">
                <LoadingButton
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  loading={isSubmitting}
                  color="primary"
                >
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </Form>
        </FormikProvider>
      </Stack>
    </Card>
  );
}
