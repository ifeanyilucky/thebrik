import { Outlet } from 'react-router-dom';
// material
import { Box } from '@mui/material';
// components
//
import MainNavbar from './MainNavbar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <Box>
      {/* <Box sx={{ marginTop: { xs: 12, sm: 12 } }}> */}
      <MainNavbar />
      <div>
        <Outlet />
      </div>
    </Box>
  );
}
