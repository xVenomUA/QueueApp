import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ResizeMode, Video } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import FormField from '@/components/FormField/FormField';
import CustBTN from '@/components/Button/CustBNT';
import icons from '@/constants/icons';

interface formProps {
  title: string;
  video: any;
  thumbnail: any;
  prompt: string;
}

const create = () => {
  const [form, setForm] = useState<formProps>({
    title: '',
    video: null,
    thumbnail: null,
    prompt: '',
  });

  const openPicker = async (selectedType: string) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectedType === 'video' ? ['video/mp4', 'video/gif'] : ['image/jpeg', 'image/png'],
    });
    if (!result.canceled) {
      if (selectedType === 'video') {
        setForm({ ...form, video: result.assets[0] });
      }
      if (selectedType === 'image') {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert('Document picked', JSON.stringify(result, null, 2));
      }, 100);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="justify-start w-full min-h-[80vh] px-4 py-[50px]">
          <Text className="font-psemibold text-white text-3xl mb-9">Upload Video</Text>
          <FormField
            title="Video Title"
            placeholder="Give your video a catchy title..."
            value={form.title}
            handleChangeText={(e: string) => {
              setForm({ ...form, title: e });
            }}
            otherStyle="mb-5"
          />
          <FormField
            title="AI Prompt"
            placeholder="The AI prompt of your video...."
            value={form.prompt}
            handleChangeText={(e: string) => {
              setForm({ ...form, prompt: e });
            }}
            otherStyle=""
          />

          <View className="mt-7 space-y-2">
            <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>

            <TouchableOpacity onPress={() => openPicker('video')}>
              {form.video ? (
                <Video
                  source={{ uri: form.video.uri }}
                  className="w-full h-64 rounded-2xl"
                  useNativeControls
                  resizeMode={ResizeMode.COVER}
                  isLooping
                />
              ) : (
                <View className="w-full h-40 px-4 bg-[#1E1E2D] rounded-2xl border border-black-200 flex justify-center items-center">
                  <View className="w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center">
                    <Image
                      source={icons.upload}
                      resizeMode="contain"
                      alt="upload"
                      className="w-1/2 h-1/2"
                    />
                  </View>
                </View>
              )}
            </TouchableOpacity>
            </View>
            <View className="mt-7 space-y-2">
              <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>
              <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
            </View>
  

          <CustBTN title="Submit & Publish" handlePress={() => console.log} containerStyle="mt-7" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default create;
