import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState } from 'react';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
// material
import { Container, Tab, Box, Tabs, Stack, Typography } from '@mui/material';
// redux
// import { useDispatch } from '../../redux/store';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
  AccountGeneral,
  AccountBilling,
  AccountChangePassword
} from '../../components/_dashboard/user/account';
import { useAuth } from '../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function UserAccount() {
  const [currentTab, setCurrentTab] = useState('profile');
  const { user } = useAuth();

  const ACCOUNT_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: !user ? null : <AccountGeneral account={user} />
    },
    {
      value: 'Bank_account_details',
      icon: <Icon icon={roundReceipt} width={20} height={20} />,
      component: <AccountBilling account={user} />
    },
    {
      value: 'security',
      icon: <Icon icon={roundVpnKey} width={20} height={20} />,
      component: <AccountChangePassword />
    }
  ];

  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const customerTab = ACCOUNT_TABS.filter((tabs) => tabs.value !== 'Bank_account_details');

  return (
    <Page title="Account Settings -  ">
      <Container maxWidth={'lg'}>
        <Typography variant="h5" sx={{ py: 4 }}>
          Account settings
        </Typography>

        <Stack spacing={5}>
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            onChange={handleChangeTab}
          >
            {user?.role === 'Member'
              ? customerTab.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    label={capitalCase(tab.value)}
                    icon={tab.icon}
                    value={tab.value}
                  />
                ))
              : ACCOUNT_TABS.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    label={capitalCase(tab.value)}
                    icon={tab.icon}
                    value={tab.value}
                  />
                ))}
          </Tabs>

          {ACCOUNT_TABS.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Box key={tab.value}>{tab.component}</Box>;
          })}
        </Stack>
      </Container>
    </Page>
  );
}
