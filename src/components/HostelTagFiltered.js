import { filter } from 'lodash';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Chip, Typography, Stack, Button } from '@mui/material';
import { fCurrency } from '../utils/formatNumber';

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center'
});

const WrapperStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  overflow: 'hidden',
  alignItems: 'stretch',
  margin: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`
}));

const LabelStyle = styled((props) => (
  <Typography component="span" variant="subtitle2" {...props} />
))(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderRight: `solid 1px ${theme.palette.divider}`
}));

HostelTagFiltered.propTypes = {
  formik: PropTypes.object,
  filters: PropTypes.object,
  isDefault: PropTypes.bool,
  onResetFilter: PropTypes.func
};

export default function HostelTagFiltered({ formik, filters, isDefault, onResetFilter }) {
  const { values, handleSubmit, setFieldValue, initialValues } = formik;
  const { priceRange, area, areaSearch } = filters;
  const isShow = values !== initialValues;

  const handleRemoveMaxPrice = () => {
    handleSubmit();
    setFieldValue('maxPrice', '');
  };
  const handleRemoveMinPrice = () => {
    handleSubmit();
    setFieldValue('minPrice', '');
  };
  const handleRemoveArea = () => {
    handleSubmit();
    setFieldValue('area', '');
  };
  const handleRemoveBeds = () => {
    handleSubmit();
    setFieldValue('bedroom', '');
  };
  return (
    <RootStyle>
      {values.minPrice && (
        <WrapperStyle>
          <LabelStyle>Min price:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              label={fCurrency(values.minPrice)}
              size="small"
              onDelete={() => handleRemoveMinPrice()}
              sx={{ m: 0.5, fontWeight: '500' }}
            />
          </Stack>
        </WrapperStyle>
      )}
      {values.maxPrice && (
        <WrapperStyle>
          <LabelStyle>Max price:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              label={fCurrency(values.maxPrice)}
              size="small"
              onDelete={() => handleRemoveMaxPrice()}
              sx={{ m: 0.5, fontWeight: '500' }}
            />
          </Stack>
        </WrapperStyle>
      )}
      {values.area && (
        <WrapperStyle>
          <LabelStyle>Area:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              label={values.area}
              size="small"
              onDelete={() => handleRemoveArea()}
              sx={{ m: 0.5, fontWeight: '500' }}
            />
          </Stack>
        </WrapperStyle>
      )}
      {values.bedroom && (
        <WrapperStyle>
          <LabelStyle>bed:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip
              label={`${values.bedroom} bedroom`}
              size="small"
              onDelete={() => handleRemoveBeds()}
              sx={{ m: 0.5, fontWeight: '500' }}
            />
          </Stack>
        </WrapperStyle>
      )}

      {isShow && !isDefault && (
        <Button
          color="error"
          size="small"
          type="button"
          onClick={onResetFilter}
          startIcon={<Icon icon={roundClearAll} />}
        >
          Clear All
        </Button>
      )}
    </RootStyle>
  );
}
