//
import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import personOutline from '@iconify/icons-eva/person-outline';
import fileAddOutline from '@iconify/icons-eva/file-add-outline';
import listOutline from '@iconify/icons-eva/list-outline';
// import powerOutline from '@iconify/icons-eva/power-outline';
import inspect from '@iconify/icons-eva/eye-off-2-fill';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={25} height={25} />;

const sidebarConfig = [
  {
    title: 'Dashboard',
    path: PATH_DASHBOARD.root,
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'My Listings',
    path: PATH_DASHBOARD.listings,
    icon: getIcon('gridicons:multiple-users')
  },
  {
    title: 'Add Listing',
    path: PATH_DASHBOARD.new,
    icon: getIcon(fileAddOutline)
  },
  {
    title: 'Inspections',
    path: PATH_DASHBOARD.inspections,
    icon: getIcon(inspect)
  },
  {
    title: 'Account',
    path: PATH_DASHBOARD.account,
    icon: getIcon(personOutline)
  }
];

export default sidebarConfig;
