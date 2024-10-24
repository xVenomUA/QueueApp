import React, { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { Image, StatusBar, Text, View, ActivityIndicator } from 'react-native';
import icons from '../../constants/icons';
import PrivateRoute from '@/components/PrivateRoute/PrivateRouter'; 

interface TabBarIconProps {
  icon: any;
  color: string;
  focused: boolean;
  name: string;
}

const TabBarIcon = ({ icon, color, focused, name }: TabBarIconProps) => {
  return (
    <View className="items-center justify-center gap-2">
      <Image source={icon} resizeMode="contain" tintColor={color} className="w-6 h-6" />
      <Text
        className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <PrivateRoute>
      <>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#FFA001',
            tabBarInactiveTintColor: '#CDCDE0',
            tabBarStyle: {
              backgroundColor: '#161622',
              borderTopWidth: 1,
              borderTopColor: '#232533',
              height: 64,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: 'Черга',
              tabBarIcon: ({ focused, color }) => (
                <TabBarIcon focused={focused} name="Головна" color={color} icon={icons.home} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: 'Create',
              tabBarIcon: ({ focused, color }) => (
                <TabBarIcon focused={focused} name="Створити" color={color} icon={icons.plus} />
              ),
              headerShown: false,
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Профіль',
              tabBarIcon: ({ focused, color }) => (
                <TabBarIcon focused={focused} name="Профіль" color={color} icon={icons.profile} />
              ),
              headerShown: false,
            }}
          />
        </Tabs>
        <StatusBar barStyle="light-content" backgroundColor="#161622" />
      </>
    </PrivateRoute>
  );
};

export default TabsLayout;
