import { useState, useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Card,
  Grid,
  Stack,
  MenuItem,
  TextField,
  Typography,
  FormControl,
  FormControlLabel,
  InputAdornment,
  List,
  ListItem,
  Paper,
  FormGroup,
  Box,
  Checkbox,
  FormHelperText,
  RadioGroup,
  Radio,
  FormLabel
} from '@mui/material';

// utils
import { fCurrency } from '../../utils/formatNumber';

export default function RoomateRequestForm() {
  // ----------------------------------------------------------------------

  const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    [theme.breakpoints.up('md')]: {
      height: '100%',
      display: 'flex',
      textAlign: 'left',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }));

  // ----------------------------------------------------------------------

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const phoneRegEx =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const propertySchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    studentStatus: Yup.string().required('Hostel area is required'),
    gender: Yup.number().required('Agency fee is required'),
    phoneNumber: Yup.string()
      .matches(phoneRegEx, 'Phone number is invalid')
      .required('Phone number is required')
      .min(10, 'Phone number is invalid')
      .max(11, 'Phone number is invalid')
  });

  const PRICE_PER = ['year', 'half year', 'month', 'week'];
  const NUMBER_OF = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { isSubmitting, touchedFields, errors, isDirty, isValid, dirtyFields }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      studentStatus: '',
      gender: '',
      desiredArea: ''
    },
    resolver: yupResolver(propertySchema)
  });

  const [submitting, setSubmitting] = useState(false);

  const submitHostel = (values) => {
    // setSubmitting(true);
    console.log(values);
  };

  return (
    <Grid container>
      <Grid item md={8} sm={12}>
        <Card sx={{ p: 3 }}>
          {' '}
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(submitHostel)}
            encType="multipart/form-data"
          >
            <Stack spacing={3} w={1}>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Stack>
                  <TextField type="text" label="First name" fullWidth {...register('firstName')} />
                  {errors.firstName?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.firstName?.message}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack>
                  <TextField type="text" label="Last name" fullWidth {...register('lastName')} />
                  {errors.lastName?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.lastName?.message}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>
              <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }}>
                <Stack>
                  <TextField type="email" label="Email" fullWidth {...register('email')} />
                  {errors.email?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.email?.message}
                    </FormHelperText>
                  )}
                </Stack>
                <Stack>
                  <TextField simple label="Phone number" fullWidth {...register('phoneNumber')} />
                  {errors.phoneNumber?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.phoneNumber?.message}
                    </FormHelperText>
                  )}
                </Stack>
              </Stack>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  type="text"
                  label="Desired area"
                  {...register('desiredArea')}
                />
                {errors.desiredArea?.message && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {errors.desiredArea?.message}
                  </FormHelperText>
                )}
              </Stack>
              <Stack>
                <TextField
                  fullWidth
                  placeholder="0.00"
                  label="Price"
                  {...register('price')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                    type: 'number'
                  }}
                />
                {errors.price?.message && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {errors.price?.message}
                  </FormHelperText>
                )}
              </Stack>
              {/* student status radio */}
              <Stack>
                <FormLabel>Student status</FormLabel>
                <RadioGroup {...register('studentStatus')} name="student-status">
                  <FormControlLabel
                    value="incoming student"
                    control={<Radio />}
                    label="Incoming student"
                  />
                  <FormControlLabel value="100L" control={<Radio />} label="100L" />
                  <FormControlLabel value="200L" control={<Radio />} label="200L" />
                  <FormControlLabel value="300L" control={<Radio />} label="300L" />
                  <FormControlLabel value="final year" control={<Radio />} label="Final year student" />
                  <FormControlLabel value="Alumnus" control={<Radio />} label="Alumnus/Alumna" />
                </RadioGroup>
              </Stack>
              <Stack>
                <FormLabel>Gender</FormLabel>
                <RadioGroup {...register('gender')} name="gender">
                  <FormControlLabel value="Male" control={<Radio />} label="Male" />
                  <FormControlLabel value="Female" control={<Radio />} label="Female" />
                </RadioGroup>
              </Stack>
              <Box>
                <LoadingButton variant="contained" type="submit" size="large">
                  Submit
                </LoadingButton>
              </Box>
            </Stack>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}
