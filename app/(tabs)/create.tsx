import { Alert, ScrollView, Text, View, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustBTN from '@/components/Button/CustBNT';
import { Picker } from '@react-native-picker/picker';
import FormField from '@/components/FormField/FormField';
import { dispatch } from '@/redux/store';
import { AddQueueAPI } from '@/redux/Queue/operation';
import { router } from 'expo-router';

interface formProps {
  name: string;
  service: string;
  time: string;
  notes: string;
}
const CreateQueueEntry = () => {
  const [form, setForm] = useState<formProps>({
    name: '',
    service: 'Консультація',
    time: '',
    notes: '',
  });

  const handleSubmit = () => {
    const newData = { 
      name: form.name, 
      service: form.service, 
      date: form.time, 
      extraData: form.notes 
    }
    dispatch(AddQueueAPI(newData))
      .unwrap()
      .then(() => {
        router.replace('/home');
        Alert.alert('Успіх', 'Ви успішно додали запис до черги!');
      })
      .catch(() => {
        Alert.alert('Помилка', 'Щось пішло не так. Спробуйте ще раз');
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-start w-full min-h-[80vh] px-4 py-[50px]">
          <Text className="font-psemibold text-white text-3xl mb-9">Запис в чергу</Text>

          <FormField
            title="Ваше ім'я"
            placeholder="Введіть своє ім'я"
            value={form.name}
            handleChangeText={text => setForm({ ...form, name: text })}
            otherStyle="mb-5"
          />

          <View className="mb-5">
            <Text className="text-white mb-2">Послуга</Text>
            <View
              style={{
                backgroundColor: '#1E1E2D',
                borderRadius: 10,
                overflow: 'hidden',
              }}
            >
              <Picker
                selectedValue={form.service}
                onValueChange={itemValue => setForm({ ...form, service: itemValue })}
                mode={Platform.OS === 'android' ? 'dropdown' : 'dialog'}
                style={{ color: 'white' }}
              >
                <Picker.Item label="Консультація" value="Консультація" />
                <Picker.Item label="Реєстрація" value="Реєстрація" />
                <Picker.Item label="Обслуговування" value="Обслуговування" />
              </Picker>
            </View>
          </View>

          <FormField
            title="Година запису"
            placeholder="Введіть час (наприклад, 10:30)"
            value={form.time}
            handleChangeText={text => setForm({ ...form, time: text })}
            otherStyle="mb-5"
          />

          <FormField
            title="Додаткові примітки"
            placeholder="Введіть примітки (за бажанням)"
            value={form.notes}
            handleChangeText={text => setForm({ ...form, notes: text })}
            otherStyle="mb-5"
          />

          <CustBTN title="Записатися в чергу" handlePress={handleSubmit} containerStyle="mt-7" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateQueueEntry;
