import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
// utils
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { useAuth } from '../../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const isMountedRef = useIsMountedRef();
  const { changePassword } = useAuth();
  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('New Password is required'),
    confirmNewPassword: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        await changePassword(values);
        if (isMountedRef.current) {
          setSubmitting(false);
          toast.success('Password changed');
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.response.data.msg });
          toast.error(error.response.data.msg);
          console.log(error);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3, boxShadow: 0 }}>
              <Stack spacing={3} alignItems="flex-end">
                <TextField
                  {...getFieldProps('oldPassword')}
                  fullWidth
                  autoComplete="on"
                  type="password"
                  label="Old Password"
                  error={Boolean(touched.oldPassword && errors.oldPassword)}
                  helperText={touched.oldPassword && errors.oldPassword}
                />

                <TextField
                  {...getFieldProps('newPassword')}
                  fullWidth
                  autoComplete="on"
                  type="password"
                  label="New Password"
                  error={Boolean(touched.newPassword && errors.newPassword)}
                  helperText={
                    (touched.newPassword && errors.newPassword) || 'Password must be minimum 6+'
                  }
                />

                <TextField
                  {...getFieldProps('confirmNewPassword')}
                  fullWidth
                  autoComplete="on"
                  type="password"
                  label="Confirm New Password"
                  error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
                  helperText={touched.confirmNewPassword && errors.confirmNewPassword}
                />

                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  Save Changes
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
