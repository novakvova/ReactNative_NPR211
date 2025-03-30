import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

const SignupScreen = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = (field: any, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignup = () => {
    if (!form.name || !form.email || !form.password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
    Alert.alert('Success', `Welcome, ${form.name}!`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-6 text-black">Sign Up</Text>

      <TextInput
        placeholder="Full Name"
        value={form.name}
        onChangeText={(text) => handleChange('name', text)}
        className="w-full p-4 border rounded-lg bg-gray-100 text-black mb-4"
      />

      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
        className="w-full p-4 border rounded-lg bg-gray-100 text-black mb-4"
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        className="w-full p-4 border rounded-lg bg-gray-100 text-black mb-6"
      />

      <TouchableOpacity
        onPress={handleSignup}
        className="w-full bg-blue-500 p-4 rounded-lg"
      >
        <Text className="text-white text-center text-lg font-bold">
          Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
