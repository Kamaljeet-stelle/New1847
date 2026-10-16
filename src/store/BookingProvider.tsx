import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { createId } from '../utils/dates';
import {
  defaultProfile,
  emptyDraft,
  type Booking,
  type BookingDraft,
  type Inquiry,
  type InquiryKind,
  type NoticePrefs,
  type Profile,
  type SavedCard,
} from '../types/catalog';

type InquiryDraft = {
  kind: InquiryKind;
  name: string;
  email: string;
  phone: string;
  message: string;
};

type BookingContextValue = {
  draft: BookingDraft;
  bookings: Booking[];
  inquiries: Inquiry[];
  profile: Profile;
  signedIn: boolean;
  selectedLoungeId: string;
  cards: SavedCard[];
  notices: NoticePrefs;
  updateDraft: (patch: Partial<BookingDraft>) => void;
  resetDraft: () => void;
  saveBooking: () => Booking;
  saveInquiry: (draft: InquiryDraft) => Inquiry;
  updateProfile: (next: Profile) => void;
  setSelectedLounge: (id: string) => void;
  addCard: (card: Omit<SavedCard, 'id'>) => void;
  removeCard: (id: string) => void;
  updateNotices: (patch: Partial<NoticePrefs>) => void;
  readNoticeIds: string[];
  markNoticesRead: (ids: string[]) => void;
  signOut: () => void;
  deleteAccount: () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft>(emptyDraft);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [signedIn, setSignedIn] = useState(true);
  const [selectedLoungeId, setSelectedLoungeId] = useState('al-qana');
  const [cards, setCards] = useState<SavedCard[]>([]);
  const [notices, setNotices] = useState<NoticePrefs>({
    appointments: true,
    offers: false,
  });
  const [readNoticeIds, setReadNoticeIds] = useState<string[]>([]);

  const updateDraft = useCallback((patch: Partial<BookingDraft>) => {
    setDraft(current => ({ ...current, ...patch }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(emptyDraft);
  }, []);

  const saveBooking = useCallback(() => {
    const booking: Booking = {
      ...draft,
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      note: draft.note.trim(),
      id: createId('bk'),
      createdAt: new Date().toISOString(),
    };
    setBookings(current => [booking, ...current]);
    setDraft(emptyDraft);
    return booking;
  }, [draft]);

  const saveInquiry = useCallback((next: InquiryDraft) => {
    const inquiry: Inquiry = {
      ...next,
      name: next.name.trim(),
      email: next.email.trim(),
      phone: next.phone.trim(),
      message: next.message.trim(),
      id: createId('in'),
      createdAt: new Date().toISOString(),
    };
    setInquiries(current => [inquiry, ...current]);
    return inquiry;
  }, []);

  const updateProfile = useCallback((next: Profile) => {
    setProfile({
      ...next,
      firstName: next.firstName.trim(),
      lastName: next.lastName.trim(),
      email: next.email.trim(),
      phone: next.phone.trim(),
    });
    setSignedIn(true);
  }, []);

  const setSelectedLounge = useCallback((id: string) => {
    setSelectedLoungeId(id);
  }, []);

  const addCard = useCallback((card: Omit<SavedCard, 'id'>) => {
    setCards(current => [{ ...card, id: createId('card') }, ...current]);
  }, []);

  const removeCard = useCallback((id: string) => {
    setCards(current => current.filter(card => card.id !== id));
  }, []);

  const updateNotices = useCallback((patch: Partial<NoticePrefs>) => {
    setNotices(current => ({ ...current, ...patch }));
  }, []);

  const markNoticesRead = useCallback((ids: string[]) => {
    setReadNoticeIds(current => Array.from(new Set([...current, ...ids])));
  }, []);

  const signOut = useCallback(() => {
    setSignedIn(false);
  }, []);

  const deleteAccount = useCallback(() => {
    setSignedIn(false);
    setProfile({ ...defaultProfile, firstName: '', lastName: '' });
    setBookings([]);
    setInquiries([]);
    setCards([]);
    setReadNoticeIds([]);
    setDraft(emptyDraft);
  }, []);

  const value = useMemo(
    () => ({
      draft,
      bookings,
      inquiries,
      profile,
      signedIn,
      selectedLoungeId,
      cards,
      notices,
      updateDraft,
      resetDraft,
      saveBooking,
      saveInquiry,
      updateProfile,
      setSelectedLounge,
      addCard,
      removeCard,
      updateNotices,
      readNoticeIds,
      markNoticesRead,
      signOut,
      deleteAccount,
    }),
    [
      addCard,
      bookings,
      cards,
      deleteAccount,
      draft,
      inquiries,
      markNoticesRead,
      notices,
      readNoticeIds,
      profile,
      removeCard,
      resetDraft,
      saveBooking,
      saveInquiry,
      selectedLoungeId,
      setSelectedLounge,
      signOut,
      signedIn,
      updateDraft,
      updateNotices,
      updateProfile,
    ],
  );

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}
