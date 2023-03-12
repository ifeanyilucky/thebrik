import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container, Alert, AlertTitle } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PATH_AGENT, PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  accessibleRoles: PropTypes.array, // Example ['admin', 'leader']
  children: PropTypes.node
};

const useCurrentRole = () => {
  const { role } = useAuth();

  return role;
};

export default function RoleBasedGuard({ children, accessibleRoles }) {
  const currentRole = useCurrentRole();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (!pathname.includes('host')) {
      if (currentRole === 'Host') {
        return navigate(PATH_AGENT.root, { replace: true });
      }
    }
    if (!pathname.includes('renter')) {
      if (currentRole === 'Member') {
        return navigate(PATH_DASHBOARD.root, { replace: true });
      }
    }
    return null;
  }, [pathname, currentRole, navigate]);

  if (!accessibleRoles.includes(currentRole)) {
    console.log(currentRole, accessibleRoles);

    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>Permission Denied</AlertTitle>
          You do not have permission to access this page
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
