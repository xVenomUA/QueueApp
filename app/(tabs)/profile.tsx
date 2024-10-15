import { Image, ScrollView, Text, View, TouchableOpacity, Alert, Modal } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { router, useRouter } from 'expo-router';
import images from '@/constants/images';
import FormField from '@/components/FormField/FormField';

const Profile = () => {
  const navigation = useRouter();

  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Андріан Погребняк',
    email: 'andrian@example.com',
    password: '',
  });

  const [newProfile, setNewProfile] = useState({ ...profile });

  const handleLogout = () => {
    Alert.alert('Підтвердження', 'Ви впевнені, що хочете вийти?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Вийти', onPress: () => router.replace('/sign-in') },
    ]);
  };

  const handleSaveChanges = () => {
    setProfile(newProfile);
    setModalVisible(false);
    Alert.alert('Успіх', 'Профіль успішно оновлено!');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="justify-start px-4 py-[50px] min-h-[84vh]">
          <TouchableOpacity onPress={handleLogout} className="absolute top-5 right-6">
            <Image source={icons.logout} className="w-[35px] h-[35px]" resizeMode="contain" />
          </TouchableOpacity>

          <View className="items-center">
            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={images.avatar}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <Text className="text-white text-4xl font-psemibold my-5">{profile.name}</Text>
            <Text className="text-[#A0A0A0] text-md mb-2">{profile.email}</Text>
          </View>

          <View className="flex-row gap-7 justify-center items-center my-5">
            <View className="gap-1 justify-center items-center">
              <Text className="text-white font-psemibold text-xl">5</Text>
              <Text className="text-[#CDCDE0] font-pregular text-md">Активні черги</Text>
            </View>
            <View className="gap-1 justify-center items-center">
              <Text className="text-white font-psemibold text-xl">12</Text>
              <Text className="text-[#CDCDE0] font-pregular text-md">Завершені черги</Text>
            </View>
          </View>

          <View className="my-5 p-4 bg-gray-800 rounded-lg">
            <TouchableOpacity className="py-3" onPress={() => setModalVisible(true)}>
              <Text className="text-white text-lg font-psemibold">Редагувати профіль</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[90%] bg-[#164b49]  p-6 rounded-lg">
            <Text className="text-xl mb-4 text-white font-psemibold">Редагувати профіль</Text>

            <FormField
              title="Ім'я"
              value={newProfile.name}
              otherStyle="mb-4"
              placeholder="Введіть ім'я"
              handleChangeText={(text: string) => setNewProfile({ ...newProfile, name: text })}
            />

            <FormField
              title="Електронна пошта"
              value={newProfile.email}
              otherStyle="mb-4"
              keyBoardType="email-address"
              placeholder="example@gmail.com"
              handleChangeText={(text: string) => setNewProfile({ ...newProfile, email: text })}
            />

            <FormField
              title="Новий пароль"
              value={newProfile.password}
              otherStyle="mb-4"
              keyBoardType="default"
              placeholder="Введіть новий пароль"
              password={true}
              handleChangeText={(text: string) => setNewProfile({ ...newProfile, password: text })}
            />

            <View className="flex-row justify-end gap-4">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-xl mb-4 text-white font-psemibold">Скасувати</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveChanges}>
                <Text className="text-xl mb-4 text-white font-psemibold">Зберегти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
