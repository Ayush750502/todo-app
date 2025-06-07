import React from "react";
import { View, Text, TextInput, Button, Alert, ImageBackground, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch} from 'react-redux';
import { login } from "../redux/authSlice";

import styles from "../style";
import messages from "../messages";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(messages.Validate.Login.email.email)
    .max(50, messages.Validate.Login.email.length)
    .required("Required"),
  password: Yup.string()
    .min(4, messages.Validate.Login.password.minLength)
    .max(20, messages.Validate.Login.password.maxLength)
    .required("Required"),
});

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();


  const handleLogin = async (values) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const user = users.find(
        (u) => u.email === values.email && u.password === values.password
      );

      if (user) {
        dispatch(login(user.email));
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
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.loginInput}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.loginError}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.loginInput}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
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
