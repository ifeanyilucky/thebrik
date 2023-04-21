import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormikProvider, Form } from 'formik';

import { Box, Typography, Grid, Link, Stack } from '@mui/material';
import { styled } from '@mui/styles';
import { MHidden } from './@material-extend';

// ------------------------------------------------------------------------

const InputWrapper = styled('div')({
  borderColor: 'rgb(69 69 69 / 0.3)',
  borderWidth: '1px',
  borderStyle: 'solid',
  padding: '0.875rem 1rem',
  borderRadius: '0.75rem'
});
const FilterInput = styled('input')({
  background: 'transparent',
  outline: 0,
  borderWidth: 0,
  width: '100%',
  fontFamily: 'inherit',
  fontSize: '15px'
});

// const FilterSelect = styled(Select)({
//   background: 'transparent',
//   outline: 0,
//   borderWidth: 0,
//   width: '100%',
//   fontFamily: 'inherit',
//   fontSize: '15px'
// });
// ------------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High-Low' },
  { value: 'priceAsc', label: 'Price: Low-High' }
];
export const FILTER_AREA_OPTIONS = [
  'Igando',
  'Iba junction',
  'PPL',
  'Post service',
  'Cassidy area',
  'First gate',
  'Obadore',
  'Ipaye'
];
export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below $25' },
  { value: 'between', label: 'Between $25' },
  { value: 'above', label: 'Above $25' }
];

// ------------------------------------------------------------------------
// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

Filter.propTypes = {
  onResetFilter: PropTypes.func,
  formik: PropTypes.object
};

// export default function Filter({ onResetFilter, formik }) {
export default function Filter({ formik }) {
  const { getFieldProps } = formik;
  const [showFilter, setShowFilter] = useState(false);
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate>
        <Grid container spacing={2}>
          <Grid item md={6} sm={12} xs={12}>
            <InputWrapper label="Choose area">
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Area
              </Typography>
              <FilterInput type="search" {...getFieldProps('area')} />
            </InputWrapper>
          </Grid>
          <Grid item md={2} sm={12} xs={12}>
            <MHidden width={showFilter ? 'xlUp' : 'mdDown'}>
              <InputWrapper>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  Prices
                </Typography>
                <Stack spacing={1} direction="row">
                  <FilterInput placeholder="Min Price" {...getFieldProps('minPrice')} />
                  <FilterInput placeholder="Max price" {...getFieldProps('maxPrice')} />
                </Stack>
              </InputWrapper>
            </MHidden>
          </Grid>
          <Grid item md={2} sm={6}>
            <MHidden width={showFilter ? 'xlUp' : 'mdDown'}>
              <InputWrapper>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  No. of beds
                </Typography>
                <FilterInput {...getFieldProps('bedroom')} />
              </InputWrapper>
            </MHidden>
          </Grid>
        </Grid>
        <Box sx={{ marginTop: 2, textAlign: 'right' }}>
          <Link
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => (!showFilter ? setShowFilter(true) : setShowFilter(false))}
          >
            {!showFilter ? 'Show all filters' : 'Hide filters'}
          </Link>
        </Box>
      </Form>
    </FormikProvider>
  );
}
