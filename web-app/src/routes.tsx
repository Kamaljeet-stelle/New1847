import { Navigate, Outlet } from 'react-router-dom';
import { AppShell } from './layouts/AppShell';
import { BookingLayout } from './layouts/BookingLayout';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceMenuPage } from './pages/ServiceMenuPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { LoungesPage } from './pages/LoungesPage';
import { LoungeDetailPage } from './pages/LoungeDetailPage';
import { SchedulePage } from './pages/SchedulePage';
import { ReviewPage } from './pages/ReviewPage';
import { ConfirmPage } from './pages/ConfirmPage';
import { ShopPage } from './pages/ShopPage';
import { AppointmentsPage } from './pages/AppointmentsPage';
import { InboxPage } from './pages/InboxPage';
import { AccountPage } from './pages/AccountPage';
import { ProfilePage } from './pages/ProfilePage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ReferralPage } from './pages/ReferralPage';
import { PackagesPage } from './pages/PackagesPage';
import { NotificationSettingsPage } from './pages/NotificationSettingsPage';
import { JournalPage } from './pages/JournalPage';
import {
  AboutPage,
  CarePage,
  FaqPage,
  PricesPage,
  PrivacyPage,
  PrivatePage,
  TermsPage,
} from './pages/ContentPages';
import { ContactPage } from './pages/ContactPage';
import { RequestsPage } from './pages/RequestsPage';

export const appRoutes = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'services/item/:serviceId', element: <ServiceDetailPage /> },
      { path: 'services/:category', element: <ServiceMenuPage /> },
      { path: 'lounges', element: <LoungesPage /> },
      { path: 'lounges/:loungeId', element: <LoungeDetailPage /> },
      { path: 'shop', element: <ShopPage /> },
      { path: 'shop/:occasion', element: <ShopPage /> },
      { path: 'appointments', element: <AppointmentsPage /> },
      { path: 'inbox', element: <InboxPage /> },
      { path: 'account', element: <AccountPage /> },
      { path: 'account/profile', element: <ProfilePage /> },
      { path: 'account/payments', element: <PaymentsPage /> },
      { path: 'account/referral', element: <ReferralPage /> },
      { path: 'account/packages', element: <PackagesPage /> },
      { path: 'account/settings/notifications', element: <NotificationSettingsPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'journal/:articleId', element: <JournalPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'care', element: <CarePage /> },
      { path: 'private', element: <PrivatePage /> },
      { path: 'prices', element: <PricesPage /> },
      { path: 'faq', element: <FaqPage /> },
      { path: 'privacy', element: <PrivacyPage /> },
      { path: 'terms', element: <TermsPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'requests', element: <RequestsPage /> },
      {
        path: 'book',
        element: <BookingLayout />,
        children: [
          { path: 'schedule', element: <SchedulePage /> },
          { path: 'review', element: <ReviewPage /> },
          { path: 'confirm/:bookingId', element: <ConfirmPage /> },
        ],
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

/** Kept for clarity if anything still imports a routes element. */
export function AppRoutesElement() {
  return <Outlet />;
}
