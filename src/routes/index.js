import { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ReactGA from 'react-ga';
import DashboardLayout from '../layouts/dashboard';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import Footer from '../layouts/Footer';
import * as Pages from '../pages';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import MainLayout from '../layouts/main';
// ----------------------------------------------------------------------

export default function Router() {
  const memberRoles = ['Member'];
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);
  return useRoutes([
    {
      path: '/',
      element: (
        <>
          <MainLayout />
          <Footer />
        </>
      ),
      children: [
        { path: '/', element: <Pages.Home /> },
        { path: '/faqs', element: <Pages.Faqs /> },
        { path: '/list-your-hostel', element: <Pages.ListYourHostel /> },
        // { path: '/become-an-agent', element: <WorkWithUs /> },
        { path: '/hostels', element: <Pages.Hostels /> },
        { path: '/hostels/:id', element: <Pages.HostelDetail /> },
        { path: '/hostels/:id/payment', element: <Pages.ManualPayment /> },
        { path: '/legal/privacy-policy', element: <Pages.PrivacyPolicy /> },
        { path: '/about', element: <Pages.About /> },
        { path: '/legal/privacy-policy', element: <Pages.PrivacyPolicy /> },
        { path: '/careers', element: <Pages.Careers /> },
        { path: '/legal/terms-conditions', element: <Pages.TermsAndConditions /> },
        { path: '/roommate-request', element: <Pages.RoommateRequest /> },
        { path: '/special-request', element: <Pages.SendRequest /> },
        { path: '/contact-us', element: <Pages.Contact /> },
        { path: '/404', element: <Pages.NotFound /> }
      ]
    },

    {
      element: <Pages.Receipt />,
      path: '/hostels/:id/payment/receipt/:receiptid'
    },

    // TENANT ROUTE
    {
      path: 'renter',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={memberRoles}>
            <DashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Pages.CustomerOverview /> },
        { element: <Pages.Bookings />, path: 'bookings' },
        { path: 'account-setting', element: <Pages.UserAccount /> },
        { path: 'referral', element: <Pages.Referral /> },
        { path: 'payment-history', element: <Pages.PaymentHistory /> },
        { path: 'payment-history/:id', element: <Pages.Receipt /> }
      ]
    },

    {
      element: <GuestGuard />,
      children: [
        { path: '/login', element: <Pages.Login /> },
        { path: '/register', element: <Pages.Register /> },
        { path: '/forgot-password', element: <Pages.ForgotPassword /> },
        { path: '/password-reset-success', element: <Pages.PasswordResetSuccess /> },
        { path: '/reset-password/:token', element: <Pages.ResetPassword /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" /> }
  ]);
}
