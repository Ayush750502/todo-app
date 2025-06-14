import React, { useState, useCallback, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  Alert,
  TouchableOpacity,
  Text
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import TaskCard from "../components/Home/TaskCard";

import styles from "../style";
import messages from "../messages.js";

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  // Load tasks from AsyncStorage
  const loadTasks = async () => {
    const storedTasks = await AsyncStorage.getItem("tasks");
    if (storedTasks) setTasks(JSON.parse(storedTasks));
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  // Save tasks to AsyncStorage
  const saveTasks = async (tasks) => {
    await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Toggle completion status
  const toggleComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  // Delete task
  const deleteTask = (id) => {
    Alert.alert(
      messages.Alerts.Delete.Title,
      messages.Alerts.Delete.Confirmation,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  };

  // Navigate to the Task Screen to add or edit a task
  const handleEdit = (task) => {
    navigation.navigate("TaskScreen", { task });
  };

  // Add logout button to the header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={handleLogout}
          style={{ marginRight: 15 }}
        >
          <Text style={{ color: "red", fontWeight: "bold" }}>Logout</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Handle logout
  const handleLogout = () => {
    Alert.alert(messages.Alerts.LogOut.Title, messages.Alerts.LogOut.Confirmation, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          AsyncStorage.removeItem("currentUser");
          navigation.replace("Login");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks.reverse()}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noTasks}>{messages.Empty}</Text>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleComplete={toggleComplete}
            onEdit={handleEdit}
            onDelete={deleteTask}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("TaskScreen", { task: null })}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>+ Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
