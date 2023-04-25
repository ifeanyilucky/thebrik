import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Stack,
  TextField,
  Grid,
  DialogContent,
  Skeleton,
  Button
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/styles';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import { useDispatch, useSelector } from '../redux/store';
import * as api from '../utils/axios';
import { getHostel } from '../redux/slices/hostels';
import { config } from '../config';
import PriceBreakdown from '../components/payment/price-breakdown';
import { DialogAnimate } from '../components/animate';
import { PATH_DASHBOARD } from '../routes/paths';

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
  const [isSubmitting, setSubmitting] = useState(false);
  const [processingOpen, setProcessingOpen] = useState(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { bank } = config;
  useEffect(() => {
    dispatch(getHostel(id));
  }, [id]);
  const { hostel, isLoading } = useSelector((state) => state.hostel);

  // --- React hook form implementation
  const { register, setValue, handleSubmit } = useForm({
    defaultValues: {
      amount: hostel?.prices?.totalCost || '',
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
        setProcessingOpen(true);
      })
      .catch((error) => {
        console.log(error);
        toast.error('Failed to submit payment');
        setSubmitting(false);
      });
  };

  return (
    <Page title={'Payment'}>
      <DialogAnimate
        open={processingOpen}
        onClose={() => {
          navigate(PATH_DASHBOARD.paymentHistory);
          setProcessingOpen(false);
        }}
      >
        <DialogContent>
          <Stack spacing={1} my={1.4} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                bgcolor: '#135bfd',
                width: '70px',
                height: '70px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: '18px',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
            >
              <Iconify
                sx={{ color: 'white' }}
                fontSize="40px"
                color
                icon={'icon-park-outline:success'}
              />
            </Box>
            <Typography variant="h5">Payment is processing...</Typography>

            <Typography variant="body2">
              Your transaction is being processed. This may take a couple of minutes. Keep an eye
              out for emails from Thebrik for the updates about the payment. Go to "My Payment
              History" to view your payment status.{' '}
            </Typography>
            <Box marginTop={2}>
              <Button
                variant="contained"
                size="large"
                component={RouterLink}
                to={PATH_DASHBOARD.paymentHistory}
              >
                Continue
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </DialogAnimate>
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
                      <Typography variant="subtitle1" sx={{ color: 'primary.main' }}>
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
