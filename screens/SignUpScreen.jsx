import {useState} from "react";
import { View, Text, TextInput, ImageBackground, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

import styles from "../style";
import messages from "../messages";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().matches(/^[a-zA-Z\s]+$/, messages.Validate.SignUp.name.characterSpecification)
    .min(2, messages.Validate.SignUp.name.minLength)
    .max(30, messages.Validate.SignUp.name.maxLength)
    .required(messages.Validate.SignUp.name.required),
  email: Yup.string()
    .email(messages.Validate.SignUp.email.email)
    .max(50, messages.Validate.SignUp.email.length)
    .required(messages.Validate.SignUp.email.required),
  password: Yup.string()
    .min(4, messages.Validate.SignUp.password.minLength)
    .max(20, messages.Validate.SignUp.password.maxLength)
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
        messages.Validate.SignUp.password.charaterSpecification
      )
    .required(messages.Validate.SignUp.password.required),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], messages.Validate.SignUp.confirmPassword.match)
    .required(messages.Validate.SignUp.confirmPassword.required),
});

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (values) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.some((u) => u.name === values.name);
      if (userExists) {
        Alert.alert(messages.Alerts.SignUp.UserFound.Title, messages.Alerts.SignUp.UserFound.message);
        return;
      }

      users.push({
        name: values.name,
        email: values.email,
        password: values.password,
      });

      await AsyncStorage.setItem("users", JSON.stringify(users));
      dispatch(login(values.name));
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
      Alert.alert(messages.Alerts.SignUp.Error.Title, messages.Alerts.SignUp.Error.message);
    }
  };

  return (
    <View style={styles.signUpContainer}>
      <ImageBackground
  source={require("../assets/bgImage.png")}
  style={{ flex: 1, resizeMode: "cover" }}
>
      <Text style={styles.signUpTitle}>Sign Up</Text>
      <Formik
        initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
                style={styles.signUpInput}
                placeholder="Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {errors.name && touched.name && (
                <Text style={styles.signUpError}>{errors.name}</Text>
              )}
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
            <View style={styles.signUpPasswordContainer}>
            <TextInput
            style={styles.signUpPassword}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
            {errors.password && touched.password && (
              <Text style={styles.signUpError}>{errors.password}</Text>
            )}
            <View style={styles.signUpPasswordContainer}>
            <TextInput
            style={styles.signUpPassword}
              placeholder="Confirm Password"
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              value={values.confirmPassword}
              secureTextEntry={!showConfirmPassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
              {errors.confirmPassword && touched.confirmPassword && (
                <Text style={styles.signUpError}>{errors.confirmPassword}</Text>
              )}
            <View style={styles.signUpButtonContainer} >
            <TouchableOpacity
              style={[styles.loginScreenButtons, {backgroundColor: 'blue'}]}
              onPress={handleSubmit}
            >
              <Text style={styles.loginScreenButtonsText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.loginScreenButtons, {backgroundColor: 'grey'}]}
              onPress={() => navigation.replace("Login")}
            >
              <Text style={styles.loginScreenButtonsText}>Back To Login</Text>
            </TouchableOpacity>
            </View>
            
          </>
        )}
      </Formik>
</ImageBackground>
    </View>
  );
}