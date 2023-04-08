import React from 'react';
import * as Yup from 'yup';
import {
  Container,
  Typography,
  Stack,
  TextField,
  MenuItem,
  Divider,
  Box,
  InputAdornment
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik, FormikProvider, Form } from 'formik';
import toast from 'react-hot-toast';
import Page from '../../components/Page';
import { LandingFAQ } from '../../components/_external-pages/landing';
import * as api from '../../utils/axios';

function SendRequest() {
  const formik = useFormik({
    initialValues: {
      preferredApartment: '',
      minimumBudget: '',
      maximumBudget: '',
      location: '',
      status: '',
      gender: '',
      fullName: '',
      tel: '',
      email: ''
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values);
      setSubmitting(true);
      try {
        const { data } = await api.roommateRequest(values);
        toast.success(data?.msg);
        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        toast.error('Failed to send, try again!');
      }
    }
  });

  const status = [
    'Incoming student',
    '100L',
    '200L',
    '300L',
    '400L',
    'Final year',
    'Not a student'
  ];
  const { getFieldProps, isSubmitting, handleSubmit } = formik;

  return (
    <Page title="Special request">
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Typography variant="h2" marginBottom={3}>
            Request a roomie
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', paddingX: { xs: 1, sm: 10, md: 20 } }}
          >
            Please complete the form below with the details of your request and we will get back to
            you as soon as possible
          </Typography>
        </Box>

        <Stack spacing={2} sx={{ px: { lg: 15, md: 10, sm: 0, xs: 0 }, textAlign: 'center' }}>
          <FormikProvider value={formik}>
            <Form onSubmit={handleSubmit}>
              <Stack spacing={3} sx={{ textAlign: 'left' }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Kind of preferred apartment"
                    type="text"
                    rows={6}
                    multiline
                    {...getFieldProps('preferredApartment')}
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
                    label="Gender"
                    fullWidth
                    {...getFieldProps('gender')}
                    select
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </TextField>
                  <TextField
                    type="text"
                    label="Student status"
                    {...getFieldProps('status')}
                    fullWidth
                    select
                  >
                    {status.map((s, index) => (
                      <MenuItem key={index} value={s}>
                        {s}
                      </MenuItem>
                    ))}
                  </TextField>
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
      </Container>
      <LandingFAQ />
    </Page>
  );
}

export default SendRequest;
