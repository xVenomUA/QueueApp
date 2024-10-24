import { Alert, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { dispatch } from '@/redux/store';
import { DeleteQueueAPI, UpdateQueueAPI } from '@/redux/Queue/operation';
import FormField from '../FormField/FormField';

interface QueueCardProps {
  id: number;
  name: string;
  service: string;
  date: string;
  extraData: string;
  isMyQueue?: boolean;
}
interface QueueCardDate {
  data: QueueCardProps;
}
const QueueCard: React.FC<QueueCardDate> = ({ data }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [newProfile, setNewProfile] = useState({
    name: '',
    date: '',
    extraData: '',
    id: 0,
  });
  const handleCancelQueue = id => {
    Alert.alert('Скасувати чергу', 'Ви впевнені, що хочете скасувати чергу?', [
      { text: 'Ні', style: 'cancel' },
      {
        text: 'Так',
        onPress: () => {
          dispatch(DeleteQueueAPI(id))
            .then(() => {
              Alert.alert('Успіх', 'Чергу успішно скасовано!');
            })
            .catch(e => {
              Alert.alert('Помилка', 'Попробуйте ще раз');
            });
        },
      },
    ]);
  };
  const openTimeChangeModal = id => {
    setNewProfile({
      name: data.name,
      date: data.date,
      extraData: data.extraData,
      id: data.id,
    });
    setModalVisible(true);
  };

  const handleSaveChanges = () => {
    dispatch(UpdateQueueAPI(newProfile))
      .then(() => {
        Alert.alert('Успіх', 'Чергу успішно оновлено!');
      })
      .catch(e => {
        Alert.alert('Помилка', 'Попробуйте ще раз');
      });
    setModalVisible(false);
  };

  return (
    <>
      <View
        className={`bg-[#30304d] p-4 rounded-lg shadow-lg mb-7 ${
          data.isMyQueue ? 'border border-yellow-500' : ''
        }`}
      >
        <Text className="text-lg text-white mb-2">Ім'я: {data.name}</Text>
        <Text className="text-lg text-white mb-2">Послуга: {data.service}</Text>
        <Text className="text-lg text-white mb-2">Час запису: {data.date}</Text>
        <Text className="text-lg text-white mb-4">Примітки: {data.extraData}</Text>

        {data.isMyQueue && (
          <View className="flex-row gap-4 items-center justify-center">
            <TouchableOpacity
              onPress={() => openTimeChangeModal(data.id)}
              className="bg-secondary py-2 px-1 rounded-lg items-center w-[160px]"
            >
              <Text className="text-white text-lg">Редагувати</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleCancelQueue(data.id)}
              className="bg-red-500 py-2 px-1 rounded-lg items-center w-[160px]"
            >
              <Text className="text-white text-lg">Скасувати чергу</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Modal visible={isModalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="w-[90%] bg-[#164b49] p-6 rounded-lg">
            <Text className="text-xl mb-4 text-white font-psemibold">Редагувати профіль</Text>

            <FormField
              title="Ім'я"
              value={newProfile.name}
              otherStyle="mb-4"
              placeholder="Введіть ім'я"
              handleChangeText={text => setNewProfile({ ...newProfile, name: text })}
            />

            <FormField
              title="Час запису"
              value={newProfile.date}
              otherStyle="mb-4"
              keyBoardType="time"
              placeholder="10:30"
              handleChangeText={text => setNewProfile({ ...newProfile, date: text })}
            />

            <FormField
              title="Примітки"
              value={newProfile.extraData}
              otherStyle="mb-4"
              keyBoardType="default"
              placeholder="Додаткові примітки"
              handleChangeText={text => setNewProfile({ ...newProfile, extraData: text })}
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
    </>
  );
};

export default QueueCard;
