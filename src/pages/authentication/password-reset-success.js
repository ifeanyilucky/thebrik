import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
// material
import { styled } from '@mui/material/styles';
import { Link, Stack, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { MailIcon } from '../../components/svgIcons';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------
export default function PasswordResetSuccess() {
  return (
    <RootStyle title="Password reset">
      <AuthLayout>
        Don’t have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to="/auth/register">
          Get started
        </Link>
      </AuthLayout>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 3 }}>
            <Stack>
              <MailIcon />
            </Stack>
            <Typography variant="h3" gutterBottom>
              Done And Done!
            </Typography>
            <Typography variant="body1">We've sent an email to</Typography>
            <Typography variant="body1">
              your email address with password reset instruction
            </Typography>
          </Stack>
          <Stack sx={{ mb: 3 }}>
            <Typography variant="body1">
              If the email doesn't show up soon, check your spam folder.
            </Typography>
          </Stack>

          <Stack spacing={3}>
            <Stack>
              <LoadingButton
                fullWidth
                size="large"
                component={RouterLink}
                to="/auth/login"
                variant="contained"
              >
                Return to login
              </LoadingButton>
            </Stack>
          </Stack>

          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link variant="subtitle2" component={RouterLink} to="/auth/register">
                Get started
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
