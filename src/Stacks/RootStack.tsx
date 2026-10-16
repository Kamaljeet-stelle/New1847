import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from '../navigation/BottomTabs';
import { AboutScreen } from '../screens/AboutScreen/AboutScreen';
import { AddCardScreen } from '../screens/AddCardScreen/AddCardScreen';
import { AppointmentsScreen } from '../screens/AppointmentsScreen/AppointmentsScreen';
import { ArticleScreen } from '../screens/ArticleScreen/ArticleScreen';
import { CareScreen } from '../screens/CareScreen/CareScreen';
import { ConfirmScreen } from '../screens/ConfirmScreen/ConfirmScreen';
import { ContactScreen } from '../screens/ContactScreen/ContactScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen/EditProfileScreen';
import { FaqScreen } from '../screens/FaqScreen/FaqScreen';
import { JournalScreen } from '../screens/JournalScreen/JournalScreen';
import { LoungeDetailScreen } from '../screens/LoungeDetailScreen/LoungeDetailScreen';
import { LoungesScreen } from '../screens/LoungesScreen/LoungesScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen/NotificationSettingsScreen';
import { NotificationsScreen } from '../screens/NotificationsScreen/NotificationsScreen';
import { PackagesScreen } from '../screens/PackagesScreen/PackagesScreen';
import { PaymentsScreen } from '../screens/PaymentsScreen/PaymentsScreen';
import { PricesScreen } from '../screens/PricesScreen/PricesScreen';
import { PrivacyScreen } from '../screens/PrivacyScreen/PrivacyScreen';
import { PrivateScreen } from '../screens/PrivateScreen/PrivateScreen';
import { ReferralScreen } from '../screens/ReferralScreen/ReferralScreen';
import { RequestsScreen } from '../screens/RequestsScreen/RequestsScreen';
import { ReviewScreen } from '../screens/ReviewScreen/ReviewScreen';
import { ScheduleScreen } from '../screens/ScheduleScreen/ScheduleScreen';
import { ServiceDetailScreen } from '../screens/ServiceDetailScreen/ServiceDetailScreen';
import { ServiceMenuScreen } from '../screens/ServiceMenuScreen/ServiceMenuScreen';
import { TermsScreen } from '../screens/TermsScreen/TermsScreen';
import { VoucherScreen } from '../screens/VoucherScreen/VoucherScreen';
import type { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="ServiceMenu" component={ServiceMenuScreen} />
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="Lounges" component={LoungesScreen} />
        <Stack.Screen name="LoungeDetail" component={LoungeDetailScreen} />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Appointments" component={AppointmentsScreen} />
        <Stack.Screen name="Payments" component={PaymentsScreen} />
        <Stack.Screen name="AddCard" component={AddCardScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen} />
        <Stack.Screen name="Terms" component={TermsScreen} />
        <Stack.Screen name="Article" component={ArticleScreen} />
        <Stack.Screen name="Confirm" component={ConfirmScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Journal" component={JournalScreen} />
        <Stack.Screen name="Prices" component={PricesScreen} />
        <Stack.Screen name="Private" component={PrivateScreen} />
        <Stack.Screen name="Care" component={CareScreen} />
        <Stack.Screen name="Vouchers" component={VoucherScreen} />
        <Stack.Screen name="Faq" component={FaqScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Requests" component={RequestsScreen} />
        <Stack.Screen name="Referral" component={ReferralScreen} />
        <Stack.Screen name="Packages" component={PackagesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export type { RootStackParamList };
