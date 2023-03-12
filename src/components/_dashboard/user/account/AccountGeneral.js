import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import PropTypes from 'prop-types';
import axios from 'axios';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  Backdrop,
  CircularProgress,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import toast from 'react-hot-toast';
import { alpha, styled } from '@mui/material/styles';
// hooks
import { useAuth } from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';

// ----------------------------------------------------------------------

AccountGeneral.propTypes = {
  account: PropTypes.object
};
export default function AccountGeneral({ account }) {
  const isMountedRef = useIsMountedRef();
  const { updateProfile } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    tel: Yup.number()
      .required('Phone number is required')
      .min(10, 'Phone number is invalid')
      .max(11, 'Phone number is invalid')
  });

  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (account) {
      setProfile(account);
    }
  }, [account]);
  const formik = useFormik({
    initialValues: {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      tel: account.tel,
      address: account.address
    },

    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await updateProfile(values);
        if (isMountedRef.current) {
          setSubmitting(false);
          toast.success('Account details updated successfully!');
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.response.data.msg });
          setSubmitting(false);
        }
      }
    }
  });

  const { values, errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } =
    formik;

  return (
    <>
      {!account && profile ? (
        <Backdrop open sx={{ zIndex: 9999 }}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card sx={{ p: 3, boxShadow: 0 }}>
                  <Stack spacing={{ xs: 2, md: 3 }}>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                      <TextField
                        fullWidth
                        label="First name"
                        {...getFieldProps('firstName')}
                        defaultValue={account.firstName}
                      />
                      <TextField
                        fullWidth
                        label="Last name"
                        {...getFieldProps('lastName')}
                        defaultValue={account.lastName}
                      />
                    </Stack>

                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                      <TextField
                        fullWidth
                        disabled
                        label="Email Address"
                        {...getFieldProps('email')}
                        defaultValue={account.email}
                      />
                      <TextField
                        fullWidth
                        label="Phone Number"
                        {...getFieldProps('tel')}
                        defaultValue={account.tel}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                      <TextField
                        fullWidth
                        label="Address"
                        {...getFieldProps('address')}
                        defaultValue={account.address}
                      />
                    </Stack>
                  </Stack>

                  <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                    <LoadingButton
                      type="submit"
                      variant="contained"
                      size="large"
                      loading={isSubmitting}
                    >
                      Save Changes
                    </LoadingButton>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      )}
    </>
  );
}
