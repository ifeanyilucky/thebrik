import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import personOutline from '@iconify/icons-eva/person-outline';
import fileAddOutline from '@iconify/icons-eva/file-add-outline';
// import powerOutline from '@iconify/icons-eva/power-outline';
// import barChart2Outline from '@iconify/icons-eva/bar-chart-2-outline';
import inspect from '@iconify/icons-eva/eye-off-2-fill';
import roommateRequest from '@iconify/icons-ant-design/usergroup-add-outline';
import findRoommate from '@iconify/icons-ant-design/user-switch-outlined';
import hostels from '@iconify/icons-eva/home-outline';
import payment from '@iconify/icons-ic/credit-card';
import { PATH_DASHBOARD } from '../../routes/paths';
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={20} height={20} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: PATH_DASHBOARD.root,
    icon: getIcon('material-symbols:dashboard-rounded')
  },
  {
    title: 'Bookings',
    path: PATH_DASHBOARD.bookings,
    icon: getIcon('material-symbols:dashboard-rounded')
  },

  {
    title: 'Request roommate',
    path: PATH_DASHBOARD.roommateRequest,
    icon: getIcon('typcn:user-add')
  },

  {
    title: 'Payment',
    path: PATH_DASHBOARD.paymentHistory,
    icon: getIcon('fluent:payment-16-filled')
  },
  {
    title: 'Account',
    path: PATH_DASHBOARD.account,
    icon: getIcon('typcn:user')
  }
];

export default sidebarConfig;
