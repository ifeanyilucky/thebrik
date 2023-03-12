// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/';
const ROOTS_DASHBOARD = '/renter';
const ROOTS_AGENT = '/host';
const ROOTS_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  forgotPassword: path(ROOTS_AUTH, '/forgot-password')
};

export const PATH_PAGE = {
  about: '/about',
  hostels: '/hostels',
  contact: '/contact',
  faqs: '/faqs',
  privacyPolicy: '/legal/privacy-policy',
  termsAndConditions: '/legal/terms-conditions',
  maintenance: '/maintenance',
  comingSoon: '/coming-soon',
  page404: '/404',
  page500: '/500',
  becomeAgent: '/become-an-agent',
  specialRequest: '/special-request'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  bookings: path(ROOTS_DASHBOARD, '/bookings'),
  payment: path(ROOTS_DASHBOARD, '/payment'),
  hostels: path(ROOTS_DASHBOARD, '/hostels'),
  inspections: path(ROOTS_DASHBOARD, '/inspections'),
  account: path(ROOTS_DASHBOARD, '/account-setting'),
  roommateRequest: path(ROOTS_DASHBOARD, '/room-mate-request'),
  saved: path(ROOTS_DASHBOARD, '/saved'),
  invoice: path(ROOTS_DASHBOARD, '/invoice'),
  paymentHistory: path(ROOTS_DASHBOARD, '/payment-history')
};
export const PATH_AGENT = {
  root: ROOTS_AGENT,
  listings: path(ROOTS_AGENT, '/listings'),
  new: path(ROOTS_AGENT, '/listings/new'),
  payments: path(ROOTS_AGENT, '/payments'),
  inspections: path(ROOTS_AGENT, '/inspections'),
  account: path(ROOTS_AGENT, '/account-setting')
};

export const PATH_ADMIN = {
  root: path(ROOTS_ADMIN, '/index'),
  inspections: path(ROOTS_ADMIN, '/index'),
  agents: path(ROOTS_ADMIN, '/agents'),
  tenant: path(ROOTS_ADMIN, '/tenant')
};
