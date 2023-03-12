import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import axios from 'axios';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Box,
  Paper,
  Stack,
  Card,
  Button,
  Collapse,
  TextField,
  IconButton,
  CircularProgress,
  Typography,
  MenuItem,
  PopoverReference
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import * as api from '../../../../utils/axios';

// ----------------------------------------------------------------------
const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));
// ----------------------------------------------------------------------
AccountBillingPaymentMethod.propTypes = {
  formik: PropTypes.object,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func,
  user: PropTypes.object,
  loading: PropTypes.bool
};

export default function AccountBillingPaymentMethod({
  formik,
  isOpen,
  onOpen,
  onCancel,
  loading,
  user,
  formikRef
}) {
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue, values } =
    formik;

  const defaultValues =
    values.bankName && values.accountNumber && values.accountName && values.bankCode;
  const [moreOpen, setMoreOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [bankLoading, setBankLoading] = useState(false);
  const [bankNameLoading, setBankNameLoading] = useState(false);
  useEffect(
    () => async () => {
      setBankLoading(true);
      try {
        const { data } = await api.getBanks();
        setBanks(data.banks.data);
        setBankLoading(false);
      } catch (error) {
        console.log(error);
        setBankLoading(false);
      }
    },
    [onOpen]
  );

  useEffect(() => {
    if (values.accountNumber.length > 9) {
      setBankNameLoading(true);
      api
        .validateBankAccount(values.accountNumber, values.bankCode)
        .then(({ data }) => {
          console.log(data);
          if (data.response.status === true) {
            setFieldValue('accountName', data.response.data.account_name);
            setBankNameLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setBankNameLoading(false);
        });
    }
  }, [values.accountNumber, setFieldValue]);
  if (bankNameLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: '20vh'
        }}
      >
        <CircularProgress size={20} />
      </Box>
    );
  }
  return (
    <CardStyle sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Cashout Method
      </Typography>
      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {!user?.bankInfo?.accountNumber ? (
          <Typography variant="subtitle1">No bank account added</Typography>
        ) : (
          <Paper
            sx={{
              p: 3,
              width: 1,
              position: 'relative',
              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
            }}
          >
            <Box sx={{ mb: 1 }} />

            <Typography variant="subtitle1">{user?.bankInfo?.accountNumber}</Typography>
            <Typography variant="body2">{user?.bankInfo?.accountName}</Typography>
            <Typography variant="body2">{user?.bankInfo.bankName}</Typography>
          </Paper>
        )}
      </Stack>

      <Box sx={{ mt: 3 }}>
        {user?.bankInfo?.accountNumber ? (
          <Button
            size="small"
            startIcon={<Icon icon="material-symbols:edit-note" />}
            onClick={onOpen}
          >
            Edit bank account
          </Button>
        ) : (
          <Button size="small" startIcon={<Icon icon={plusFill} />} onClick={onOpen}>
            Add bank account
          </Button>
        )}
      </Box>
      <Collapse in={isOpen}>
        <Box
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 1,
            bgcolor: 'background.neutral'
          }}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="subtitle1">Add bank account</Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {!banks && bankLoading ? (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        height: '20vh'
                      }}
                    >
                      <CircularProgress size={20} />
                    </Box>
                  ) : (
                    <TextField
                      fullWidth
                      label="Select bank"
                      {...getFieldProps('bankCode')}
                      error={Boolean(touched.bankName && errors.bankName)}
                      helperText={touched.bankName && errors.bankName}
                      select
                    >
                      {banks.map((bank) => (
                        <MenuItem
                          key={bank.id}
                          value={bank?.code}
                          onClick={() => setFieldValue('bankName', bank.name)}
                        >
                          {bank.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}

                  <TextField
                    fullWidth
                    label="Account number"
                    {...getFieldProps('accountNumber')}
                    error={Boolean(touched.accountNumber && errors.accountNumber)}
                    helperText={touched.accountNumber && errors.accountNumber}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Account name"
                    {...getFieldProps('accountName')}
                    // disabled
                    error={Boolean(touched.accountName && errors.accountName)}
                    helperText={touched.accountName && errors.accountName}
                  />
                </Stack>

                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  <Button type="button" color="inherit" variant="outlined" onClick={onCancel}>
                    Cancel
                  </Button>
                  <LoadingButton
                    disabled={!defaultValues}
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {user?.bankInfo?.accountNumber ? 'Save Change' : 'Add bank'}
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Collapse>
    </CardStyle>
  );
}
