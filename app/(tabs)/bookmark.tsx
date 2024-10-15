import { ScrollView, Text, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import FormField from '@/components/FormField/FormField';

import TrendingList from '@/components/TrendingCard/TrendingList';
import { dataOfTrendingsCard } from '../helpers/MockData';

const bookmark = () => {
  const [value, setvalue] = useState<string>('');
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="justify-start w-full min-h-[80vh] px-4 py-[30px]">
          <Text className="font-psemibold text-4xl text-white">Saved Videos</Text>
          <FormField
            search={true}
            placeholder="Search your saved cideos"
            value={value}
            handleChangeText={(e: string) => {
              setvalue(e);
            }}
            otherStyle=""
          />
          <TrendingList data={dataOfTrendingsCard} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default bookmark;
