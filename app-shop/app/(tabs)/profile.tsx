import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {useRouter} from "expo-router";
import { logOut} from "@/store/slices/userSlice";
import {useAppDispatch, useAppSelector} from "@/store";
import AppLogo from "@/components/AppLogo";
import * as SecureStore from 'expo-secure-store'


const ProfileScreen = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const user = useAppSelector((state) => state.auth.user);

  const handleLogout = async () => {
     await SecureStore.deleteItemAsync("token");

    dispatch(logOut());
    router.replace("/sign-in");
  };

  return (
    <View style={styles.container}>
      <AppLogo />

      <Text style={styles.title}>Інформація про користувача:</Text>
      {user ? (
        <>
          <Text>Email: {user.email}</Text>
          {/*<Text>Ім’я: {user.name}</Text>*/}
          {/*<Text>Роль: {user.roles.join(', ')}</Text>*/}

          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <Text style={styles.logoutText}>Вийти</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Завантаження даних...</Text>
      )}
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