import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Divider, Typography, Box } from '@mui/material';
// utils
import { fCurrency } from '../../utils/formatNumber';
import AgentCard from '../agentCard';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

HostelDetailsSummary.propTypes = {
  hostel: PropTypes.object,
  user: PropTypes.object
};
export default function HostelDetailsSummary({ hostel, user }) {
  const {
    title,
    prices: { price },
    pricePerWhat
  } = hostel;

  return (
    <Box>
      <Typography variant="h5" paragraph>
        {title}
      </Typography>
      <Typography variant="h5">
        {fCurrency(price)}/{pricePerWhat}
      </Typography>
      <AgentCard hostel={hostel} user={user} />
    </Box>
  );
}
