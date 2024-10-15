import { Image, ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import FormField from '@/components/FormField/FormField';
import Slider from '@/components/Slider/Slider';
import TrendingList from '@/components/TrendingCard/TrendingList';
import { dataOfTrendingsCard } from '../helpers/MockData';

const home = () => {
  const [value, setvalue] = useState<string>('');
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-start w-full min-h-[80vh] px-4 py-[30px]">
          <View className="flex-row items-center justify-between w-full h-[50px]">
            <View className="flex-col">
              <Text className='text-[#CDCDE0] font-pregular text-[14px]'>Welcome Back</Text>
              <Text className='text-2xl text-white font-psemibold'>jsmasteru</Text>
            </View>
            <Image source={images.logoSmall} className="w-[35px] h-35px]" resizeMode="contain" />
          </View>
          <FormField
            search={true}
            placeholder="Search for a video topic"
            value={value}
            handleChangeText={(e: string) => {
              setvalue(e);
            }}
          />
          <Text className='my-[20px] font-pregular text-[#CDCDE0] text-sm'>Trending Videos</Text>
          <Slider /> 
          <TrendingList data={dataOfTrendingsCard} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
