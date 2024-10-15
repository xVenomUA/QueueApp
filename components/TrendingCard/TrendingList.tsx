import { View } from 'react-native';
import React from 'react';
import TrendingCard from './TrendingCard';

interface TrendingListPropsMore {
  title: string;
  author: string;
  avatar: string;
  image: string;
  id: string | number;
}
interface TrendingListProps {
  data: TrendingListPropsMore[];
}

const TrendingList = ({ data }: TrendingListProps) => {
  return (
    <View className="gap-8 my-0">
      {data.map(item => (
        <View key={item.id}>
          <TrendingCard
            title={item.title}
            author={item.author}
            avatar={item.avatar}
            image={item.image}
          />
        </View>
      ))}
    </View>
  );
};

export default TrendingList;
