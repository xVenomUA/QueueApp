import { Image, ScrollView, Text, View, TouchableOpacity, Alert, Modal } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from '@/constants/icons';
import { router, useRouter } from 'expo-router';
import images from '@/constants/images';
import FormField from '@/components/FormField/FormField';
import { useSelector } from 'react-redux';
import { logout, selectUser } from '@/redux/auth/AuthSlice';
import { dispatch } from '@/redux/store';
import { patchUserAPi } from '@/redux/auth/operation';
interface ProfileProps {
  username: string;
  email: string;
  password?: string;
  id: string | number;
}
const Profile = () => {
  const data = useSelector(selectUser);
  const [modalVisible, setModalVisible] = useState(false);
  const [newProfile, setNewProfile] = useState<ProfileProps>({
    username: data?.username || '',
    email: data?.email || '',
    password: data?.password || '',
    id: data?.id || '',
  });

  const handleLogout = () => {
    Alert.alert('Підтвердження', 'Ви впевнені, що хочете вийти?', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Вийти',
        onPress: () => {
          dispatch(logout({}));
          router.replace('/sign-in');
        },
      },
    ]);
  };

  const handleSaveChanges = () => {
    const data: { username: string; email: string; password?: string } = {
      username: newProfile.username || '',
      email: newProfile.email || '',
    };
    if (newProfile.password) {
      data.password = newProfile.password;
    }
    setModalVisible(false);
    dispatch(patchUserAPi(data))
      .unwrap()
      .then(() => {
        Alert.alert('Успіх', 'Профіль успішно оновлено!');
      })
      .catch(e => {
        Alert.alert('Помилка', 'Попробуйте ще раз');
      });
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
            <Text className="text-white text-4xl font-psemibold my-5">{data?.username}</Text>
            <Text className="text-[#A0A0A0] text-md mb-2">{data?.email}</Text>
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
              value={newProfile?.username}
              otherStyle="mb-4"
              placeholder="Введіть ім'я"
              handleChangeText={(text: string) => setNewProfile({ ...newProfile, username: text })}
            />

            <FormField
              title="Електронна пошта"
              value={newProfile?.email}
              otherStyle="mb-4"
              keyBoardType="email-address"
              placeholder="example@gmail.com"
              handleChangeText={(text: string) => setNewProfile({ ...newProfile, email: text })}
            />

            <FormField
              title="Новий пароль"
              value={newProfile.password || ''}
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
