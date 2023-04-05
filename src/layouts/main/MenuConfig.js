// routes
import { PATH_PAGE } from '../../routes/paths';

// ----------------------------------------------------------------------

const menuConfig = [
  {
    title: 'Hostels',
    path: PATH_PAGE.hostels
  },

  { title: 'Get a roommate', path: PATH_PAGE.roommateRequest },
  {
    title: 'List your hostel',
    path: PATH_PAGE.listYourHostel
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
