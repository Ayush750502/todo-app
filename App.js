import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Button, Card, Icon } from "react-native-elements";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Stack = createStackNavigator();

const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  startTimestamp: Yup.number().required("Start Time is required"),
  endTimestamp: Yup.number().required("End Time is required"),
});

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const saveTasks = async (tasks) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    Alert.alert("Delete Task", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          const updatedTasks = tasks.filter((task) => task.id !== id);
          setTasks(updatedTasks);
          saveTasks(updatedTasks);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.title}</Card.Title>
            <Card.Divider />
            <Text>{item.description}</Text>
            <Text>Start: {new Date(item.startTimestamp).toLocaleString()}</Text>
            <Text>End: {new Date(item.endTimestamp).toLocaleString()}</Text>
            <View style={styles.actions}>
              <Icon
                name={
                  item.completed ? "check-circle" : "radio-button-unchecked"
                }
                color={item.completed ? "green" : "gray"}
                onPress={() => toggleComplete(item.id)}
              />
              <Icon
                name="edit"
                color="blue"
                onPress={() =>
                  navigation.navigate("TaskScreen", { task: item })
                }
              />
              <Icon
                name="delete"
                color="red"
                onPress={() => deleteTask(item.id)}
              />
            </View>
          </Card>
        )}
      />
      <Button
        title="Add Task"
        onPress={() => navigation.navigate("TaskScreen", { task: null })}
      />
    </View>
  );
};

const TaskScreen = ({ route, navigation }) => {
  const { task } = route.params || {};
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const handleSaveTask = async (values) => {
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
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          title: task ? task.title : "",
          description: task ? task.description : "",
          startTimestamp: task ? task.startTimestamp : Date.now(),
          endTimestamp: task ? task.endTimestamp : Date.now(),
        }}
        enableReinitialize
        validationSchema={taskSchema}
        onSubmit={handleSaveTask}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
        }) => (
          <>
            <Input
              placeholder="Title"
              onChangeText={handleChange("title")}
              value={values.title}
              errorMessage={errors.title}
            />
            <Input
              placeholder="Description"
              onChangeText={handleChange("description")}
              value={values.description}
            />
            <Button
              title="Pick Start Time"
              onPress={() => setStartPickerVisible(true)}
            />
            <DateTimePickerModal
              isVisible={isStartPickerVisible}
              mode="datetime"
              onConfirm={(date) => {
                setStartPickerVisible(false);
                setFieldValue("startTimestamp", date.getTime());
              }}
              onCancel={() => setStartPickerVisible(false)}
            />
            <Button
              title="Pick End Time"
              onPress={() => setEndPickerVisible(true)}
            />
            <DateTimePickerModal
              isVisible={isEndPickerVisible}
              mode="datetime"
              onConfirm={(date) => {
                setEndPickerVisible(false);
                setFieldValue("endTimestamp", date.getTime());
              }}
              onCancel={() => setEndPickerVisible(false)}
            />
            <Button
              title={task ? "Save Changes" : "Add Task"}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "To-Do List" }}
        />
        <Stack.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{ title: "Manage Task" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});
