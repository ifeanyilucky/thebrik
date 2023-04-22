import { useState } from 'react';
import PropTypes from 'prop-types';
import { FormikProvider, Form } from 'formik';

import { Box, Typography, Grid, Link, Stack, MenuItem, TextField, Button } from '@mui/material';
import { styled } from '@mui/styles';
import chevronRight from '@iconify/icons-eva/chevron-right-fill';
import { MHidden } from './@material-extend';
import Iconify from './Iconify';

// ------------------------------------------------------------------------

const InputWrapper = styled('div')({
  borderColor: 'rgb(69 69 69 / 0.3)',
  borderWidth: '1px',
  borderStyle: 'solid',
  padding: '0.875rem 1rem',
  borderRadius: '0.75rem',
  display: 'flex',
  flexFlow: 'column'
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
  const { getFieldProps, values, handleSubmit } = formik;
  const [showFilter, setShowFilter] = useState(false);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
          <Grid item md={6} sm={12} xs={12}>
            <InputWrapper label="preferred apartment">
              <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                Preferred apartment
              </Typography>
              <Stack direction="row">
                <FilterInput type="search" {...getFieldProps('title')} />
                <MHidden width={'mdUp'}>
                  {!values.title.length ? (
                    ''
                  ) : (
                    <Button type="submit" variant="contained" size="small">
                      Submit
                    </Button>
                  )}{' '}
                </MHidden>
              </Stack>
            </InputWrapper>
          </Grid>

          <Grid item md={2} sm={12} xs={12} sx={{ width: '100%' }}>
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
          <Grid item md={2} sm={4} xs={4}>
            <MHidden width={showFilter ? 'xlUp' : 'mdDown'}>
              <TextField
                select
                {...getFieldProps('bedroom')}
                label="Available bedroom"
                fullWidth
                sx={{ outline: 'none', border: 'none' }}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="1">1 bedroom</MenuItem>
                <MenuItem value={'2'}>2 bedroom</MenuItem>
                <MenuItem value="3">3 bedroom</MenuItem>
                <MenuItem value={'4'}>4+ bedroom</MenuItem>
              </TextField>
            </MHidden>
          </Grid>
          <Grid item sm={4} xs={4} md={2}>
            <MHidden width={showFilter ? 'xlUp' : 'mdDown'}>
              <Button
                size="large"
                type="submit"
                variant="contained"
                endIcon={<Iconify icon={chevronRight} />}
              >
                Submit
              </Button>
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
