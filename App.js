import React, { useState, useEffect } from "react";
import { View, FlatList, Alert, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Input, Button, Card, Icon, Text } from "react-native-elements";
import { Formik } from "formik";
import * as Yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
  startTimestamp: Yup.number().required("Start Time is required"),
  endTimestamp: Yup.number().required("End Time is required"),
});

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(new Date());
  const [selectedEndTime, setSelectedEndTime] = useState(new Date());

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  const saveTasks = async (tasks) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = (values, { resetForm }) => {
    const newTask = { id: Date.now().toString(), ...values, completed: false };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    resetForm();
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

  const startEditing = (task) => {
    setEditingTask(task);
    setSelectedStartTime(new Date(task.startTimestamp));
    setSelectedEndTime(new Date(task.endTimestamp));
  };

  const saveEditedTask = (values, { resetForm }) => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask.id ? { ...task, ...values } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
    setEditingTask(null);
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{editingTask ? "Edit Task" : "Add Task"}</Card.Title>
        <Card.Divider />
        <Formik
          initialValues={{
            title: editingTask ? editingTask.title : "",
            description: editingTask ? editingTask.description : "",
            startTimestamp: editingTask
              ? editingTask.startTimestamp
              : Date.now(),
            endTimestamp: editingTask ? editingTask.endTimestamp : Date.now(),
          }}
          enableReinitialize
          validationSchema={taskSchema}
          onSubmit={editingTask ? saveEditedTask : addTask}
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
                onBlur={handleBlur("title")}
                value={values.title}
                errorMessage={errors.title}
              />
              <Input
                placeholder="Description"
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                value={values.description}
              />
              <Button
                buttonStyle={styles.smallButton}
                title="Pick Start Time"
                onPress={() => setStartPickerVisible(true)}
              />
              <DateTimePickerModal
                isVisible={isStartPickerVisible}
                mode="datetime"
                onConfirm={(date) => {
                  setStartPickerVisible(false);
                  setSelectedStartTime(date);
                  setFieldValue("startTimestamp", date.getTime());
                }}
                onCancel={() => setStartPickerVisible(false)}
              />
              <Button
                buttonStyle={styles.smallButton}
                title="Pick End Time"
                onPress={() => setEndPickerVisible(true)}
              />
              <DateTimePickerModal
                isVisible={isEndPickerVisible}
                mode="datetime"
                onConfirm={(date) => {
                  setEndPickerVisible(false);
                  setSelectedEndTime(date);
                  setFieldValue("endTimestamp", date.getTime());
                }}
                onCancel={() => setEndPickerVisible(false)}
              />
              <Button
                buttonStyle={styles.smallButton}
                title={editingTask ? "Save Changes" : "Add Task"}
                onPress={handleSubmit}
              />
            </>
          )}
        </Formik>
      </Card>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card>
            <Card.Title>{item.title}</Card.Title>
            <Card.Divider />
            <Card.FeaturedSubtitle>
              <Text>{`${item.description}\nStart: ${new Date(
                item.startTimestamp
              ).toLocaleString()}\nEnd: ${new Date(
                item.endTimestamp
              ).toLocaleString()}`}</Text>
            </Card.FeaturedSubtitle>
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
                onPress={() => startEditing(item)}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  smallButton: { padding: 8, marginVertical: 5 },
});

export default App;
