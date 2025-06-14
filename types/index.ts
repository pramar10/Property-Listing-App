export interface Property {
  id: string;
  title: string;
  price: number;
  features: string[];
  images: string[];
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
}

export type Booking = {
  id: string;
  propertyId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  status: '';
};

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  bookings: string[];
};
