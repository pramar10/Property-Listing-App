import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import tw from 'twrnc';
import { Property } from '../../types';
import { getPropertyById } from '../../utils/api';

export default function PropertyDetailScreen() {
  const { id } = useLocalSearchParams();
  const { data, isLoading, isError } = useQuery<Property>({
    queryKey: ['property', id],
    queryFn: () => getPropertyById(id as string),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={tw`mt-2 text-gray-600`}>Loading property...</Text>
      </View>
    );
  }

  if (isError || !data) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white`}>
        <Text style={tw`text-red-500 text-lg`}>Failed to load property.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`flex-1 bg-[#f8fafc]`}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`mb-4`}
      >
        {data.images.map((img: string, idx: number) => (
          <Image
            key={idx}
            source={{ uri: img }}
            style={tw`w-80 h-52 mr-3 rounded-xl ml-4`}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View style={tw`px-4 pb-8`}>
        <Text style={tw`text-3xl font-bold text-gray-900 mb-2`}>
          {data.title}
        </Text>

        <Text style={tw`text-lg text-emerald-600 font-semibold mb-4`}>
          ₹{data.price.toLocaleString('en-IN')} / month
        </Text>
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-semibold text-blue-700 mb-1`}>
            🗺️ Location
          </Text>
          <Text style={tw`text-gray-700 text-base`}>
            {data.location.address}, {data.location.city}, {data.location.state}
          </Text>
        </View>
        <View>
          <Text style={tw`text-lg font-semibold text-blue-700 mb-2`}>
            🛠️ Features
          </Text>
          {data.features.map((feature: string, idx: number) => (
            <Text key={idx} style={tw`text-gray-800 text-sm mb-1`}>
              • {feature}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
