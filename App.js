import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./redux/store";

import HomeScreen from "./screens/HomeScreen";
import TaskScreen from "./screens/TaskScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null); // 'HomeScreen' or 'Login'

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await AsyncStorage.getItem("currentUser");
      setInitialRoute(currentUser ? "HomeScreen" : "Login");
    };

    checkUser();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="TaskScreen" component={TaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
