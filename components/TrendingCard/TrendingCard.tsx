import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';

interface TrendingCardListProps {
  title: string;
  author: string;
  avatar: string;
  image: string;
}

const TrendingCard = ({ title, author, avatar, image }: TrendingCardListProps) => {
  return (
    <View className="relative ">
      <View className="flex-row gap-4 items-center">
        <View className="border-2 border-[#FFA500] rounded-full h-[52px] w-[52px] justify-center items-center">
          <Image
            source={{ uri: avatar }}
            resizeMode="cover"
            className="h-[45px] w-[45px] rounded-full"
          />
        </View>
        <View style={{ marginTop: 8 }}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            className="text-white font-extrabold w-full overflow-hidden"
          >
            {title.length > 34 ? `${title.slice(0, 34)}...` : title}
          </Text>
          <Text className="text-[#CDCDE0] font-pregular">{author}</Text>
        </View>
      </View>
      <Image
        source={{ uri: image }}
        resizeMode="cover"
        className="h-[200px] w-full rounded-lg mt-4"
      />
      <TouchableOpacity className="absolute top-1 right-[-5px] h-[23px] w-[21px]">
        <Image source={icons.menu} className="right-2 h-[23px] w-[21px]" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default TrendingCard;
