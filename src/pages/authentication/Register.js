import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography } from '@mui/material';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { RegisterFormAgent, RegisterFormStudent } from '../../components/authentication/register';
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
const blue = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#80BFFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75'
};

const Tab = styled(TabUnstyled)`
  color: white;
  font-family: inherit;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${blue[200]};
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  width: auto;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;
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
          <TabsUnstyled defaultValue={0}>
            <TabsList>
              <Tab>Renter</Tab>
              <Tab>Agent</Tab>
            </TabsList>
            <TabPanel value={0}>
              <RegisterFormStudent />
            </TabPanel>
            <TabPanel value={1}>
              <RegisterFormAgent />
            </TabPanel>
          </TabsUnstyled>
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
