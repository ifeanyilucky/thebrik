import { useEffect, useState } from 'react';
import { Stack, Typography, DialogContent, TextField, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { DialogAnimate } from '../../animate';
import * as axios from '../../../utils/axios';

export default function ReferralWithdrawalModal({ onClose, open }) {
  const [loading, setLoading] = useState(false);
  const [banks, setBanks] = useState([]);

  const { register, watch, handleSubmit, getValues, setValue } = useForm({
    defaultValues: {
      accountNumber: '',
      accountName: '',
      bankCode: ''
    }
  });

  const { bankCode } = getValues();

  // Verify account details before making referral transfer
  useEffect(() => {
    if (watch('accountNumber').length > 9)
      (async () => {
        setLoading(true);
        try {
          const { data } = await axios.validateBankAccount(watch('accountNumber'), bankCode);
          console.log(data);
          if (data.response.status === true) {
            setValue('accountName', data.response.data.account_name);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })();
  }, [watch('accountNumber')]);

  useEffect(() => {
    if (open)
      (async () => {
        await axios
          .getBanks()
          .then(({ data }) => {
            setBanks(data.banks.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })();
  }, [open]);

  // Account details submit
  const onSubmit = async (values) => {
    setLoading(true);
    axios
      .referralBonusPayment(values)
      .then(({ data }) => {
        console.log(data);
        toast.success(`Your withdrawal is being processed.`);
        setLoading(false);
        onClose();
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.msg, { duration: 6500 });
      });
  };

  return (
    <DialogAnimate open={open} onClose={onClose}>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack my={1.4}>
            <Typography variant="subtitle1">Enter your account details</Typography>
          </Stack>
          <Stack spacing={3}>
            <Stack spacing={2} direction={{ md: 'row', sm: 'column', xs: 'column' }} fullWidth>
              <TextField type="text" {...register('bankCode')} fullWidth label="Select bank" select>
                {banks.map((bank) => (
                  <MenuItem key={bank?.id} value={bank?.code}>
                    {bank?.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                type="number"
                {...register('accountNumber')}
                label="Account number"
                fullWidth
              />
            </Stack>
            <Stack>
              <TextField type="text" {...register('accountName')} label="Account name" fullWidth />
            </Stack>
            <LoadingButton loading={loading} type="submit" variant="contained" size="large">
              Withdraw
            </LoadingButton>
          </Stack>
        </form>
      </DialogContent>
    </DialogAnimate>
  );
}

ReferralWithdrawalModal.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};
