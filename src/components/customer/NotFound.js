import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { PageNotFoundIllustration } from '../../assets';

export const NotFound = ({ text }) => (
  <Box
    sx={{
      width: '100%',
      backgroundColor: '#fff',
      height: '400px',
      display: 'flex',
      flexFlow: 'column',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 1
    }}
  >
    <PageNotFoundIllustration sx={{ height: '100px', mb: 4 }} />

    <Typography variant="subtitle1">{text}</Typography>
  </Box>
);
NotFound.propTypes = {
  text: PropTypes.string
};
