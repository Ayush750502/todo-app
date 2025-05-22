import React from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CustomInput from "../components/Task/CustomInput";
import CustomButton from "../components/Task/CustomButton";
import styles from "../style";

import messages from "../messages";

const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .required(messages.Validate.Title.Empty)
    .max(30, messages.Validate.Title.Length),
  description: Yup.string()
    .required(messages.Validate.Description.Empty)
    .max(150, messages.Validate.Description.Length),
  startTimestamp: Yup.number()
    .required(messages.Validate.Time.Start.Empty),
  endTimestamp: Yup.number()
    .required(messages.Validate.Time.End.Empty)
    .test("is-after-start", messages.Validate.Time.End.isAfterStart, function (value) {
      const { startTimestamp } = this.parent;
      return !value || !startTimestamp || value > startTimestamp;
    }),
});


const TaskScreen = ({ route, navigation }) => {
  const { task } = route.params || {};

  const initialValues = {
    title: task?.title || "",
    description: task?.description || "",
    startTimestamp: task?.startTimestamp || Date.now(),
    endTimestamp: task?.endTimestamp || Date.now(),
  };

  const formatPrettyTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const dateStr = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
    
    const timeStr = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  
    return `📅 ${dateStr}  🕒 ${timeStr}`;
  };
  
  const formatDuration = (start, end) => {
    if (!start || !end || end <= start) return null;
    const diffMs = end - start;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
  
    return `🕓 Duration: ${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
  };
  

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={TaskSchema}
      onSubmit={async (values) => {
        const storedTasks = JSON.parse(await AsyncStorage.getItem("tasks")) || [];
        let updatedTasks;

        if (task) {
          updatedTasks = storedTasks.map((t) =>
            t.id === task.id ? { ...t, ...values } : t
          );
        } else {
          updatedTasks = [
            ...storedTasks,
            { id: Date.now().toString(), ...values, completed: false },
          ];
        }

        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
        navigation.goBack();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        setFieldValue,
        touched,
      }) => (
        <View style={styles.container}>
          <CustomInput
            placeholder="Title*"
            value={values.title}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            error={touched.title && errors.title}
            len={30}
          />
          <CustomInput
            placeholder="Description*"
            value={values.description}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            error={touched.description && errors.description}
          />

          <CustomButton
            title = {`Start Time*: ${formatPrettyTimestamp(values.startTimestamp)}`}
            style={styles.dateTimeButton}
            onPress={() => setFieldValue("showStartPicker", true)}
          />
          
          <DateTimePickerModal
            isVisible={values.showStartPicker}
            mode="datetime"
            onConfirm={(date) => {
              setFieldValue("startTimestamp", date.getTime());
              setFieldValue("showStartPicker", false);
            }}
            onCancel={() => setFieldValue("showStartPicker", false)}
          />
          {touched.startTimestamp && errors.startTimestamp && (
            <Text style={{ color: "red" }}>{errors.startTimestamp}</Text>
          )}

          <CustomButton
            title={`End Time*: ${formatPrettyTimestamp(values.endTimestamp)}`}
            style={styles.dateTimeButton}
            onPress={() => setFieldValue("showEndPicker", true)}
          />
          <DateTimePickerModal
            isVisible={values.showEndPicker}
            mode="datetime"
            onConfirm={(date) => {
              setFieldValue("endTimestamp", date.getTime());
              setFieldValue("showEndPicker", false);
            }}
            onCancel={() => setFieldValue("showEndPicker", false)}
          />
          
          {values.startTimestamp && values.endTimestamp && values.endTimestamp > values.startTimestamp ? (
            <Text style={{ textAlign: "center", color: "#444", fontSize: 14, marginBottom: 10 }}>
              {formatDuration(values.startTimestamp, values.endTimestamp)}
            </Text>
          ) : null}

          {touched.endTimestamp && errors.endTimestamp && (
            <Text style={{ color: "red" }}>{errors.endTimestamp}</Text>
          )}

          <CustomButton
            title={task ? "Save Changes" : "Add Task"}
            style= {styles.taskButton}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default TaskScreen;