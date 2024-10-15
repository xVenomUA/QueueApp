import { TouchableOpacity, Image } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
interface SearchIconProps {
  style?: string;
}
const SearchIcon = ({ style }: SearchIconProps) => {
  return (
    <TouchableOpacity className={`absolute ${style}`} onPress={() => console.log('Hello')}>
      <Image source={icons.search} style={{ tintColor: 'white' }} className="w-5 h-5" />
    </TouchableOpacity>
  );
};

export default SearchIcon;
