import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_PAGE } from '../../routes/paths';
// utils
import { fCurrency, fNumber } from '../../utils/formatNumber';
//
// import Label from '../Label';

// ----------------------------------------------------------------------

const HostelImgStyle = styled('img')({
  width: '100%',
  borderRadius: '15px',
  height: '228px',
  objectFit: 'cover',
  borderWidth: '1px',
  borderColor: '#e9e9e9',
  borderStyle: 'solid'
});

// ----------------------------------------------------------------------

HostelCard.propTypes = {
  hostel: PropTypes.object
};

export default function HostelCard({ hostel }) {
  const {
    title,
    name,
    images,
    prices,
    area,
    state,
    pricePerWhat,
    // available,
    // _id,
    urlId,
    bedrooms,
    bathrooms
  } = hostel;

  const linkTo = `${PATH_PAGE.hostels}/${urlId}`;
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        boxShadow: '0',
        p: 1,
        borderRadius: '15px',
        backgroundColor: '#fff',
        cursor: 'pointer'
      }}
      onClick={() => navigate(linkTo)}
    >
      <Box sx={{ position: 'relative' }}>
        {/* {available && (
          <Label
            variant="filled"
            color="info"
            sx={{
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            available
          </Label>
        )} */}
        <HostelImgStyle alt={title} src={images[0]} />
      </Box>

      <Stack spacing={1.2} py={2} px={1}>
        <Stack spacing={1}>
          <Typography variant="h6" noWrap>
            {name}
          </Typography>
          <Stack spacing={1} direction="row" sx={{ alignItems: 'center' }}>
            <LocationIcon />
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {`${area}, ${state}`}
            </Typography>
          </Stack>

          <Typography variant="overline" noWrap color="text.secondary">
            Bedrooms {fNumber(bedrooms)} &bull; Bathrooms {fNumber(bathrooms)}
          </Typography>
          <Typography variant="subtitle1">{`${fCurrency(
            prices?.price
          )}/${pricePerWhat}`}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

const LocationIcon = () => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 17 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="s-mr-1"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.2702 7.5583C10.2702 6.5799 9.47739 5.78711 8.49971 5.78711C7.52131 5.78711 6.72852 6.5799 6.72852 7.5583C6.72852 8.53598 7.52131 9.32878 8.49971 9.32878C9.47739 9.32878 10.2702 8.53598 10.2702 7.5583Z"
      stroke="#4B4F63"
      strokeLinecap="round"
      strokeLinejoin="round"
    />{' '}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.49965 14.9961C7.65073 14.9961 3.1875 11.3824 3.1875 7.60342C3.1875 4.64496 5.56545 2.24609 8.49965 2.24609C11.4339 2.24609 13.8125 4.64496 13.8125 7.60342C13.8125 11.3824 9.34857 14.9961 8.49965 14.9961Z"
      stroke="#4B4F63"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
