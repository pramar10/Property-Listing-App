import { View, Text } from 'react-native';
import tw from 'twrnc';
import useGlobalStore from '../store/BookingsStore';

export default function Profile() {
  const { profile } = useGlobalStore();

  if (!profile) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-gray-500 text-base`}>No profile data found.</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[#f0f4f8] p-6`}>
      <Text style={tw`text-3xl font-bold text-blue-900 mb-6`}>Profile</Text>

      <View style={tw`bg-white rounded-2xl p-5 shadow-md`}>
        <Text style={tw`text-xl font-semibold text-gray-900 mb-2`}>
          👤 {profile.name}
        </Text>
        <Text style={tw`text-base text-gray-700 mb-2`}>📧 {profile.email}</Text>
        <Text style={tw`text-sm text-gray-500`}>
          📦 Bookings: {profile.bookings.length}
        </Text>
      </View>
    </View>
  );
}
