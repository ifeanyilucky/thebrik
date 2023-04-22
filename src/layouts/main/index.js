import { Outlet } from 'react-router-dom';
// material
import { Box, Typography, Link } from '@mui/material';
// components
import MainNavbar from './MainNavbar';
import { config } from '../../config';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Box>
      <Box sx={{ bgcolor: '#135bfd', color: '#fff', px: 2, py: 1.7, textAlign: 'center' }}>
        <Typography variant="subtitle2">
          Call now to get your hostel in less than 24 hours{' '}
          <Link
            sx={{ color: '#fff', textDecoration: 'underline' }}
            component={'a'}
            href={`tel:${config.tel.support1}`}
          >
            {config.tel.support1}
          </Link>
          {', '}
          <Link
            sx={{ color: '#fff', textDecoration: 'underline' }}
            component={'a'}
            href={`tel:${config.tel.support}`}
          >
            {config.tel.support}
          </Link>
        </Typography>
      </Box>
      <MainNavbar />
      <div>
        <Outlet />
      </div>
    </Box>
  );
}
