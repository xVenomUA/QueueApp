import { Alert, Image, ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField/FormField';
import CustBTN from '@/components/Button/CustBNT';
import { Link, router } from 'expo-router';
import icons from '@/constants/icons';

import { SignInAPI } from '@/redux/auth/operation';
import { dispatch } from '@/redux/store';

interface FormProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [form, setForm] = useState<FormProps>({ email: '', password: '' });

  const handlePress = () => {
    dispatch(SignInAPI({ email: form.email, password: form.password }))
      .unwrap()
      .then(() => {
        router.replace('/home');
      })
      .catch(e => {
        Alert.alert('Помилка', 'Невірний логін або пароль');
      });
    setForm({ email: '', password: '' });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full flex justify-center items-start min-h-[84vh] px-4">
          <Image
            source={icons.logoIcon}
            className="w-[80px] h-[80px] overflow-hidden rounded-3xl"
            resizeMode="contain"
          />
          <Text className="text-3xl text-white mt-5 font-psemibold">Увійдіть у Живу Чергу</Text>
          <FormField
            title="Електронна пошта"
            value={form.email}
            otherStyle="mt-5 space-y-2"
            keyBoardType="email-address"
            handleChangeText={(e: string) => setForm({ ...form, email: e })}
            placeholder="example@gmail.com"
          />
          <FormField
            title="Пароль"
            value={form.password}
            otherStyle="mt-5 space-y-2"
            keyBoardType="default"
            handleChangeText={(e: string) => setForm({ ...form, password: e })}
            placeholder="12345678@Черга"
            password={true}
          />
          <Text className="text-gray-100 font-pmedium text-sm mt-4 w-full text-right text-[14px]">
            Забули пароль?
          </Text>
          <CustBTN title="Увійти" handlePress={handlePress} containerStyle="mt-6 w-full" />
          <Text className="text-sm mt-6 w-full text-center text-gray-100 font-pregular text-[16px]">
            Ще не маєте облікового запису?{' '}
            <Link href={'/sign-up'} className="text-secondary font-psemibold text-[16px]">
              Зареєструватися
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
