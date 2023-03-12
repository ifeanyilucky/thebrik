import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { FormHelperText, Stack, TextField, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '../../../routes/paths';
// hooks
import { useAuth } from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// ----------------------------------------------------------------------

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const { token } = useParams();
  const isMountedRef = useIsMountedRef();
  const { resetPassword } = useAuth();
  const VerifyCodeSchema = Yup.object().shape({
    password: Yup.string().required('Please enter new password').min(7),
    confirmPassword: Yup.string()
      .required('Confirm password')
      .oneOf([Yup.ref('password')], 'The password entered do not match')
  });
  console.log(token);
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      setSubmitting(true);
      try {
        await resetPassword(values, token);

        if (isMountedRef.current) {
          setSubmitting(false);
          navigate(PATH_AUTH.login);
        }
      } catch (error) {
        if (isMountedRef.current) {
          setSubmitting(false);
          console.log(error.response.data);
          setErrors({ afterSubmit: error.response.data.msg });
        }
      }
      console.log(values);
    }
  });

  const { values, errors, isValid, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={2} justifyContent="center">
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
          <TextField
            fullWidth
            autoComplete="current-password"
            // type={showPassword ? 'text' : 'password'}
            type="password"
            label="New password"
            {...getFieldProps('password')}
            // InputProps={{
            //   endAdornment: (
            //     <InputAdornment position="end">
            //       <IconButton onClick={handleShowPassword} edge="end">
            //         <Icon icon={showPassword ? eyeFill : eyeOffFill} />
            //       </IconButton>
            //     </InputAdornment>
            //   )
            // }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            type="password"
            label="Confirm password"
            {...getFieldProps('confirmPassword')}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Reset password
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
