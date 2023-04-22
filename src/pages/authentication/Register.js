import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { RegisterFormStudent } from '../../components/authentication/register';
import { PATH_PAGE, PATH_AUTH } from '../../routes/paths';
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

// _______________________________________________

// ________________________________________________
// ----------------------------------------------------------------------

export default function Register() {
  return (
    <RootStyle title="Register">
      <AuthLayout>
        Already have an account? &nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
          Login
        </Link>
      </AuthLayout>
      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Thebrik
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              Let’s get you started. Create an account to begin
            </Typography>
          </Box>

          <RegisterFormStudent />
          <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By creating an account, you agree to our &nbsp;
            <Link
              underline="always"
              sx={{ color: 'text.primary' }}
              component={RouterLink}
              to="/legal/terms-conditions"
            >
              Terms
            </Link>
            &nbsp;and have read and acknowledge the &nbsp;
            <Link
              underline="always"
              sx={{ color: 'text.primary' }}
              component={RouterLink}
              to={PATH_PAGE.privacyPolicy}
            >
              Privacy policy
            </Link>
            .
          </Typography>
          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              Already have an account?&nbsp;
              <Link to={PATH_AUTH.login} component={RouterLink}>
                Login
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
