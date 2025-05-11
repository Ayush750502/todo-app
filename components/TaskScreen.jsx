import React from "react";
import { View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import styles from "../style";


const TaskSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required")
    .max(30, "Title should be at most 30 characters"),
  description: Yup.string().max(150, "Description should be at most 150 characters"),
  startTimestamp: Yup.number()
    .required("Start time is required"),
  endTimestamp: Yup.number()
    .required("End time is required")
    .test("is-after-start", "End time must be after start time", function (value) {
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
            placeholder="Title"
            value={values.title}
            onChangeText={handleChange("title")}
            onBlur={handleBlur("title")}
            error={touched.title && errors.title}
          />
          <CustomInput
            placeholder="Description"
            value={values.description}
            onChangeText={handleChange("description")}
            onBlur={handleBlur("description")}
            error={touched.description && errors.description}
          />

          <CustomInput
            placeholder={`Start Time: ${formatPrettyTimestamp(values.startTimestamp)}`}
            editable={false}
          />
          <CustomInput
            placeholder={`End Time: ${formatPrettyTimestamp(values.endTimestamp)}`}
            editable={false}
          />

          {values.startTimestamp && values.endTimestamp && values.endTimestamp > values.startTimestamp ? (
            <Text style={{ textAlign: "center", color: "#444", fontSize: 14, marginBottom: 10 }}>
              {formatDuration(values.startTimestamp, values.endTimestamp)}
            </Text>
          ) : null}

          <CustomButton
            title="Pick Start Time"
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
            title="Pick End Time"
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

          {touched.endTimestamp && errors.endTimestamp && (
            <Text style={{ color: "red" }}>{errors.endTimestamp}</Text>
          )}

          <CustomButton
            title={task ? "Save Changes" : "Add Task"}
            onPress={handleSubmit}
          />
        </View>
      )}
    </Formik>
  );
};

export default TaskScreen;






// import React, { useState } from "react";
// import {
//   View
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import DateTimePickerModal from "react-native-modal-datetime-picker";

// import CustomButton from "./CustomButton";
// import CustomInput from "./CustomInput";

// import styles from "../style";

// const TaskScreen = ({ route, navigation }) => {
//     const { task } = route.params || {};
  
//     // States to handle form inputs
//     const [title, setTitle] = useState(task ? task.title : "");
//     const [description, setDescription] = useState(task ? task.description : "");
//     const [startTimestamp, setStartTimestamp] = useState(
//       task ? task.startTimestamp : Date.now()
//     );
//     const [endTimestamp, setEndTimestamp] = useState(
//       task ? task.endTimestamp : Date.now()
//     );
//     const [errors, setErrors] = useState({});
  
//     const [isStartPickerVisible, setStartPickerVisible] = useState(false);
//     const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  
//     const handleSaveTask = async () => {
//       let errorFound = false;
//       const newErrors = {};
  
//       // Validate inputs
//       if (!title) {
//         newErrors.title = "Title is required";
//         errorFound = true;
//       }
  
//       if (!startTimestamp) {
//         newErrors.startTimestamp = "Start time is required";
//         errorFound = true;
//       }
  
//       if (!endTimestamp) {
//         newErrors.endTimestamp = "End time is required";
//         errorFound = true;
//       }
  
//       if (errorFound) {
//         setErrors(newErrors);
//         return;
//       }
  
//       const storedTasks = JSON.parse(await AsyncStorage.getItem("tasks")) || [];
//       let updatedTasks;
  
//       if (task) {
//         updatedTasks = storedTasks.map((t) =>
//           t.id === task.id
//             ? { ...t, title, description, startTimestamp, endTimestamp }
//             : t
//         );
//       } else {
//         updatedTasks = [
//           ...storedTasks,
//           {
//             id: Date.now().toString(),
//             title,
//             description,
//             startTimestamp,
//             endTimestamp,
//             completed: false,
//           },
//         ];
//       }
  
//       await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
//       navigation.goBack();
//     };
  
//     return (
//       <View style={styles.container}>
//         <CustomInput
//           placeholder="Title"
//           value={title}
//           onChangeText={(titleText) => {
//             if (titleText.length < 30) {
//               setTitle(titleText);
//             }
//           }}
//           error={errors.title}
//         />
//         <CustomInput
//           placeholder="Description"
//           value={description}
//           onChangeText={(descText) => {
//             if (descText.length < 150) {
//               setDescription(descText);
//             }
//           }}
//         />
//         <CustomButton
//           title="Pick Start Time"
//           onPress={() => setStartPickerVisible(true)}
//         />
//         <DateTimePickerModal
//           isVisible={isStartPickerVisible}
//           mode="datetime"
//           onConfirm={(date) => {
//             setStartPickerVisible(false);
//             setStartTimestamp(date.getTime());
//           }}
//           onCancel={() => setStartPickerVisible(false)}
//         />
//         <CustomButton
//           title="Pick End Time"
//           onPress={() => setEndPickerVisible(true)}
//         />
//         <DateTimePickerModal
//           isVisible={isEndPickerVisible}
//           mode="datetime"
//           onConfirm={(date) => {
//             setEndPickerVisible(false);
//             setEndTimestamp(date.getTime());
//           }}
//           onCancel={() => setEndPickerVisible(false)}
//         />
//         <CustomButton
//           title={task ? "Save Changes" : "Add Task"}
//           onPress={handleSaveTask}
//         />
//       </View>
//     );
//   };
  

// export default TaskScreen;