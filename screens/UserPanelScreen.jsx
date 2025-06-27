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

const userPanelForm = Yup.object().shape({
  name: Yup.string().matches(/^[a-zA-Z\s.]+$/, messages.Validate.SignUp.name.characterSpecification)
    .min(2, messages.Validate.SignUp.name.minLength)
    .max(30, messages.Validate.SignUp.name.maxLength)
    .required(messages.Validate.SignUp.name.required),
  email: Yup.string()
    .email(messages.Validate.SignUp.email.email)
    .max(50, messages.Validate.SignUp.email.length)
    .required(messages.Validate.SignUp.email.required)
});

export default function UserPanelScreen({ navigation }) {
  const dispatch = useDispatch();
  const [enable, setEnable] = useState(true);

  const handleSubmit = async (values) => {
    try {
      const storedUsers = await AsyncStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.some((u) => u.name === values.name);
      if (userExists) {
        Alert.alert(messages.Alerts.SignUp.UserFound.Title, messages.Alerts.SignUp.UserFound.message); // Error message if user already exists
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
      <Text style={styles.signUpTitle}>Sign Up</Text>
      <Formik
        initialValues={{ name: "", email: ""}}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
          { /* Field for Input Name */}
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
            { /* Field for Input Email */}
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
            { /* Button for Submit */}
            <View style={styles.signUpButtonContainer} >
            <TouchableOpacity
              style={[styles.loginScreenButtons, {backgroundColor: 'blue'}]}
              onPress={handleSubmit}
              disabled={!enable}
            >
              <Text style={styles.loginScreenButtonsText}>Submit</Text>
            </TouchableOpacity>
            </View>
            
          </>
        )}
      </Formik>
      {/** Button to Reset Password */}
      <View>
        <TouchableOpacity
          style={[styles.loginScreenButtons, {backgroundColor: 'grey'}]}
          onPress={() => {} /* navigation.replace("ResetPassword") */}
          disabled={enable} // Disable this button for now
        >
          <Text style={styles.loginScreenButtonsText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}