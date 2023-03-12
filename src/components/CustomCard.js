import { Box } from '@mui/material';
import PropTypes from 'prop-types';

CustomCard.propTypes = {
  children: PropTypes.node
};

export default function CustomCard({ children, sx, other }) {
  return (
    <Box
      sx={{
        bgcolor: '#111827',
        color: '#fff',
        borderRadius: '45px',
        position: 'relative',
        overflow: 'hidden',
        py: 10,
        ...sx
      }}
      {...other}
    >
      {children}

      <Box
        component="img"
        src="/static/svg/cta-bg.svg"
        alt="cta-bg"
        sx={{
          top: '-36%',
          right: { md: '-18%', sm: '-30%', xs: '-30%' },
          width: { md: '400px', sm: '280px' },
          height: { md: '400px', sm: '280px' },
          position: 'absolute',
          zIndex: 1
        }}
      />
      <Box
        component="img"
        src="/static/svg/cta-bg.svg"
        alt="cta-bg"
        sx={{
          top: 'auto',
          right: 'auto',
          bottom: '-40%',
          width: '320px',
          height: '320px',
          position: 'absolute'
        }}
      />
    </Box>
  );
}
