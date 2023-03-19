import { useState, useCallback, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
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
  FormGroup,
  Box,
  Checkbox,
  FormHelperText
} from '@mui/material';

import { UploadMultiFile } from '../upload';
// utils
import axios from '../../utils/axios';
import { fCurrency } from '../../utils/formatNumber';
import { PATH_AGENT } from '../../routes/paths';

// ----------------------------------------------------------------------

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

const CardStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  backgroundColor: '#fff',
  [theme.breakpoints.up('md')]: {
    height: '100%'
  }
}));

// ----------------------------------------------------------------------

HostelForm.propTypes = {
  isEdit: PropTypes.bool,
  currentHostel: PropTypes.object
};

export default function HostelForm({ isEdit, currentHostel }) {
  const navigate = useNavigate();

  const propertySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    prices: Yup.object().shape({
      price: Yup.number().required('Price is required'),
      agencyFee: Yup.number().required('Agency fee is required'),

      agreementCommissionFee: Yup.number().required('Agreement & commission fee is required')
    }),
    address: Yup.string().required('Address is required'),
    area: Yup.string().required('Hostel area is required'),
    images: Yup.array()
      .required('Please upload hostel images')
      .min(1, 'Hostel images should be more than 4 images')
  });
  const [selectedFile, setSelectedFile] = useState([]);

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
      name: currentHostel?.name || '',
      description: currentHostel?.description || '',
      address: currentHostel?.address || '',
      pricePerWhat: currentHostel?.pricePerWhat || '',
      school: currentHostel?.school || '',
      state: currentHostel?.state || '',
      area: currentHostel?.area || '',
      bathrooms: currentHostel?.bathrooms || '',
      bedrooms: currentHostel?.bedrooms || '',
      toilets: currentHostel?.toilets || '',
      images: currentHostel?.images || [],
      prices: {
        price: currentHostel?.prices?.price || '',
        agreementCommissionFee: currentHostel?.prices?.agreementCommissionFee || '',
        agencyFee: currentHostel?.prices?.agencyFee || '',
        cautionFee: currentHostel?.prices?.cautionFee || 0
      },
      amenities: {
        electricity: currentHostel?.amenities?.electricity || false,
        runningWater: currentHostel?.amenities?.runningWater || false,
        tiles: currentHostel?.amenities?.tiles || false,
        parking: currentHostel?.amenities?.parking || false
      }
    },
    resolver: yupResolver(propertySchema)
  });

  // react drop zone
  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
      setSelectedFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setValue]
  );

  const { images, price, cautionFee, agreementCommissionFee, agencyFee, amenities, hasPhone } =
    getValues();

  const handleRemoveAll = () => {
    setSelectedFile([]);
    setValue('images', []);
  };

  const handleRemove = async (file) => {
    const filteredItems = selectedFile.filter((_file) => _file !== file);
    setSelectedFile(filteredItems);
    setValue('images', filteredItems);
  };
  const [submitting, setSubmitting] = useState(false);

  // SUBMIT FUNCTION
  const submitHostel = (values) => {
    console.log(values);
    setSubmitting(true);
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append('images', images[i]);
    }
    formData.append('hostel', JSON.stringify(values));

    axios
      .post(`/properties`, formData)
      .then((res) => {
        console.log(res);
        setSubmitting(false);
        navigate(PATH_AGENT.listings);
        toast.success('Hostel has been submitted successfully', {
          duration: 8000,
          position: 'top-right'
        });
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        toast.error('Something went wrong, try again later');
      });
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(submitHostel)}
      encType="multipart/form-data"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <CardStyle sx={{ p: 3 }}>
            <Stack spacing={3}>
              <div>
                <LabelStyle>Title</LabelStyle>
                <TextField fullWidth label="Enter title" {...register('name')} />
                {errors.name?.message && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {errors.name?.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <LabelStyle>Description</LabelStyle>
                <TextField
                  simple
                  label="Description"
                  rows={6}
                  multiline
                  fullWidth
                  {...register('description')}
                />
                {errors.description?.message && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {errors.description?.message}
                  </FormHelperText>
                )}
              </div>
              <div>
                <LabelStyle>Add Images</LabelStyle>
                <UploadMultiFile
                  showPreview
                  maxSize={3145728}
                  accept="image/*"
                  files={selectedFile}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  isEdit={isEdit}
                  images={images}
                  // error={Boolean(touched. && errors.images)}
                />
                {errors.images?.message && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {errors.images?.message}
                  </FormHelperText>
                )}
              </div>

              <div>
                <LabelStyle>Select amenities</LabelStyle>
                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                  <FormGroup>
                    <Grid container flexDirection="row">
                      <Grid item md={6}>
                        <Stack spacing={1.2}>
                          <Box width={300}>
                            <Controller
                              name="amenities.electricity"
                              control={control}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultValue={amenities.electricity}
                                      defaultChecked={amenities.electricity}
                                      color="primary"
                                      onChange={(e) => field.onChange(e.target.checked)}
                                      checked={field.value}
                                    />
                                  }
                                  label="Electricity"
                                />
                              )}
                            />
                          </Box>
                          <Box width={300}>
                            <Controller
                              name="amenities.runningWater"
                              control={control}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultValue={amenities.runningWater}
                                      defaultChecked={amenities.runningWater}
                                      color="primary"
                                      onChange={(e) => field.onChange(e.target.checked)}
                                      checked={field.value}
                                    />
                                  }
                                  label="Running water"
                                />
                              )}
                            />
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item md={6}>
                        <Stack spacing={1.2}>
                          <Box width={300}>
                            <Controller
                              name="amenities.tiles"
                              control={control}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultValue={amenities.tiles}
                                      defaultChecked={amenities.tiles}
                                      color="primary"
                                      onChange={(e) => field.onChange(e.target.checked)}
                                      checked={field.value}
                                    />
                                  }
                                  label="All round tiles"
                                />
                              )}
                            />
                          </Box>
                          <Box width={300}>
                            <Controller
                              name="amenities.parking"
                              control={control}
                              render={({ field }) => (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      defaultValue={amenities.parking}
                                      defaultChecked={amenities.parking}
                                      color="primary"
                                      onChange={(e) => field.onChange(e.target.checked)}
                                      checked={field.value}
                                    />
                                  }
                                  label="Parking space"
                                />
                              )}
                            />
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
                  </FormGroup>
                </FormControl>
              </div>

              <div>
                <LabelStyle>Hostel address</LabelStyle>
                <Stack spacing={2}>
                  <div>
                    <TextField fullWidth type="text" label="Address" {...register('address')} />
                    {errors.address?.message && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {errors.address?.message}
                      </FormHelperText>
                    )}
                  </div>
                  <div>
                    <TextField fullWidth type="text" label="Area" {...register('area')} />
                    {errors.area?.message && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {errors.area?.message}
                      </FormHelperText>
                    )}
                  </div>
                  <div>
                    <TextField fullWidth type="text" label="State" {...register('state')} />
                  </div>
                </Stack>
              </div>
            </Stack>
          </CardStyle>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <CardStyle sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Price"
                    {...register('prices.price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                      type: 'number'
                    }}
                  />
                  {errors.prices?.price?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.prices?.price?.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <TextField
                    fullWidth
                    type="text"
                    label="Price Per"
                    select
                    {...register('pricePerWhat')}
                  >
                    <MenuItem value="year" selected>
                      Year
                    </MenuItem>
                  </TextField>
                  {errors.pricePerWhat?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.pricePerWhat?.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  {' '}
                  <TextField
                    fullWidth
                    {...register('prices.agencyFee')}
                    placeholder="0.00"
                    label="Agency fee"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                      type: 'number'
                    }}
                  />
                  {errors.prices?.agencyFee?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.prices?.agencyFee?.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Agreement & commission fee"
                    {...register('prices.agreementCommissionFee')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                      type: 'number'
                    }}
                  />
                  {errors.prices?.agreementCommissionFee?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.prices?.agreementCommissionFee?.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <TextField
                    fullWidth
                    placeholder="0.00"
                    {...register('prices.cautionFee')}
                    label="Caution Fee"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">NGN</InputAdornment>,
                      type: 'number'
                    }}
                  />
                  {errors.prices?.cautionFee?.message ? (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.prices?.cautionFee?.message}
                    </FormHelperText>
                  ) : (
                    <FormHelperText>
                      Enter caution fee if requested by the property owner.{' '}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </CardStyle>

            <CardStyle sx={{ p: 3 }}>
              <Stack spacing={3}>
                <div>
                  <TextField
                    fullWidth
                    type="number"
                    label="Number of bed"
                    {...register('bedrooms')}
                  />
                  {errors.bedrooms?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.bedrooms?.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <TextField
                    fullWidth
                    type="number"
                    label="Number of bathroom"
                    {...register('bathrooms')}
                  />

                  {errors.bathrooms?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.bathrooms?.message}
                    </FormHelperText>
                  )}
                </div>
                <div>
                  <TextField
                    fullWidth
                    type="number"
                    label="Number of toilet"
                    {...register('toilets')}
                  />
                  {errors.toilets?.message && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {errors.toilets?.message}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
            </CardStyle>

            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              loading={submitting}
            >
              {!isEdit ? 'Create listing' : 'Save Changes'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
}
