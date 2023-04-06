import { usePaystackPayment } from 'react-paystack';
import {
  Stack,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  FormControl,
  Radio
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import { makePayment } from '../../redux/slices/renter';
import { fCurrency } from '../../utils/formatNumber';
import { config } from '../../config';
import { PATH_PAGE } from '../../routes/paths';

Payment.propTypes = {
  user: PropTypes.object,
  hostel: PropTypes.object
};
export default function Payment({ user, hostel }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [methodOpen, setMethodOpen] = useState(false);

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
      <SelectPaymentMethod
        methodOpen={methodOpen}
        setMethodOpen={setMethodOpen}
        initializeCardPayment={initializePayment}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentClose={onPaymentClose}
        hostel={hostel}
      />
      <LoadingButton
        fullWidth
        loading={loading}
        variant="contained"
        size="large"
        sx={{ textTransform: 'uppercase' }}
        onClick={() => {
          // setLoading(true);
          // initializePayment(onPaymentSuccess, onPaymentClose);
          setMethodOpen(true);
        }}
      >
        Pay now ({fCurrency(hostel?.prices?.totalCost)})
      </LoadingButton>
    </Stack>
  );
}

export const SelectPaymentMethod = ({
  methodOpen,
  setMethodOpen,
  initializeCardPayment,
  onPaymentSuccess,
  onPaymentClose,
  hostel
}) => {
  const navigate = useNavigate();
  const [methodValue, setMethodValue] = useState('card');
  const methods = [
    {
      label: 'Pay with card',
      value: 'card'
    },
    {
      label: 'Bank transfer',
      value: 'transfer'
    },
    {
      label: 'Bank deposit',
      value: 'deposit'
    }
  ];

  const processPayment = (selectedMethod) => {
    if (selectedMethod === 'card') {
      initializeCardPayment(onPaymentSuccess, onPaymentClose);
    } else if (selectedMethod === 'transfer' || selectedMethod === 'deposit') {
      // Navigate user to use the payment form
      navigate(`${PATH_PAGE.hostels}/${hostel?.slug}/payment`, {
        state: { hostel, method: selectedMethod }
      });
    }
  };

  return (
    <div>
      <Dialog
        onClose={() => setMethodOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={methodOpen}
      >
        <DialogTitle id="customized-dialog-title" onClose={() => setMethodOpen(false)}>
          Choose a payment method <br />
          <Typography variant="caption">Click one of the options below</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl>
            {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
            <RadioGroup
              onChange={(e) => setMethodValue(e.target.value)}
              aria-labelledby="payment-method-radio-group"
              defaultValue="card"
            >
              {methods.map(({ value, label }, index) => (
                <FormControlLabel key={index} value={value} control={<Radio />} label={label} />
              ))}
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => processPayment(methodValue)}>
            continue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
SelectPaymentMethod.propTypes = {
  methodOpen: PropTypes.bool,
  initializeCardPayment: PropTypes.func,
  onPaymentSuccess: PropTypes.func,
  onPaymentClose: PropTypes.func,
  hostel: PropTypes.object,
  setMethodOpen: PropTypes.func
};
