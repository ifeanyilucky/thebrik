import { PATH_DASHBOARD } from '../../routes/paths';
// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: PATH_DASHBOARD.root
  },
  {
    title: 'Bookings',
    path: PATH_DASHBOARD.bookings
  },

  {
    title: 'Payment',
    path: PATH_DASHBOARD.paymentHistory
  },
  {
    title: 'Referral',
    path: PATH_DASHBOARD.referral
  },

  {
    title: 'Account',
    path: PATH_DASHBOARD.account
  }
];

export default sidebarConfig;
