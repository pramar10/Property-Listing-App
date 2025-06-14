import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import tw from 'twrnc';
import { Property } from '../types';

export default function PropertyCard({ property }: { property: Property }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/property/${property.id}`)}
      style={tw`mb-5 rounded-2xl bg-white shadow-lg overflow-hidden border border-gray-200`}
    >
      <Image
        source={{ uri: property.images[0] }}
        style={tw`h-48 w-full`}
        resizeMode="cover"
      />

      <View style={tw`p-4`}>
        <Text style={tw`text-lg font-bold text-gray-900 mb-1`}>
          {property.title}
        </Text>

        <Text style={tw`text-sm text-gray-600 mb-1`}>
          📍 {property.location.city}, {property.location.state}
        </Text>

        <Text style={tw`text-base font-semibold text-emerald-600 mb-2`}>
          ₹{property.price.toLocaleString('en-IN')} / month
        </Text>

        <Text style={tw`text-xs text-gray-500`}>
          {property.features.slice(0, 3).join(' • ')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
