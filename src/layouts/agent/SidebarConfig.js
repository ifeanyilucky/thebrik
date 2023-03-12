//
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import personOutline from '@iconify/icons-eva/person-outline';
import fileAddOutline from '@iconify/icons-eva/file-add-outline';
import listOutline from '@iconify/icons-eva/list-outline';
// import powerOutline from '@iconify/icons-eva/power-outline';
import inspect from '@iconify/icons-eva/eye-off-2-fill';
import { PATH_AGENT } from '../../routes/paths';
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={20} height={20} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: PATH_AGENT.root,
    icon: getIcon('bxs:dashboard')
  },
  {
    title: 'My hostels',
    path: PATH_AGENT.listings,
    icon: getIcon('bxs:building-house')
  },
  {
    title: 'Add hostel',
    path: PATH_AGENT.new,
    icon: getIcon(fileAddOutline)
  },
  {
    title: 'Payments',
    path: PATH_AGENT.payments,
    icon: getIcon(fileAddOutline)
  },

  {
    title: 'Account',
    path: PATH_AGENT.account,
    icon: getIcon(personOutline)
  }
];

export default sidebarConfig;
