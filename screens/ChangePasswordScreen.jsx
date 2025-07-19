import {useState} from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";

import styles from "../style";
import messages from "../messages";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(4, messages.Validate.SignUp.password.minLength)
    .max(20, messages.Validate.SignUp.password.maxLength)
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
        messages.Validate.SignUp.password.charaterSpecification
      )
    .required(messages.Validate.SignUp.password.required),
  newPassword: Yup.string()
    .min(4, messages.Validate.SignUp.password.minLength)
    .max(20, messages.Validate.SignUp.password.maxLength)
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])/,
        messages.Validate.SignUp.password.charaterSpecification
      )
    .notOneOf([Yup.ref("oldPassword")], messages.Validate.changePassword.newPassword.notMatches)
    .required(messages.Validate.SignUp.password.required),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], messages.Validate.SignUp.confirmPassword.match)
    .required(messages.Validate.SignUp.confirmPassword.required),
});

export default function ChangePasswordScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

 const handleChangePassword = async (values) => {
  try {
    const currentUser = await AsyncStorage.getItem("currentUser");
    const storedUsers = await AsyncStorage.getItem("users");

    if (!currentUser || !storedUsers) {
      Alert.alert(messages.Alerts.changePassword.User.Title,messages.Alerts.changePassword.User.message);
      navigation.replace("Login");
      return;
    }

    const users = JSON.parse(storedUsers);
    const userIndex = users.findIndex((u) => u.email === currentUser);

    if (userIndex === -1) {
      Alert.alert(messages.Alerts.changePassword.User.Title, messages.Alerts.changePassword.User.message);
      navigation.replace("SignUp");
      return;
    }

    const user = users[userIndex];

    if (user.password !== values.oldPassword) {
      Alert.alert(messages.Alerts.changePassword.oldPassword.Title, messages.Alerts.changePassword.oldPassword.message);
      return;
    }

    users[userIndex].password = values.newPassword;
    await AsyncStorage.setItem("users", JSON.stringify(users));
    Alert.alert(messages.Alerts.changePassword.Success.Title, messages.Alerts.changePassword.Success.message);
    
  } catch (error) {
    console.error(error);
    Alert.alert(messages.Alerts.changePassword.Error.Title, messages.Alerts.changePassword.Error.message);
  }
};


  return (
  <View style={styles.signUpContainer}>
      <Text style={styles.signUpTitle}>Change Password</Text>
      <Formik
        initialValues={{ oldPassword: "", newPassword: "", confirmPassword: "" }}
        validationSchema={ChangePasswordSchema}
        onSubmit={handleChangePassword}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
          <View style={styles.signUpPasswordContainer}>
            <TextInput
            style={styles.signUpPassword}
              placeholder="Old Password"
              onChangeText={handleChange("oldPassword")}
              onBlur={handleBlur("oldPassword")}
              value={values.password}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordIcon}>
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
              placeholder="New Password"
              onChangeText={handleChange("newPassword")}
              onBlur={handleBlur("newPassword")}
              value={values.newPassword}
              secureTextEntry={!showNewPassword}
            />
            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.passwordIcon}>
              <Ionicons
                name={showNewPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
            {errors.newPassword && touched.newPassword && (
              <Text style={styles.signUpError}>{errors.newPassword}</Text>
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
            <TouchableOpacity style={styles.passwordIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? "eye-off" : "eye"}
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
              <Text style={styles.loginScreenButtonsText}>Change Password</Text>
            </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
}