import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { router } from 'expo-router'
import { useLoginMutation } from '@/services/accountService'
import LoadingOverlay from '@/components/LoadingOverlay'

import * as SecureStore from 'expo-secure-store';

import { jwtDecode } from 'jwt-decode';


const SigninScreen = () => {
  const [form, setForm] = useState({ email: '', password: '' })

  const [login, {isLoading, error}] = useLoginMutation();
  //console.log("Error", error);

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleChange = (field: any, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = async () => {
    if (!form.email || !form.password) {
      Alert.alert('Error', 'All fields are required!')
      return
    }
    try {
      const result = await login(form).unwrap();
      const {token} = result;
      await SecureStore.setItemAsync('token', token);
      //console.log("login result", token);
    }catch (error: any) {
      //alert(error.data.error);
      console.log("Login error: ", error);
    }
    // setIsSuccess(true)
    //Alert.alert('Success', `Welcome, ${form.name}!`);
  }

  var authToken = SecureStore.getItem("token");
  if(authToken) {
    var userInfo = jwtDecode(authToken);
    console.log("User info token: ", userInfo);
  }

  // console.log("SecureStore", SecureStore.getItem("token"));

  return (
    <SafeAreaView className={"h-full"}>
      <ScrollView>

        <LoadingOverlay visible={isLoading} />
        <View
          className="w-full flex justify-center items-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}>
        {/*<View className="flex-1 justify-center items-center bg-white px-6">*/}
          <Text className="text-3xl font-bold mb-6 text-black">Вхід</Text>

          {error ?
            <View
              className="flex flex-row items-start gap-2 bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-md shadow-sm animate-fade-in"
              role="alert"
            >
              <Text className="text-xl">❌</Text>
              <View className="flex-1">
                {/*<Text className="font-semibold text-base mb-1">Помилка</Text>*/}
                <Text className="text-sm">Дані вказано невірно. Перевірте, будь ласка, і спробуйте ще раз.</Text>
              </View>
            </View> : null
          }

          {isSuccess ?
            <Text
              className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400">
              Вхід успішний
            </Text> : null
          }


          <View className={'mb-4'}>
            <Text className={'text-base text-black-500 font-pmedium'}>Електронна пошта</Text>
            <View
              className={'w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center'}>
              <TextInput
                placeholder="Пошта"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(text) => handleChange('email', text)}
                className="flex-1 text-black font-psemibold text-base"
              />
            </View>
          </View>


          <View className={"mb-6"}>
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

          <TouchableOpacity
            onPress={handleSignup}
            className="w-full bg-blue-500 p-4 rounded-lg mb-4"
          >
            <Text className="text-white text-center text-lg font-bold">
              Вхід
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={()=> {router.replace('/sign-up')}}
            className="w-full bg-green-500 p-4 rounded-lg"
          >
            <Text className="text-white text-center text-lg font-bold">
              Реєстрація
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

export default SigninScreen
