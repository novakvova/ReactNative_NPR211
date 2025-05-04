import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {useRouter} from "expo-router";
import { logOut} from "@/store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "@/store";
import AppLogo from "@/components/AppLogo";
import * as SecureStore from 'expo-secure-store'
import React from 'react'


const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const token = useAppSelector((state) => state.auth.token);



  return (
    <View style={styles.container}>

      <Text className="text-center mt-4 text-5xl font-pbold font-bold text-secondary">Категорії</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 20, marginBottom: 15, fontWeight: "bold" },
  logoutButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: "#ff4d4d",
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: { color: "white", fontWeight: "bold" },
});

export default ProfileScreen;