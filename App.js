import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  LogBox,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Icon } from "react-native-elements";

// Ignore warning about defaultProps deprecation
LogBox.ignoreLogs([
  "Support for defaultProps will be removed from function components",
]);

const Stack = createStackNavigator();

// Custom Button Component
const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// Custom Input Component
const CustomInput = ({ value, onChangeText, placeholder, error }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

// Custom Card Component
const CustomCard = ({
  title,
  description,
  startTimestamp,
  endTimestamp,
  actions,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text>{description}</Text>
      <Text>Start: {new Date(startTimestamp).toLocaleString()}</Text>
      <Text>End: {new Date(endTimestamp).toLocaleString()}</Text>
      <View style={styles.actions}>{actions}</View>
    </View>
  );
};

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{task.title}</Text>
        <TouchableOpacity onPress={() => onToggleComplete(task.id)}>
          <Icon
            name={
              task.completed ? "radio-button-checked" : "radio-button-unchecked"
            }
            color={task.completed ? "green" : "gray"}
            size={24}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.cardDescription}>{task.description}</Text>
      <Text style={styles.cardTime}>
        Start: {new Date(task.startTimestamp).toLocaleString()}
      </Text>
      <Text style={styles.cardTime}>
        End: {new Date(task.endTimestamp).toLocaleString()}
      </Text>

      <View style={styles.cardActions}>
        <TouchableOpacity
          onPress={() => onEdit(task)}
          style={styles.actionButton}
        >
          <Icon name="edit" color="blue" size={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          style={styles.actionButton}
        >
          <Icon name="delete" color="red" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

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

  // Navigate to the Task Screen to add or edit a task
  const handleEdit = (task) => {
    navigation.navigate("TaskScreen", { task });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.noTasks}>No tasks available. Add one!</Text>
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

// Update the renderItem method in the HomeScreen to use icons
// const HomeScreen = ({ navigation }) => {
//   const [tasks, setTasks] = useState([]);

//   const loadTasks = async () => {
//     const storedTasks = await AsyncStorage.getItem("tasks");
//     if (storedTasks) setTasks(JSON.parse(storedTasks));
//   };

//   useFocusEffect(
//     useCallback(() => {
//       loadTasks();
//     }, [navigation])
//   );

//   const saveTasks = async (tasks) => {
//     await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
//   };

//   const toggleComplete = (id) => {
//     const updatedTasks = tasks.map((task) =>
//       task.id === id ? { ...task, completed: !task.completed } : task
//     );
//     setTasks(updatedTasks);
//     saveTasks(updatedTasks);
//   };

//   const deleteTask = (id) => {
//     Alert.alert("Delete Task", "Are you sure?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Delete",
//         onPress: () => {
//           const updatedTasks = tasks.filter((task) => task.id !== id);
//           setTasks(updatedTasks);
//           saveTasks(updatedTasks);
//         },
//       },
//     ]);
//   };

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={tasks}
//         keyExtractor={(item) => item.id}
//         ListEmptyComponent={
//           <Text style={styles.noTasks}>No tasks available. Add one!</Text>
//         }
//         renderItem={({ item }) => (
//           <CustomCard
//             title={item.title}
//             description={item.description}
//             startTimestamp={item.startTimestamp}
//             endTimestamp={item.endTimestamp}
//             actions={
//               <View style={styles.cardActions}>
//                 <TouchableOpacity
//                   onPress={() => toggleComplete(item.id)}
//                   style={[styles.button, styles.toggleButton]}
//                 >
//                   <Text
//                     style={
//                       item.completed ? styles.completed : styles.incomplete
//                     }
//                   >
//                     {item.completed ? "Completed" : "Incomplete"}
//                   </Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate("TaskScreen", { task: item })
//                   }
//                   style={styles.iconButton}
//                 >
//                   <Icon name="edit" color="blue" size={24} />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => deleteTask(item.id)}
//                   style={styles.iconButton}
//                 >
//                   <Icon name="delete" color="red" size={24} />
//                 </TouchableOpacity>
//               </View>
//             }
//           />
//         )}
//       />
//       <CustomButton
//         title="Add Task"
//         onPress={() => navigation.navigate("TaskScreen", { task: null })}
//       />
//     </View>
//   );
// };

const TaskScreen = ({ route, navigation }) => {
  const { task } = route.params || {};

  // States to handle form inputs
  const [title, setTitle] = useState(task ? task.title : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [startTimestamp, setStartTimestamp] = useState(
    task ? task.startTimestamp : Date.now()
  );
  const [endTimestamp, setEndTimestamp] = useState(
    task ? task.endTimestamp : Date.now()
  );
  const [errors, setErrors] = useState({});

  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);

  const handleSaveTask = async () => {
    let errorFound = false;
    const newErrors = {};

    // Validate inputs
    if (!title) {
      newErrors.title = "Title is required";
      errorFound = true;
    }

    if (!startTimestamp) {
      newErrors.startTimestamp = "Start time is required";
      errorFound = true;
    }

    if (!endTimestamp) {
      newErrors.endTimestamp = "End time is required";
      errorFound = true;
    }

    if (errorFound) {
      setErrors(newErrors);
      return;
    }

    const storedTasks = JSON.parse(await AsyncStorage.getItem("tasks")) || [];
    let updatedTasks;

    if (task) {
      updatedTasks = storedTasks.map((t) =>
        t.id === task.id
          ? { ...t, title, description, startTimestamp, endTimestamp }
          : t
      );
    } else {
      updatedTasks = [
        ...storedTasks,
        {
          id: Date.now().toString(),
          title,
          description,
          startTimestamp,
          endTimestamp,
          completed: false,
        },
      ];
    }

    await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomInput
        placeholder="Title"
        value={title}
        onChangeText={(titleText) => {
          if (titleText.length < 30) {
            setTitle(titleText);
          }
        }}
        error={errors.title}
      />
      <CustomInput
        placeholder="Description"
        value={description}
        onChangeText={(descText) => {
          if (descText.length < 150) {
            setDescription(descText);
          }
        }}
      />
      <CustomButton
        title="Pick Start Time"
        onPress={() => setStartPickerVisible(true)}
      />
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="datetime"
        onConfirm={(date) => {
          setStartPickerVisible(false);
          setStartTimestamp(date.getTime());
        }}
        onCancel={() => setStartPickerVisible(false)}
      />
      <CustomButton
        title="Pick End Time"
        onPress={() => setEndPickerVisible(true)}
      />
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="datetime"
        onConfirm={(date) => {
          setEndPickerVisible(false);
          setEndTimestamp(date.getTime());
        }}
        onCancel={() => setEndPickerVisible(false)}
      />
      <CustomButton
        title={task ? "Save Changes" : "Add Task"}
        onPress={handleSaveTask}
      />
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

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 10,
//   },
//   button: {
//     width: "30%",
//     alignSelf: "center",
//     marginVertical: 10,
//     backgroundColor: "#007BFF",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: { color: "white", textAlign: "center" },
//   inputContainer: { marginVertical: 10 },
//   input: {
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     padding: 10,
//     borderRadius: 5,
//   },
//   errorText: { color: "red" },
//   card: {
//     padding: 15,
//     marginVertical: 10,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ddd",
//   },
//   cardTitle: { fontSize: 18, fontWeight: "bold" },
//   noTasks: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
//   completed: { color: "green" },
//   incomplete: { color: "gray" },
//   cardActions: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "100%",
//     marginTop: 10,
//   },
//   toggleButton: {
//     width: "30%",
//     backgroundColor: "#28a745", // Green color for completed/incomplete toggle
//   },
// });

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  noTasks: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    marginVertical: 5,
    color: "#333",
  },
  cardTime: {
    fontSize: 12,
    color: "#777",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: { flex: 1, padding: 20 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    width: "30%",
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { color: "white", textAlign: "center" },
  inputContainer: { marginVertical: 10 },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  errorText: { color: "red" },
  card: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: { fontSize: 18, fontWeight: "bold" },
  noTasks: { textAlign: "center", marginTop: 20, fontSize: 16, color: "gray" },
  completed: { color: "green" },
  incomplete: { color: "gray" },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  toggleButton: {
    width: "30%",
    backgroundColor: "#28a745", // Green color for completed/incomplete toggle
  },
});
