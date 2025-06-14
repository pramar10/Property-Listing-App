import { useQuery } from '@tanstack/react-query';
import { TextInput, View, FlatList, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import PropertyCard from '../Components/PropertyCard';
import { getBookings, getProperties, getuserProfile } from '../utils/api';
import { useEffect, useState } from 'react';
import { Property } from '../types';
import useGlobalStore from '../store/BookingsStore';

export default function Home() {
  const [search, setSearch] = useState('');
  const { properties, setBooking, setProperties, setProfile } =
    useGlobalStore();
  const [filterData, setFilterData] = useState([]);
  const { data, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: getProperties,
  });
  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getuserProfile,
  });
  const { data: bookingData } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings,
  });
  useEffect(() => {
    setProperties(data);
    setBooking(bookingData);
    setProfile(userProfile);
    setFilterData(data);
  }, [data]);
  const searchHandler = (value: string) => {
    setSearch(value);
    const filtered = filterData.filter((property: Property) =>
      property.title.toLowerCase().includes(value.toLowerCase())
    );
    setProperties(filtered);
  };
  return (
    <View style={tw`p-4 bg-white flex-1`}>
      <TextInput
        placeholder="Search properties..."
        style={tw`border border-gray-300 p-2 rounded mb-4`}
        value={search}
        onChangeText={searchHandler}
      />
      {isLoading ? (
        <ActivityIndicator size={20} color={'blue'} />
      ) : (
        <FlatList
          data={properties}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: Property) => item.id}
          renderItem={({ item }) => <PropertyCard property={item} />}
        />
      )}
    </View>
  );
}
