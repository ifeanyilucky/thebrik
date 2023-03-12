import { Stack, Typography, Divider } from '@mui/material';
import PropTypes from 'prop-types';
import { fCurrency } from '../../utils/formatNumber';

const feeStyle = {
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between'
};

PriceBreakdown.propTypes = {
  hostel: PropTypes.object
};

export default function PriceBreakdown({ hostel }) {
  const {
    prices: { agreementCommissionFee, cautionFee, agencyFee, price, serviceCharge, totalCost }
  } = hostel;

  return (
    <Stack spacing={2.7}>
      <Stack style={feeStyle}>
        <Typography variant="overline">Subsequent payment</Typography>
        <Typography variant="overline"> {fCurrency(price)}</Typography>
      </Stack>
      <Stack style={feeStyle}>
        <Typography variant="overline">Agency fee</Typography>
        <Typography variant="overline"> {fCurrency(agencyFee)}</Typography>
      </Stack>
      <Stack style={feeStyle}>
        <Typography variant="overline">Legal fee</Typography>
        <Typography variant="overline"> {fCurrency(agreementCommissionFee)}</Typography>
      </Stack>
      {cautionFee !== 0 && (
        <Stack style={feeStyle}>
          <Typography variant="overline">Caution fee</Typography>
          <Typography variant="overline"> {fCurrency(cautionFee)}</Typography>
        </Stack>
      )}

      <Stack style={feeStyle}>
        <Typography variant="overline">Service charge</Typography>
        <Typography variant="overline"> {serviceCharge && fCurrency(serviceCharge)}</Typography>
      </Stack>
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Stack style={feeStyle}>
        <Typography variant="body1" fontWeight={700}>
          TOTAL
        </Typography>
        <Typography variant="body1" fontWeight={700}>
          {totalCost && fCurrency(totalCost)}
        </Typography>
      </Stack>
    </Stack>
  );
}
