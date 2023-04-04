// routes
import { PATH_PAGE } from '../../routes/paths';

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
    title: 'Request',
    path: '#',
    children: [
      {
        subheader: 'Request',
        items: [
          { title: 'Special Request', path: PATH_PAGE.specialRequest },
          { title: 'Roommate Request', path: PATH_PAGE.roommateRequest }
        ]
      }
    ]
  },
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
