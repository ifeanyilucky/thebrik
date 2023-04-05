import { Outlet } from 'react-router-dom';
// material
import { Box } from '@mui/material';
// components
//
import MainNavbar from './MainNavbar';
import CustomNavbar from './CustomNavbar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Box>
      <MainNavbar />
      <div>
        <Outlet />
      </div>
    </Box>
  );
}
