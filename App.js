import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { LogBox } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";

import "react-native-gesture-handler";
import "react-native-reanimated";

import store from "./redux/store";
import { setUser } from "./redux/authSlice";

import HomeScreen from "./screens/HomeScreen";
import TaskScreen from "./screens/TaskScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import UserPanelScreen from "./screens/UserPanelScreen";
import ChangePasswordScreen from "./screens/ChangePasswordScreen";

import LogoutButton from "./components/Drawer/logoutButton";

LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// Drawer Navigator (contains Home & User Panel)
function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <LogoutButton {...props} />}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={UserPanelScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Drawer.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer.Navigator>
  );
}

const AppContent = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("currentUser");
      if (storedUser) {
        dispatch(setUser(storedUser));
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
      <Stack.Navigator
        initialRouteName={isLoggedIn ? "Drawer" : "Login"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Drawer" component={DrawerStack} />
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
