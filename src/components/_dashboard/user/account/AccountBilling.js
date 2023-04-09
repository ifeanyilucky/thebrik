import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
// material
import { Grid, Stack } from '@mui/material';

// redux
import { useAuth } from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
// import { useSelector } from '../../../../redux/store';

//
// import AccountBillingAddressBook from './AccountBillingAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';
// ----------------------------------------------------------------------

export default function AccountBilling() {
  // eslint-disable-next-line
  const [toastMsg, setToastMsg] = useState('');
  const [open, setOpen] = useState(false);
  const { user, updateProfile } = useAuth();
  const isMountedRef = useIsMountedRef();

  const formikRef = useRef();

  const NewCardSchema = Yup.object().shape({
    bankName: Yup.string().required('Please select your bank'),
    accountNumber: Yup.string().required('Account number is required')
  });

  const formik = useFormik({
    initialValues: {
      bankName: user?.bankInfo?.bankName || '',
      accountNumber: user?.bankInfo?.accountNumber || '',
      accountName: user?.bankInfo?.accountName || '',
      bankCode: user?.bankInfo?.bankCode || ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await updateProfile(values);
        if (isMountedRef.current) {
          setSubmitting(false);
          toast.success('Bank information updated successfully!');
        }
      } catch (error) {
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.response.data.msg });
          setSubmitting(false);
        }
      }
    },
    enableReinitialize: true,
    innerRef: formikRef
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <AccountBillingPaymentMethod
            user={user}
            formik={formik}
            isOpen={open}
            onOpen={handleOpenAddCard}
            onCancel={handleCancel}
            loading={false}
            formikRef={formikRef}
          />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory />
      </Grid>
    </Grid>
  );
}
