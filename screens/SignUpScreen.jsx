import React from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

import styles from "../style";
import messages from "../messages";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email(messages.Validate.SignUp.email.email)
    .max(50, messages.Validate.SignUp.email.length)
    .required("Required"),
  password: Yup.string()
    .min(4, messages.Validate.SignUp.password.minLength)
    .max(20, messages.Validate.SignUp.password.maxLength)
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
        messages.Validate.SignUp.password.charaterSpecification
      )
    .required("Required"),
});

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleSignUp = async (values) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if user already exists
      const userExists = users.some((u) => u.email === values.email);
      if (userExists) {
        Alert.alert(messages.Alerts.SignUp.UserFound.Title,messages.Alerts.SignUp.UserFound.message);
        return;
      }

      // Add new user
      users.push({ email: values.email, password: values.password });
      await AsyncStorage.setItem("users", JSON.stringify(users));
      dispatch(login(values.email)); 
      Alert.alert(messages.Alerts.SignUp.Success.Title, messages.Alerts.SignUp.Success.message);
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
      Alert.alert(messages.Alerts.SignUp.Error.Title, messages.Alerts.SignUp.Error.message);
    }
  };

  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.signUpTitle}>Sign Up</Text>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.signUpInput}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.signUpError}>{errors.email}</Text>
            )}
            <TextInput
              style={styles.signUpInput}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={styles.signUpError}>{errors.password}</Text>
            )}
            <View style={styles.signUpButtonContainer}>
            <Button title="Sign Up" onPress={handleSubmit} />
            </View>
            <View>
            <Button
              title="Back to Login"
              onPress={() => navigation.replace("Login")}
              color="grey"
            />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}