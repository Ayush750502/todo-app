import React from "react";
import {
  View,
  Text
} from "react-native";

import styles from "../style";

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

export default CustomCard;