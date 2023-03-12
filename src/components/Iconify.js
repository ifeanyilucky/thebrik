import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

Iconify.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  sx: PropTypes.object,
  fontSize: PropTypes.string
};

export default function Iconify({ icon, sx, fontSize, ...other }) {
  return (
    <Box
      component={Icon}
      icon={icon}
      sx={{
        ...sx,
        fontSize: fontSize || '32px'
      }}
      {...other}
    />
  );
}
