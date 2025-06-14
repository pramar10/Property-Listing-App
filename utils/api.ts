export const API_URL = 'http://10.0.2.2:3000';

export const getProperties = async () => {
  const res = await fetch(`${API_URL}/properties`);
  return res.json();
};
export const getBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
};
export const getuserProfile = async () => {
  const res = await fetch(`${API_URL}/profile`);
  return res.json();
};

export const getPropertyById = async (id: string) => {
  const res = await fetch(`${API_URL}/properties/${id}`);
  return res.json();
};
