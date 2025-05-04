import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView, ScrollView,
  Text,
  StyleSheet,
  View,
} from 'react-native'
import { useRouter } from 'expo-router'
import { setCredentials } from '@/store/slices/userSlice'
import {useAppDispatch} from "@/store";
import AppLogo from "@/components/AppLogo";
import * as SecureStore from 'expo-secure-store'
import { useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
import { IUser } from '@/interfaces/account'
import { SafeAreaProvider } from 'react-native-safe-area-context'


const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("token"); // правильно: getItemAsync
      if (token) {
        const user = jwtDecode<IUser>(token);
        dispatch(setCredentials({ token, user }));
        router.replace('/profile');
      } else {
        router.replace('/sign-in');
      }
    };

    checkAuth();
  }, []);


  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{flexGrow: 1, paddingHorizontal: 20}}
            keyboardShouldPersistTaps="handled"
          >
    <View style={styles.container}>
      <AppLogo />
      <Text>Завантаження даних...</Text>
    </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
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

export default HomeScreen;