import { Image, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { selectQueue } from '@/redux/Queue/QueueSlice';
import { GetQueueAPI } from '@/redux/Queue/operation';
import { dispatch } from '@/redux/store';
import QueueCard from '@/components/QueueCard';
import { router } from 'expo-router';

const QueuePage = () => {
  const data = useSelector(selectQueue);
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-start w-full min-h-[80vh] px-4 py-[30px]">
          <View className="flex-row justify-between">
            <Text className="text-white text-3xl font-bold mb-6">Моя черга</Text>
            <TouchableOpacity onPress={() => dispatch(GetQueueAPI())}>
              <View className="p-1 bg-secondary w-[150px] rounded-xl items-center justify-center">
                <Text className="text-white font-psemibold text-xl">Оновити</Text>
              </View>
            </TouchableOpacity>
          </View>

          {data?.map((queue, index) => (
            <View key={`index+${queue.id}`}>
              <QueueCard data={queue} />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QueuePage;
