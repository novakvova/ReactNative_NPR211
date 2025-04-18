import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { router } from 'expo-router'


const SignupScreen = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const handleChange = (field: any, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'All fields are required!')
      return
    }
    setIsSuccess(true)
    //Alert.alert('Success', `Welcome, ${form.name}!`);
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
            <Text className={"text-base text-black-500 font-pmedium"}>Ім'я</Text>
            <View className={"w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center"}>
              <TextInput
                placeholder="Ваше ім'я"
                value={form.name}
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
