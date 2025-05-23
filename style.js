import { StyleSheet } from "react-native";

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
    maxHeight: 50,
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  dateTimeButton: {
    width: "100%",
    alignSelf: "center",
    marginVertical: 10,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    maxHeight: "10%",
  },
  taskButton: {
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-end",
    paddingBottom: 10,
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

export default styles;
