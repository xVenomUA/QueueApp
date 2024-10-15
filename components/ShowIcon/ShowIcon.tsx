import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import icons from '@/constants/icons';
interface ShowIconProps {
    secureText: boolean;
    setSecureText: (e: boolean) => void;
    style?: string; 
    }
const ShowIcon = ({secureText, setSecureText, style}: ShowIconProps) => {
  return (
    <TouchableOpacity
      className={`absolute ${style}`}
      onPress={() => setSecureText(!secureText)}
    >
      <Image
        source={!secureText ? icons.eye : icons.eyeHide}
        style={{ tintColor: 'white' }}
        className="w-8 h-8"
      />
    </TouchableOpacity>
  );
};

export default ShowIcon;

const styles = StyleSheet.create({});
