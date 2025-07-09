import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "../../style";

const CameraOptions = ({ visible, onClose, onCameraSelect, onGallerySelect }) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose} />

      <View style={styles.popup}>
        <Text style={styles.popupTitle}>Choose Profile Image</Text>

        {/* Take Photo */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            onClose();
            onCameraSelect();
          }}
        >
          <Ionicons name="camera" size={22} color="#0077cc" style={styles.camIcon} />
          <Text style={[styles.optionText, { color: "#0077cc" }]}>Take Photo</Text>
        </TouchableOpacity>

        {/* Choose from Gallery */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => {
            onClose();
            onGallerySelect();
          }}
        >
          <Ionicons name="images-outline" size={22} color="#3366cc" style={styles.camIcon} />
          <Text style={[styles.optionText, { color: "#3366cc" }]}>Choose from Gallery</Text>
        </TouchableOpacity>

        {/* Cancel */}
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Ionicons name="close-circle" size={22} color="red" style={styles.camIcon} />
          <Text style={[styles.optionText, { color: "red" }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};


export default CameraOptions;
