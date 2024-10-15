import React from 'react';
import { Tabs } from 'expo-router';
import { Image, StatusBar, Text, View } from 'react-native';
import icons from '../../constants/icons';

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
            title: 'Home',
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon focused={focused} name="Home" color={color} icon={icons.home} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon focused={focused} name="Create" color={color} icon={icons.plus} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Saved',
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon focused={focused} name="Saved" color={color} icon={icons.bookmark} />
            ),
            headerShown: false,
          }}
        />
         <Tabs.Screen
          name="profile"
          options={{
            title: 'profile',
            tabBarIcon: ({ focused, color }) => (
              <TabBarIcon focused={focused} name="profile" color={color} icon={icons.profile} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
      <StatusBar barStyle={'light-content'} backgroundColor={'#161622'} />  
    </>
  );
};

export default TabsLayout;
