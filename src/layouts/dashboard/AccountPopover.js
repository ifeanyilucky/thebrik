import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import homeFill from '@iconify/icons-eva/home-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import eye2Fill from '@iconify/icons-eva/eye-off-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Divider, MenuItem, Typography, IconButton, Stack } from '@mui/material';
import { alpha } from '@mui/material/styles';
// components
import MenuPopover from '../../components/MenuPopover';
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
import MyAvatar from '../../components/MyAvatar';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Dashboard',
    icon: homeFill,
    linkTo: PATH_DASHBOARD.root
  },
  {
    label: 'Hostels',
    icon: eye2Fill,
    linkTo: PATH_PAGE.hostels
  },
  {
    label: 'Account settings',
    icon: settings2Fill,
    linkTo: PATH_DASHBOARD.account
  }
];

// ----------------------------------------------------------------------

AccountPopover.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
};
export default function AccountPopover({ user, logout }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    setOpen(null);
  };

  if (!user) {
    return 'Loading';
  }
  const { firstName, lastName, email } = user;
  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8)
            }
          })
        }}
      >
        <MyAvatar />
      </IconButton>
      {/* <Typography variant="body2" marginLeft={1.2}>
          Hi, {firstName}
        </Typography> */}
      {/* <Icon icon={dropdown} style={{ fontSize: '30px' }} /> */}

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75
          }
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {`${firstName} ${lastName}`}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack>
          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem onClick={logout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
