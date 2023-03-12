// routes
import { PATH_AUTH, PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const menuConfig = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'Hostels',
    path: PATH_PAGE.hostels
  },
  {
    title: 'Become an agent',
    path: PATH_PAGE.becomeAgent
  },

  {
    title: 'FAQs',
    path: PATH_PAGE.faqs
  },
  {
    title: 'About us',
    path: PATH_PAGE.about
  }

  // {
  //   title: 'Legal',
  //   path: '#',
  //   children: [
  //     {
  //       subheader: 'Legal',
  //       items: [
  //         { title: 'Privacy Policy', path: PATH_PAGE.privacyPolicy },
  //         { title: 'Terms & Conditions', path: PATH_PAGE.termsAndConditions }
  //       ]
  //     }
  //   ]
  // }
];

export default menuConfig;
