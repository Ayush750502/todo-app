import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "../style";
import messages from "../messages";

import CameraOptions from "../components/UserPanel/CameraOptions";

const ProfileSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s.]+$/, messages.Validate.SignUp.name.characterSpecification)
    .min(2, messages.Validate.SignUp.name.minLength)
    .max(30, messages.Validate.SignUp.name.maxLength)
    .required(messages.Validate.SignUp.name.required),

  mobile: Yup.string()
    .matches(/^[6-9]\d{9}$/, messages.Validate.userPanel.mobile.length)
    .required(messages.Validate.userPanel.mobile.required),

  countryCode: Yup.string()
    .matches(/^\+\d{1,4}$/, messages.Validate.userPanel.countryCode.format)
    .required(messages.Validate.userPanel.countryCode.required),

  address: Yup.string()
    .min(5, messages.Validate.userPanel.address.length)
    .required(messages.Validate.userPanel.address.required),

  dob: Yup.string()
  .matches(/^\d{2}\/\d{2}\/\d{4}$/, messages.Validate.userPanel.dob.format)
  .max(new Date(), messages.Validate.userPanel.dob.max)
  .required(messages.Validate.userPanel.dob.required),

  email: Yup.string()
    .email(messages.Validate.SignUp.email.email)
    .max(50, messages.Validate.SignUp.email.length)
    .required(messages.Validate.SignUp.email.required),
});

const UserPanelScreen = ({ navigation }) => {
  const [initialUser, setInitialUser] = useState({
    name: "",
    email: "",
    mobile: "",
    countryCode: "+91",
    address: "",
    dob: new Date().toLocaleDateString("en-GB"), // Default to today's date
    image: null,
  });

  const [showPhotoOptions, setShowPhotoOptions] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await AsyncStorage.getItem("currentUser");
    const users = await AsyncStorage.getItem("users");
    if (!currentUser || !users) return;

    const userList = JSON.parse(users);
    const current = userList.find((u) => u.email === currentUser);
    if (current) setInitialUser({ ...current });
  };

  const updateUser = async (updatedValues) => {
    const users = await AsyncStorage.getItem("users");
    if (!users) return;

    const userList = JSON.parse(users);
    const updatedList = userList.map((u) =>
      u.email === initialUser.email ? { ...updatedValues } : u
    );

    await AsyncStorage.setItem("users", JSON.stringify(updatedList));
    await AsyncStorage.setItem("currentUser", updatedValues.email);
    setInitialUser(updatedValues);
    alert(messages.Alerts.updateProfile.Success.message);
  };

  const pickImage = async (fromCamera, setFieldValue) => {
    let result;
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert(messages.pickImage.permissions.message);
      return;
    }

    result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        })
      : await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 0.5,
        });

    if (!result.canceled) {
      setFieldValue("image", result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.profileContainer}>
      <Formik
        enableReinitialize
        initialValues={initialUser}
        validationSchema={ProfileSchema}
        onSubmit={updateUser}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            {/* Profile Image with Floating Icon */}
            <View style={{ alignSelf: "center", marginBottom: 20 }}>
              <Image
                source={
                  values.image
                    ? { uri: values.image }
                    : require("../assets/User-Profile-default-icon.jpg")
                }
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 60,
                }}
              />
              <TouchableOpacity
                onPress={() => setShowPhotoOptions(true)}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "white",
                  padding: 6,
                  borderRadius: 20,
                  elevation: 3,
                }}
              >
                <Ionicons name="camera-outline" size={20} color="blue" />
              </TouchableOpacity>
            </View>

            {/* Name */}
            <TextInput
              style={styles.signUpInput}
              placeholder="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
            />
            {errors.name && touched.name && (
              <Text style={styles.signUpError}>{errors.name}</Text>
            )}

            {/* Country Code + Mobile */}
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
              <TextInput
                style={[styles.signUpInput, { flex: 1, marginRight: 5 }]}
                placeholder="+91"
                value={values.countryCode}
                onChangeText={handleChange("countryCode")}
                onBlur={handleBlur("countryCode")}
                keyboardType="phone-pad"
                maxLength={5}
              />
              <TextInput
                style={[styles.signUpInput, { flex: 2 }]}
                placeholder="Mobile Number"
                value={values.mobile}
                onChangeText={handleChange("mobile")}
                onBlur={handleBlur("mobile")}
                keyboardType="numeric"
                maxLength={10}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              {errors.countryCode && touched.countryCode && (
                <Text style={styles.signUpError}>{errors.countryCode}</Text>
              )}
              {errors.mobile && touched.mobile && (
                <Text style={styles.signUpError}>{errors.mobile}</Text>
              )}
            </View>

            {/* Address */}
            <TextInput
              style={styles.signUpInput}
              placeholder="Address"
              value={values.address}
              onChangeText={handleChange("address")}
              onBlur={handleBlur("address")}
              multiline
            />
            {errors.address && touched.address && (
              <Text style={styles.signUpError}>{errors.address}</Text>
            )}

            {/* Date of Birth */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={[styles.signUpInput, { justifyContent: "center" }]}
            >
              <Text style={{ color: values.dob ? "black" : "gray" }}>
                {values.dob || "Select Date of Birth"}
              </Text>
            </TouchableOpacity>
            {errors.dob && touched.dob && (
              <Text style={styles.signUpError}>{errors.dob}</Text>
            )}
            {showDatePicker && (
              <DateTimePicker
                value={values.dob ? new Date(values.dob) : new Date(2000, 0, 1)}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === "ios");
                  if (selectedDate) {
                    const formatted = selectedDate.toLocaleDateString("en-GB");
                    setFieldValue("dob", formatted);
                  }
                }}
              />
            )}

            {/* Email */}
            <TextInput
              style={styles.signUpInput}
              placeholder="Email"
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {errors.email && touched.email && (
              <Text style={styles.signUpError}>{errors.email}</Text>
            )}

            {/* Update Button */}
            <TouchableOpacity
              style={[styles.loginScreenButtons, { backgroundColor: "blue" }]}
              onPress={handleSubmit}
            >
              <Text style={styles.loginScreenButtonsText}>Update Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginScreenButtons, { backgroundColor: "red" }]}
              onPress={() => {
                navigation.replace("ChangePassword");
              }}
            >
              <Text style={styles.loginScreenButtonsText}>Change Password</Text>
            </TouchableOpacity>

            {/* Photo Picker Modal */}
            <CameraOptions
  show={showPhotoOptions}
  visible={showPhotoOptions}
  onClose={() => setShowPhotoOptions(false)}
  onCameraSelect={() => pickImage(true, setFieldValue)}
  onGallerySelect={() => pickImage(false, setFieldValue)}
/>

          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default UserPanelScreen;
