import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, AppBar, Toolbar, Container, Stack, Divider } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import { useAuth } from '../../hooks/useAuth';
// components
import Logo from '../../components/Logo';
import Label from '../../components/Label';
import { MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import navConfig from './MenuConfig';
import { PATH_AUTH } from '../../routes/paths';
import AccountPopover from '../dashboard/AccountPopover';
import AgentAccountPopover from '../agent/AgentAccountPopover';
// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP
  }
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  const isOffset = useOffSetTop(100);
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <AppBar sx={{ zIndex: 100, boxShadow: 0, bgcolor: 'transparent', position: 'relative' }}>
      <ToolbarStyle
        disableGutters
        sx={{
          ...(isOffset && {
            bgcolor: 'background.default',
            height: { md: APP_BAR_DESKTOP - 16 }
          })
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <Label color="info" sx={{ ml: 1 }}>
            .co
          </Label>
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdDown">
            <MenuDesktop isOffset={isOffset} navConfig={navConfig} />
          </MHidden>
          <Divider orientation="vertical" />
          {!isAuthenticated ? (
            <MHidden width="mdDown">
              <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }}>
                <Button size="small" variant="text" component={RouterLink} to={PATH_AUTH.login}>
                  Login
                </Button>
                <Button
                  size="medium"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_AUTH.register}
                >
                  Register
                </Button>
              </Stack>
            </MHidden>
          ) : (
            <Account accountRole={user?.role} logout={logout} user={user} />
          )}

          <MHidden width="mdUp">
            <MenuMobile
              isOffset={isOffset}
              navConfig={navConfig}
              isAuthenticated={isAuthenticated}
            />
          </MHidden>
        </Container>
      </ToolbarStyle>
    </AppBar>
  );
}

Account.propTypes = {
  accountRole: PropTypes.string,
  user: PropTypes.object,
  logout: PropTypes.func
};

function Account({ accountRole, user, logout }) {
  return (
    <>
      {accountRole === 'Member' ? (
        <AccountPopover user={user} logout={logout} />
      ) : (
        <AgentAccountPopover user={user} logout={logout} />
      )}
    </>
  );
}
