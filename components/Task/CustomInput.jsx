import React from "react";
import {
  View,
  Text,
  TextInput,
} from "react-native";

import styles from "../../style";

const CustomInput = ({ value, onChangeText, placeholder, error, editable = true, len = 150 }) => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          maxLength={len}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={editable ? true : false}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  };

export default CustomInput;