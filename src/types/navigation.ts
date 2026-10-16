import type { NavigatorScreenParams } from '@react-navigation/native';
import type { InquiryKind, ServiceCategory } from './catalog';

export type LoungePurpose = 'browse' | 'home' | 'book';

export type TabParamList = {
  Home: undefined;
  Services: { query?: string } | undefined;
  Shop: undefined;
  Account: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList> | undefined;
  ServiceMenu: { category: ServiceCategory; serviceId?: string };
  ServiceDetail: { serviceId: string };
  Lounges: { purpose?: LoungePurpose; serviceId?: string } | undefined;
  LoungeDetail: { loungeId: string };
  Schedule: undefined;
  Review: undefined;
  Appointments: undefined;
  Confirm: { bookingId: string };
  Payments: undefined;
  AddCard: undefined;
  EditProfile: undefined;
  Notifications: undefined;
  NotificationSettings: undefined;
  Privacy: undefined;
  Terms: undefined;
  Article: { articleId: string };
  About: undefined;
  Journal: undefined;
  Prices: undefined;
  Private: undefined;
  Care: undefined;
  Vouchers: { occasion?: string } | undefined;
  Faq: undefined;
  Contact: { kind?: InquiryKind; prompt?: string } | undefined;
  Requests: undefined;
  Referral: undefined;
  Packages: undefined;
};

export type AppNavigationTypes = {
  root: RootStackParamList;
  tabs: TabParamList;
};
