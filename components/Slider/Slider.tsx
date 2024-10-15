import {
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import React, { useState, useRef } from 'react';
import icons from '@/constants/icons';

const data = [
  {
    id: 1,
    image:
      'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg',
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1421790500381-fc9b5996f343?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3',
  },
  {
    id: 3,
    image:
      'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?cs=srgb&dl=pexels-8moments-1266810.jpg&fm=jpg',
  },
  {
    id: 4,
    image:
      'https://img.freepik.com/free-photo/landscape-morning-fog-mountains-with-hot-air-balloons-sunrise_335224-794.jpg',
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1421790500381-fc9b5996f343?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3',
  },
  {
    id: 6,
    image:
      'https://images.pexels.com/photos/1266810/pexels-photo-1266810.jpeg?cs=srgb&dl=pexels-8moments-1266810.jpg&fm=jpg',
  },
];

interface TrendingItemProps {
  activeItem: number;
  item: any;
}

const zoomIn = {
  0: {
    scale: 0.85,
  },
  1: {
    scale: 1.05,
  },
};

const zoomOut = {
  0: {
    scale: 1.05,
  },
  1: {
    scale: 0.85,
  },
};

const Circle = ({ isActive }: { isActive: boolean }) => {
  return (
    <View
      className={`rounded-full mx-1 ${
        isActive ? 'bg-secondary-100 w-6 h-3' : 'bg-[#4E4B6F] w-3 h-3'
      }`}
    />
  );
};

const GroupCircle = ({ activeItem }: { activeItem: number }) => {
  return (
    <View
      className="flex-row justify-center items-center mt-[10px] h-[12px]"
    >
      {data.map((item) => (
        <Circle key={item.id} isActive={item.id === activeItem} />
      ))}
    </View>
  );
};

const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [play, setPlay] = useState<boolean>(false);
  return (
    <Animatable.View
      className="px-[20px] h-[360px]"
      animation={activeItem === item.id ?zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Text className="text-white">Playing</Text>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.8}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: item.image,
            }}
            className="w-52 h-[310px] rounded-[35px] mt-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Slider = () => {
  const [activeItem, setActiveItem] = useState<number>(data[0].id);
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 70,
  }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.id);
    }
  }).current;

  return (
    <>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TrendingItem activeItem={activeItem} item={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{flexGrow: 0}}
        className='flex-grow-0'
      />
      <GroupCircle activeItem={activeItem} />
    </>
  );
};

export default Slider;
