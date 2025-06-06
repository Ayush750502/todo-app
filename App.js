import React, { useState } from "react";
import { LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

import HomeScreen from "./screens/HomeScreen";
import TaskScreen from "./screens/TaskScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login" }}
            />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ title: "To-Do List" }}
            />
            <Stack.Screen
              name="TaskScreen"
              component={TaskScreen}
              options={{ title: "Manage Task" }}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
