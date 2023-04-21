import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Stack, Typography, Box, Link, Button, FormHelperText } from '@mui/material';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import {
  TabsUnstyled,
  TabsListUnstyled,
  TabPanelUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
  buttonUnstyledClasses
} from '@mui/base';
import { useForm } from 'react-hook-form';
import InspectionBooking from './inspectionBooking';
import Payment from './payment';
import { PATH_PAGE, PATH_AUTH } from '../routes/paths';
import Iconify from './Iconify';
import PriceBreakdown from './payment/price-breakdown';

const Tab = styled(TabUnstyled)(
  ({ theme }) => `
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  font-family: inherit;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: ${theme.palette.primary.main};
  }
  &:focus {
    color: #fff;
    border-radius: 3px;
    outline: 2px solid ${theme.palette.main};
    outline-offset: 2px;
  }
  &.${tabUnstyledClasses.selected} {
    background-color: ${theme.palette.primary.light};
    color: white;
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`
);

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
  
  background-color: ${theme.palette.primary.main};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`
);

// ________________________________________________
// ________________________________________________

AgentCard.propTypes = {
  hostel: PropTypes.object,
  user: PropTypes.object
};
export default function AgentCard({ hostel, user }) {
  return (
    <>
      <Stack spacing={2}>
        <Stack>
          <FormHelperText style={{ marginBottom: '0.89', color: 'text.secondary' }}>
            Note: make sure you inspect hostel before paying.
          </FormHelperText>
        </Stack>
        <TabsUnstyled defaultValue={0}>
          <TabsList>
            <Tab>
              <Stack spacing={1.2} direction="row" alignItems="center">
                <Iconify icon="icon-park-solid:inspection" width={20} />
                <span>Book a viewing</span>
              </Stack>
            </Tab>
            <Tab>
              <Stack spacing={1.2} direction="row" alignItems="center">
                <Iconify icon="ri:secure-payment-fill" width={20} />
                <span>Pay</span>
              </Stack>
            </Tab>
          </TabsList>
          <TabPanel value={0}>
            <InspectionBooking user={user} hostel={hostel} />
          </TabPanel>
          <TabPanel value={1}>
            <PaymentContent hostel={hostel} user={user} />
          </TabPanel>
        </TabsUnstyled>
      </Stack>
    </>
  );
}

const PaymentContent = ({ hostel, user }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const redirectLogin = () => {
    navigate(`${PATH_AUTH.login}?redirect=${pathname}`);
  };
  const redirectRegister = () => {
    navigate(`${PATH_AUTH.register}?redirect=${pathname}`);
  };

  const { getValues } = useForm({
    defaultValues: {
      halfPayment: false
    }
  });
  const { halfPayment } = getValues();

  console.log(halfPayment);
  return (
    <Stack spacing={2}>
      <Stack spacing={2.7}>
        {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}
        <PriceBreakdown hostel={hostel} />

        <Stack spacing={2}>
          {!user ? (
            <Button
              fullWidth
              onClick={redirectLogin}
              variant="contained"
              size="large"
              sx={{ textTransform: 'capitalize' }}
            >
              Login
            </Button>
          ) : (
            <Box>
              {user.role === 'Member' ? (
                <>
                  <Payment user={user} hostel={hostel} />
                </>
              ) : (
                <Typography variant="body2" color="error.main" textAlign="center">
                  {' '}
                  You cannot make payment as an agent, Please{' '}
                  <Link onClick={redirectRegister}>register an account</Link>
                  &nbsp; as a renter
                </Typography>
              )}
            </Box>
          )}
        </Stack>
        <Typography variant="caption" sx={{ alignItems: 'center', textAlign: 'center' }}>
          By clicking "Pay" you accept Thebrik{' '}
          <Link component={RouterLink} underline="hover" to={PATH_PAGE.termsAndConditions}>
            Terms of service
          </Link>
        </Typography>
      </Stack>
    </Stack>
  );
};
PaymentContent.propTypes = {
  hostel: PropTypes.object,
  user: PropTypes.object
};
