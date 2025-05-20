import React from "react";
import { LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// Ignore warning about defaultProps deprecation
LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const Stack = createStackNavigator();

import HomeScreen from "./screens/HomeScreen";
import TaskScreen from "./screens/TaskScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
