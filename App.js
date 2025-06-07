import React, { useState } from "react";
import { LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

import store from "./redux/store";

import HomeScreen from "./screens/HomeScreen";
import TaskScreen from "./screens/TaskScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="TaskScreen" component={TaskScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
