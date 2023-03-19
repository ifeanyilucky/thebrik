import { usePaystackPayment } from 'react-paystack';
import { Stack } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { makePayment } from '../../redux/slices/renter';
import { fCurrency } from '../../utils/formatNumber';
import { config } from '../../config';

Payment.propTypes = {
  user: PropTypes.object,
  hostel: PropTypes.object
};
export default function Payment({ user, hostel }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const paystackConfig = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: `${hostel?.prices?.totalCost}00`,
    publicKey: config.paystack.public
  };
  const onPaymentSuccess = (reference) => {
    if (reference) {
      dispatch(
        makePayment({
          transaction: reference,
          hostel: hostel._id,
          amount: hostel?.prices?.totalCost
        })
      );
    }
    console.log(reference);
  };
  const onPaymentClose = () => {
    setLoading(false);
  };
  const initializePayment = usePaystackPayment(paystackConfig);
  return (
    <Stack spacing={2} direction="row">
      <LoadingButton
        fullWidth
        loading={loading}
        variant="contained"
        size="large"
        sx={{ textTransform: 'uppercase' }}
        onClick={() => {
          setLoading(true);
          initializePayment(onPaymentSuccess, onPaymentClose);
        }}
      >
        Pay now ({fCurrency(hostel?.prices?.totalCost)})
      </LoadingButton>
    </Stack>
  );
}
