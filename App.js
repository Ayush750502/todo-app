import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";

import store from "./redux/store";
import { setUser } from "./redux/authSlice";

import HomeScreen from "./screens/HomeScreen";
import TaskScreen from "./screens/TaskScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const Stack = createStackNavigator();

const AppContent = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (storedUser) {
        dispatch(setUser(storedUser)); // Set Redux state
      }
      setRehydrated(true);
    };

    checkUser();
  }, []);

  if (!rehydrated) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "HomeScreen" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
