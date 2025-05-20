import React, { useState } from "react";
import {
  Alert,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { Icon } from "react-native-elements";

import styles from "../../style";

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const [collapsed, setCollapsed] = useState(true);

  const getBorderColor = () => {
    if (task.completed) return "dodgerblue"; // light green
  
    const now = Date.now();
    const start = task.startTimestamp;
    const end = task.endTimestamp;
  
    if (now < start) return "lightgreen"; // blue: not started
    if (now >= end) return "#f44336"; // fallback: past due
  
    const total = end - start;
    const elapsed = now - start;
    const remaining = end - now;
  
    if (remaining <= 10 * 60 * 1000) return "red"; // red
    if (elapsed >= total / 2) return "orange"; // orange
    if (now >= start && now < end) return "gold"; // yellow
  
    return "#cccccc"; // fallback
  };
  

  const getTimeLeft = (start, end) => {
    if (task.completed) return "✅ Completed";

    const now = Date.now();
    let label = "";
    let msLeft = 0;

    if (now < start) {
      label = "Starts in";
      msLeft = start - now;
    } else if (now >= start && now < end) {
      label = "Ends in";
      msLeft = end - now;
    } else {
      return "❌ Task is due";
    }

    const totalMinutes = Math.floor(msLeft / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${label}: ${hours > 0 ? `${hours}h ` : ""}${minutes}m`;
  };

  const handleToggleComplete = () => {
    if (!task.completed) {
      Alert.alert(
        "Mark as Complete",
        "Are you sure you want to mark this task as completed?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            style: "default",
            onPress: () => {
              onToggleComplete(task.id);
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      onToggleComplete(task.id);
    }
  };

  if (collapsed) {
    return (
      <View
        style={[
          styles.card,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: getBorderColor(),
            borderWidth: 2,
          },
        ]}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={handleToggleComplete}>
            <Icon
              name={
                task.completed
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
              color={task.completed ? "green" : "gray"}
              size={24}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.cardTitle,
              {
                marginLeft: 10,
                textDecorationLine: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              },
            ]}
          >
            {task.title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setCollapsed(false)}>
          <Icon name="keyboard-arrow-down" size={28} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.card, { borderColor: getBorderColor(), borderWidth: 2 }]}>
      <View
        style={{
          ...styles.cardHeader,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={[
            styles.cardTitle,
            { textDecorationLine: task.completed ? "line-through" : "none" },
          ]}
        >
          {task.title}
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={handleToggleComplete}>
            <Icon
              name={
                task.completed
                  ? "radio-button-checked"
                  : "radio-button-unchecked"
              }
              color={task.completed ? "green" : "gray"}
              size={24}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCollapsed(true)}>
            <Icon name="keyboard-arrow-up" size={28} />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.cardDescription}>{task.description}</Text>
      <Text style={[styles.cardTime, { fontStyle: "italic", color: "#555" }]}>
        {getTimeLeft(task.startTimestamp, task.endTimestamp)}
      </Text>

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

export default TaskCard;
