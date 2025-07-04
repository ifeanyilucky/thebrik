import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';

import { useState, useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill';
import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Link,
  Grid,
  List,
  Stack,
  Popover,
  ListItem
  // ListSubheader,
  // CardActionArea
} from '@mui/material';

// ----------------------------------------------------------------------

const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(3),
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shortest
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none'
  }
}));

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  listStyleType: 'none',
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: theme.palette.text.primary
  }
}));

// ----------------------------------------------------------------------

IconBullet.propTypes = {
  type: PropTypes.oneOf(['subheader', 'item'])
};

function IconBullet({ type = 'item' }) {
  return (
    <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
      <Box
        component="span"
        sx={{
          ml: '2px',
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'currentColor',
          ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 })
        }}
      />
    </Box>
  );
}

MenuDesktopItem.propTypes = {
  item: PropTypes.object,
  isOffset: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

function MenuDesktopItem({ item, isOpen, isOffset, onOpen, onClose }) {
  const { title, path, children } = item;

  if (children) {
    return (
      <>
        <LinkStyle
          onClick={onOpen}
          to={path}
          sx={{
            display: 'flex',
            cursor: 'pointer',
            textDecoration: 'none',
            alignItems: 'center',

            ...(isOffset && { color: '#fff' }),
            ...(isOpen && { opacity: 0.48 })
          }}
          underline="none"
        >
          {title}
          <Box
            component={Icon}
            icon={isOpen ? arrowIosUpwardFill : arrowIosDownwardFill}
            sx={{ ml: 0.5, width: 16, height: 16 }}
          />
        </LinkStyle>

        <Popover
          open={isOpen}
          anchorReference="anchorPosition"
          anchorPosition={{ top: 80, left: 0 }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={onClose}
          PaperProps={{
            sx: {
              px: 3,
              pt: 1,
              pb: 3,
              right: 6,
              m: 'auto',
              borderRadius: 2,
              maxWidth: '240px',
              boxShadow: '0 0 5px 5px rgba(34, 34, 34, 0.02)'
            }
          }}
        >
          <Grid container direction={'column'} spacing={3}>
            {children.map((list) => {
              const { subheader, items } = list;

              return (
                <Grid key={subheader} item xs={6} md={6}>
                  <List disablePadding sx={{ listStyleType: 'none' }}>
                    {items.map((item) => (
                      <ListItemStyle
                        key={item.title}
                        to={item.path}
                        component={RouterLink}
                        underline="none"
                        sx={{
                          ...(isOffset && { color: '#fff' }),
                          '&.active': {
                            color: 'text.primary',
                            typography: 'subtitle2'
                          }
                        }}
                      >
                        {item.title}
                      </ListItemStyle>
                    ))}
                  </List>
                </Grid>
              );
            })}
          </Grid>
        </Popover>
      </>
    );
  }

  return (
    <LinkStyle
      to={path}
      component={RouterLink}
      end={path === '/'}
      sx={{
        ...(isOffset && { color: 'text.primary', textDecoration: 'none' }),
        '&.active': {
          color: 'primary.main'
        }
      }}
    >
      {title}
    </LinkStyle>
  );
}

MenuDesktop.propTypes = {
  isOffset: PropTypes.bool,
  navConfig: PropTypes.array
};

export default function MenuDesktop({ isOffset, navConfig }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack direction="row">
      {navConfig.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
        />
      ))}
    </Stack>
  );
}
