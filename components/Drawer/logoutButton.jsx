// components/LogoutButton.js
import { Text, TouchableOpacity, Alert } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

import messages from "../../messages";
import styles from "../../style";

const LogoutButton = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(messages.Alerts.LogOut.Title, messages.Alerts.LogOut.Confirmation, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem("currentUser");
          dispatch(logout());
          props.navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};


export default LogoutButton;
