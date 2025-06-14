import { View, Text, FlatList } from 'react-native';
import tw from 'twrnc';
import useGlobalStore from '../store/BookingsStore';

export default function Bookings() {
  const { bookings } = useGlobalStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <View style={tw`flex-1 bg-[#f0f4f8] px-4 pt-6`}>
      <Text style={tw`text-3xl font-bold text-blue-900 mb-4`}>My Bookings</Text>

      {bookings.length === 0 ? (
        <Text style={tw`text-gray-500 text-center mt-10`}>
          No bookings yet.
        </Text>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={tw`mb-4 p-5 rounded-2xl bg-white shadow-md`}>
              <View style={tw`flex-row justify-between items-center mb-2`}>
                <Text style={tw`text-lg font-semibold text-gray-900`}>
                  Booking #{item.id}
                </Text>
                <Text
                  style={tw`px-2 py-1 text-xs rounded-full font-semibold ${getStatusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </Text>
              </View>
              <Text style={tw`text-sm text-gray-600`}>
                📅 Check-In:{' '}
                <Text style={tw`text-gray-800`}>{item.checkIn}</Text>
              </Text>
              <Text style={tw`text-sm text-gray-600`}>
                🏁 Check-Out:{' '}
                <Text style={tw`text-gray-800`}>{item.checkOut}</Text>
              </Text>
              <Text style={tw`text-xs text-gray-400 mt-2`}>
                Property ID: {item.propertyId}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
