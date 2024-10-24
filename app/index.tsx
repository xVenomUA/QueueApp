import { Image, ScrollView, StatusBar, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustBTN from '@/components/Button/CustBNT';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import images from '@/constants/images';

export default function QueueEase() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useLayoutEffect(() => {
    const checkTokenAndRedirect = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          router.replace('/home');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking token:', error);
        setLoading(false);
      }
    };

    checkTokenAndRedirect();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FFA001" />
      </View>
    );
  }

  const handlePress = () => {
    router.push('/sign-in');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="w-full justify-center items-center min-h-[90vh] p-4">
          <View className="rounded-3xl overflow-hidden">
            <Image
              source={images.QueueImage}
              className="w-[375px] h-[398px] rounded-3xl"
              resizeMode="cover"
            />
          </View>
          <View className="relative mt-5">
            <Text className="text-white text-center font-pbold text-[30px] mt-[12px] z-[1]">
              Ласкаво просимо до <Text className="text-secondary-200">Жива Черга</Text>
            </Text>
            <Text className="text-[#CDCDE0] text-sm text-center my-6">
              Організовуйте живі черги та надсилайте інтерактивні сповіщення для всіх відвідувачів.
            </Text>
          </View>
          <CustBTN
            title="Продовжити з електронною поштою"
            handlePress={handlePress}
            containerStyle="p-3 w-full mt-6"
          />
        </View>
      </ScrollView>

      <StatusBar barStyle={'light-content'} />
    </SafeAreaView>
  );
}
