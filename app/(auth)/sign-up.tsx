import { Alert, Image, ScrollView, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField/FormField';
import CustBTN from '@/components/Button/CustBNT';
import { Link, router } from 'expo-router';
import icons from '@/constants/icons';
import { dispatch } from '@/redux/store';
import { SignUpAPI } from '@/redux/auth/operation';

interface FormProps {
  email: string;
  password: string;
  username: string;
}

const SignUp = () => {
  const [form, setForm] = useState<FormProps>({ email: '', password: '', username: '' });
  const [data, setData] = useState<any>(null);
  const handleOnSubmit = () => {
    const data = {
      email: form.email,
      password: form.password,
      username: form.username,
    };
    dispatch(SignUpAPI(data))
      .unwrap()
      .then(() => {
        router.replace('/home');
      })
      .catch(e => {
        if (e.status === 409) {
          Alert.alert('Помилка', 'Користувач з такою поштою вже існує');
          return;
        }
        Alert.alert('Помилка', 'Не вдалося зареєструватися');
      });
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full justify-center items-start min-h-[90vh] px-4">
          <Image
            source={icons.logoIcon}
            className="w-[80px] h-[80px] overflow-hidden rounded-3xl"
            resizeMode="contain"
          />
          <FormField
            title="Ім'я користувача"
            value={form.username}
            otherStyle="mt-5 space-y-2"
            keyBoardType="default"
            handleChangeText={(e: string) => setForm({ ...form, username: e })}
            placeholder="Andrian_Ua"
          />
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
            placeholder="12345678@Aora"
            password={true}
          />

          <CustBTN
            title="Зареєструватися"
            handlePress={handleOnSubmit}
            containerStyle="mt-7 w-full"
          />
          <Text className="text-sm mt-6 w-full text-center text-gray-100 font-pregular text-[16px]">
            Вже маєте обліковий запис?{' '}
            <Link href={'/sign-in'} className="text-secondary font-psemibold text-[16px]">
              Увійти
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
