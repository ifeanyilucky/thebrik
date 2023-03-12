import PropTypes from 'prop-types';
import { Navigate, Outlet, useNavigate, useSearchParams } from 'react-router-dom';
// hooks
import { useAuth } from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';

// ----------------------------------------------------------------------

export default function GuestGuard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [redirect] = useSearchParams();
  const redirectUrl = redirect.get('redirect');
  console.log(redirectUrl);
  if (isAuthenticated) {
    if (redirectUrl) {
      return <Navigate to={redirectUrl} replace />;
    }
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <Outlet />;
}
