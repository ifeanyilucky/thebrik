import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink, matchPath, useLocation } from 'react-router-dom';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton
} from '@mui/material';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&:before': {
    top: 0,
    right: 0,
    width: 3,
    bottom: 0,
    content: "''",
    display: 'none',
    position: 'absolute',
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: theme.palette.primary.main
  }
}));

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// ----------------------------------------------------------------------

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function NavSection({ navConfig, isShow = true, ...other }) {
  const activeSubStyle = {
    color: 'text.primary',
    fontWeight: 'fontWeightMedium'
  };

  const { pathname } = useLocation();
  return (
    <Box {...other}>
      <List disablePadding>
        {navConfig.map((item) => {
          const { title, path } = item;
          const isActiveSub = path ? !!matchPath({ path, end: false }, pathname) : false;

          return (
            <ListItemStyle
              key={title}
              component={RouterLink}
              to={path}
              sx={{
                ...(isActiveSub && activeSubStyle)
              }}
            >
              <ListItemIconStyle>
                <Box
                  component="span"
                  sx={{
                    width: 4,
                    height: 4,
                    display: 'flex',
                    borderRadius: '50%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'text.disabled',
                    transition: (theme) => theme.transitions.create('transform'),
                    ...(isActiveSub && {
                      transform: 'scale(2)',
                      bgcolor: 'primary.main'
                    })
                  }}
                />
              </ListItemIconStyle>
              <ListItemText disableTypography sx={{ fontWeight: '500' }} primary={title} />
            </ListItemStyle>
          );
        })}
      </List>
    </Box>
  );
}
