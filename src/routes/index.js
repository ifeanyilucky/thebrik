import { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import ReactGA from 'react-ga';
import DashboardLayout from '../layouts/dashboard';
import AgentDashboardLayout from '../layouts/agent';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import Footer from '../layouts/Footer';
import {
  Home,
  Hostels,
  SendRequest,
  Register,
  Login,
  About,
  Faqs,
  NotFound,
  PrivacyPolicy,
  TermsAndConditions,
  ForgotPassword,
  PasswordResetSuccess,
  ResetPassword,
  Listings,
  AgentInspections,
  AgentOverview,
  RoommateRequest,
  UserAccount,
  CreateHostel,
  HostelDetail,
  Payments,
  WorkWithUs,
  PaymentHistory,
  Contact
  // AdminApp
} from '../pages';
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import MainLayout from '../layouts/main';
import { CustomerOverview, Bookings } from '../pages/renters';
// ----------------------------------------------------------------------

export default function Router() {
  const agentRoles = ['Host'];
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
        { path: '/', element: <Home /> },
        { path: '/faqs', element: <Faqs /> },
        { path: '/become-an-agent', element: <WorkWithUs /> },
        { path: '/hostels', element: <Hostels /> },
        { path: '/hostels/:id', element: <HostelDetail /> },
        { path: '/legal/privacy-policy', element: <PrivacyPolicy /> },
        { path: '/about', element: <About /> },
        { path: '/legal/privacy-policy', element: <PrivacyPolicy /> },
        { path: '/legal/terms-conditions', element: <TermsAndConditions /> },
        { path: '/special-request', element: <SendRequest /> },
        { path: '/contact-us', element: <Contact /> },
        { path: '/404', element: <NotFound /> }
      ]
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
        { element: <CustomerOverview /> },
        { element: <Bookings />, path: 'bookings' },
        { path: 'account-setting', element: <UserAccount /> },
        { path: 'payment-history', element: <PaymentHistory /> },
        { path: 'room-mate-request', element: <RoommateRequest /> }
      ]
    },
    // AGENT ROUTE
    {
      path: 'host',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={agentRoles}>
            <AgentDashboardLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <AgentOverview /> },
        // { path: '/index', element:  },
        { path: 'listings', element: <Listings /> },
        { path: 'account-setting', element: <UserAccount /> },
        { path: 'payments', element: <Payments /> },
        { path: 'inspections', element: <AgentInspections /> },
        { path: 'listings/new', element: <CreateHostel /> },
        { path: 'listings/:id/edit', element: <CreateHostel /> }
      ]
    },

    {
      element: <GuestGuard />,
      children: [
        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/forgot-password', element: <ForgotPassword /> },
        { path: '/password-reset-success', element: <PasswordResetSuccess /> },
        { path: '/reset-password/:token', element: <ResetPassword /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" /> }
  ]);
}
