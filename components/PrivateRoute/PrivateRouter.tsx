import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useRouter } from 'expo-router';
import axios from 'axios';
import { dispatch } from '@/redux/store';
import { getUserAPi } from '@/redux/auth/operation';
import { GetQueueAPI } from '@/redux/Queue/operation';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const [loading, setLoading] = useState(true);
  const navigation = useRouter();

  useEffect(() => {
    const checkTokenAndSetHeaders = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/sign-in');
          return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        dispatch(getUserAPi())
          .then((e) => console.log(e))
          .catch(() => navigation.replace('/sign-in'));
        dispatch(GetQueueAPI())
          .then()
          .catch(() => navigation.replace('/sign-in'));
        setLoading(false);
      } catch (error) {
        console.error('Error setting token in headers:', error);
        navigation.replace('/sign-in');
      }
    };

    checkTokenAndSetHeaders();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return children; // Рендеримо дочірні компоненти, якщо все ок
};

export default PrivateRoute;
