import { PATH_AGENT } from '../../routes/paths';

// ----------------------------------------------------------------------

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: PATH_AGENT.root
  },
  {
    title: 'My hostels',
    path: PATH_AGENT.listings
  },
  {
    title: 'Add hostel',
    path: PATH_AGENT.new
  },
  {
    title: 'Payments',
    path: PATH_AGENT.payments
  },

  {
    title: 'Account',
    path: PATH_AGENT.account
  }
];

export default sidebarConfig;
