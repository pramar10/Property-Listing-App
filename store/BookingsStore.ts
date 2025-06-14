import { create } from 'zustand';
import { Booking, Property, UserProfile } from '../types';

type GlobalStore = {
  properties: Property[];
  bookings: Booking[];
  profile: UserProfile | null;

  setProperties: (properties: Property[]) => void;
  setBooking: (booking: Booking[]) => void;
  setProfile: (profile: UserProfile) => void;
};

const useGlobalStore = create<GlobalStore>((set) => ({
  properties: [],
  bookings: [],
  profile: null,

  setProperties: (properties) => set({ properties }),
  setBooking: (bookings) => set({ bookings }),
  setProfile: (profile) => set({ profile }),
}));

export default useGlobalStore;
