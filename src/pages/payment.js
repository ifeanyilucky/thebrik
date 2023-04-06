import { useState, useCallback, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  TextField,
  Grid,
  Skeleton
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
import { useFormik, Form, FormikProvider } from 'formik';
import toast from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import Page from '../components/Page';
import { useDispatch, useSelector } from '../redux/store';
import * as api from '../utils/axios';
import { getHostel } from '../redux/slices/hostels';
import { config } from '../config';
import PriceBreakdown from '../components/payment/price-breakdown';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const SkeletonLoad = (
  <Container maxWidth="lg">
    <Grid container spacing={3}>
      {/* <Grid item xs={12} md={6} lg={7}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
      </Grid> */}
      <Grid item xs={12} md={12} lg={12} sx={{ mx: 'auto' }}>
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" height={240} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
        <Skeleton variant="text" height={40} />
      </Grid>
    </Grid>
  </Container>
);

export default function ManualPayment() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [receiptUrl, setReceiptUrl] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const { state } = useLocation();
  const { bank } = config;
  useEffect(() => {
    dispatch(getHostel(id));
  }, [id]);
  const { hostel, isLoading } = useSelector((state) => state.hostel);
  // --- React hook form implementation
  const { register, setValue, handleSubmit, getValues } = useForm({
    defaultValues: {
      amount: '',
      receipt: '',
      transactionId: '',
      nameOfDepositor: '',
      hostel
    }
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    console.log(values);
    const formData = new FormData();
    formData.append('receipt', values.receipt);
    formData.append('values', JSON.stringify({ ...values, method: state.method }));

    await api
      .makeManualPayment(formData)
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        toast.success('Payment submitted successfully');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to submit payment');
        setSubmitting(false);
      });
  };

  return (
    <Page title={'Payment'}>
      {isLoading && !hostel ? (
        SkeletonLoad
      ) : (
        <Container>
          <Grid container spacing={4} mt={5}>
            <Grid item md={4}>
              <Card>
                <CardContent>
                  {hostel?.prices && (
                    <>
                      {' '}
                      <Typography variant="h5" mb={3}>
                        Price breakdown
                      </Typography>
                      <PriceBreakdown hostel={hostel} />
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={8}>
              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack>
                      <Typography variant="body1">
                        <strong>Bank</strong>
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                        {bank.bankName}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1">
                        <strong>Account Name</strong>
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
                        {bank.accountName}
                      </Typography>
                    </Stack>
                    <Stack>
                      <Typography variant="body1">
                        <strong>Account number</strong>
                      </Typography>
                      <Typography varaint="subtitle1" sx={{ color: 'primary.main' }}>
                        {bank.accountNumber}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
                encType="multipart/form-data"
              >
                <Card>
                  <CardContent>
                    <LabelStyle>Upload payment slip/teller/receipt (JPG or PNG format)</LabelStyle>
                    <input
                      type="file"
                      multiple={false}
                      onChange={(e) => {
                        setValue('receipt', e.target.files[0]);
                        // setProfilePicUrl(URL.createObjectURL(e.target.files[0]));
                      }}
                      accept="image/*"
                      className="upload"
                    />
                    {/* <UploadSingleFile
                      accept="image/*"
                      file={selectedFile}
                      onDrop={handleDropSingleFile}
                    /> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Stack spacing={3}>
                      <Stack spacing={1}>
                        <LabelStyle>Amount</LabelStyle>
                        <TextField
                          label="Enter the amount you paid for"
                          {...register('amount')}
                          fullWidth
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <LabelStyle>Name of depositor</LabelStyle>
                        <TextField
                          label="Enter name of depositor"
                          {...register('nameOfDepositor')}
                          fullWidth
                        />
                      </Stack>
                      <Stack spacing={1}>
                        <LabelStyle>Transaction ID/Teller ID/Ref ID</LabelStyle>
                        <TextField
                          label="Enter your transaction ID or Ref ID"
                          {...register('transactionId')}
                          fullWidth
                        />
                      </Stack>
                      <LoadingButton
                        loading={isSubmitting}
                        type="submit"
                        variant="contained"
                        size="large"
                      >
                        Submit
                      </LoadingButton>
                    </Stack>
                  </CardContent>
                </Card>
              </form>
            </Grid>
          </Grid>
        </Container>
      )}
    </Page>
  );
}
