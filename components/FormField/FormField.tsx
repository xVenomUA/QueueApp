import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ShowIcon from '../ShowIcon/ShowIcon';

import SearchIcon from '../SearchButton/SearchButton';

interface FormFieldProps {
  title?: string;
  value: string;
  handleChangeText: (e: string) => void;
  placeholder: string;
  otherStyle?: string;
  keyBoardType?: string;
  password?: boolean;
  search?: boolean;
}
const FormField = ({
  title,
  value,
  handleChangeText,
  placeholder,
  password,
  otherStyle,
  search,
}: FormFieldProps) => {
  const [secureText, setSecureText] = useState<boolean>(password ? true : false);
  return (
    <View className={`${otherStyle}`}>
      <Text className="text-base text-gray-100 font-pmedium mb-3">{title}</Text>
      <View className="bg-[#1E1E2D] w-full rounded-2xl px-4 py-[1px] border-[1px] border-[#232533] relative focus:border-secondary">
        <TextInput
          secureTextEntry={secureText}
          value={value}
          onChangeText={handleChangeText}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          className="text-white text-base font-psemibold min-w-full min-h-[57px]"
        />
        {password && (
          <ShowIcon
            secureText={secureText}
            setSecureText={setSecureText}
            style="right-[20px] top-[13px]"
          />
        )}
        {search && <SearchIcon style="right-[20px] top-[20px]" />}
      </View>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({});
