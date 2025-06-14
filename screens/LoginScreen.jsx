import {useState} from "react";
import { View, Text, TextInput, Alert, ImageBackground, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch} from 'react-redux';
import { Ionicons } from "@expo/vector-icons";

import { login } from "../redux/authSlice";

import styles from "../style";
import messages from "../messages";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required(messages.Validate.Login.name.required).max(30, messages.Validate.Login.name.length),
  password: Yup.string()
    .min(4, messages.Validate.Login.password.minLength)
    .max(20, messages.Validate.Login.password.maxLength)
    .required(messages.Validate.Login.password.required),
});

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (values) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        (u) => u.name == values.name && u.password == values.password
      );

      if (user) {
        dispatch(login(user.name));
        await AsyncStorage.setItem("currentUser", user.name);
        navigation.replace("HomeScreen");
      } else {
        Alert.alert(messages.Alerts.Login.Failed.Title, messages.Alerts.Login.Failed.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert(messages.Alerts.Login.Error.Title,messages.Alerts.Login.Error.message);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <ImageBackground
  source={require("../assets/bgImage.png")}
  style={{ flex: 1, resizeMode: "cover" }}
>
      <Text style={styles.loginTitle}>Login</Text>
      <Formik
        initialValues={{ name: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.loginInput}
              placeholder="Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              value={values.name}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.name && touched.name && (
              <Text style={styles.loginError}>{errors.name}</Text>
            )}
            <View style={styles.loginPasswordContainer}>
              <TextInput
                style={styles.loginPassword}
                placeholder="Password"
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.loginError}>{errors.password}</Text>
            )}
            <View style={styles.loginButtonContainer} >
            <TouchableOpacity
              style={[styles.loginScreenButtons, {backgroundColor: 'blue'}]}
              onPress={handleSubmit}
            >
              <Text style={styles.loginScreenButtonsText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.loginScreenButtons, {backgroundColor: 'grey'}]}
              onPress={() => navigation.replace("SignUp")}
            >
              <Text style={styles.loginScreenButtonsText}>Sign Up</Text>
            </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
</ImageBackground>
    </View>
  );
}
