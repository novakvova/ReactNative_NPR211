import React, { useState } from 'react'
import { View, Image, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { router } from 'expo-router'
import * as ImagePicker from 'expo-image-picker'
import Ionicons from '@expo/vector-icons/Ionicons'


const SignupScreen = () => {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const [image, setImage] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleChange = (field: any, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = () => {
    if (!form.firstName || !form.email || !form.password) {
      Alert.alert('Error', 'All fields are required!')
      return
    }
    setIsSuccess(true)
    //Alert.alert('Success', `Welcome, ${form.name}!`);
  }

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(!permissionResult.granted) {
      alert("Для вибору фото дай доступ до файлів");
      return;
    }
    const result =  await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1,
    });
    if(!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  return (
    <SafeAreaView className={"h-full"}>
      <ScrollView>
        <View
          className="w-full flex justify-center items-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}>
        {/*<View className="flex-1 justify-center items-center bg-white px-6">*/}
          <Text className="text-3xl font-bold mb-6 text-black">Реєстрація</Text>


          {isSuccess ?
            <Text className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
              Вхід успішний
            </Text> : null
          }

          <View className={"mb-4"}>
            <Text className={"text-base text-black-500 font-pmedium"}>Прізвище</Text>
            <View className={"w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"}>
              <TextInput
                placeholder="Ваше прізвище"
                value={form.lastName}
                onChangeText={(text) => handleChange('name', text)}
                className="flex-1 text-black font-psemibold text-base"
              />
            </View>
          </View>

          <View className={"mb-4"}>
            <Text className={"text-base text-black-500 font-pmedium"}>Ім'я</Text>
            <View className={"w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"}>
              <TextInput
                placeholder="Ваше ім'я"
                value={form.firstName}
                onChangeText={(text) => handleChange('name', text)}
                className="flex-1 text-black font-psemibold text-base"
              />
            </View>
          </View>

          <View className={"mb-4"}>
            <Text className={"text-base text-black-500 font-pmedium"}>Електронна пошта</Text>
            <View className={"w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"}>
              <TextInput
                placeholder="Пошта"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
                className="flex-1 text-black font-psemibold text-base"
              />
            </View>
          </View>


          <View className={"mb-2"}>
            <Text className={"text-base text-black-500 font-pmedium"}>Пароль</Text>
            <View className={"w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"}>
              <TextInput
                placeholder="Пароль"
                secureTextEntry
                value={form.password}
                onChangeText={(text) => handleChange('password', text)}
                className="flex-1 text-black font-psemibold text-base"
              />
            </View>
          </View>

          <View className={"space-y-2 w-full"}>
            <TouchableOpacity onPress={pickImage} className={"mt-4 p-4 bg-blue-400 rounded-xl"}>
              <View className="flex flex-row items-center justify-center gap-2">
                <Text className="text-center text-white font-psemibold">Pick an Image</Text>
                <Ionicons name="image" size={24} color="white" />
              </View>
            </TouchableOpacity>
            {image && (
              <View className="w-full flex justify-center items-center">
                <Image source={{ uri: image }} className="w-40 h-40 rounded-full" />
              </View>
            )}
          </View>

          <TouchableOpacity
            onPress={handleSignup}
            className="mt-7 w-full bg-blue-500 p-4 rounded-lg mb-4"
          >
            <Text className="text-white text-center text-lg font-bold">
              Реєстрація
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> {router.replace('/sign-in')}}
            className="w-full bg-green-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center text-lg font-bold">
              Вхід
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SignupScreen
