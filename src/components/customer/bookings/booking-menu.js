import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';

import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Menu, MenuItem, IconButton, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------

BookingMenu.propTypes = {
  onView: PropTypes.func
};

export default function BookingMenu({ onView }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%', border: '1px solid #f3f3f3' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ boxShadow: 'none' }}
      >
        <MenuItem onClick={onView} sx={{ color: 'text.secondary' }}>
          <ListItemText primary="View" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
