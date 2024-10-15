import { StatusBar } from 'react-native';
import { Stack } from 'expo-router';
import React from 'react';

function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          headerBackButtonMenuEnabled: false,
        }}
      >
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar barStyle={'light-content'} backgroundColor={'#161622'} />
    </>
  );
}

export default AuthLayout;
