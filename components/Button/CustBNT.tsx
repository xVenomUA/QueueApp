import { Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
interface ButtonProps {
  title: string;
  handlePress: () => void;
  containerStyle?: string;
  isLoading?: boolean;
}
const CustBTN = ({ title, handlePress, containerStyle, isLoading }: ButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${
        isLoading ? 'opacity-50' : ''
      } `}
      onPress={handlePress}
      disabled={isLoading}
    >
      <LinearGradient
        colors={['#FF8C00', '#FFA300']} // Right-to-left gradient
        start={{ x: 0, y: 0 }} // Start from the left
        end={{ x: 1, y: 0 }} // End on the right
        className="rounded-xl min-h-[62px] justify-center items-center w-full"
      >
        <Text className={`text-primary font-psemibold text-lg`}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default CustBTN;
