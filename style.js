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
  loginContainer: {
    flex: 1,
    justifyContent: "center",
  },
  loginTitle: {
    fontSize: 32,
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  loginPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 10,
    margin: 20,
    backgroundColor: "white",
  },
  loginPassword: {
    flex: 1,
    padding: 10,
  },
  loginInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    margin: 20,
    borderRadius: 25,
    backgroundColor: "white",
  },
  loginButtonContainer: {
    marginBottom: 10,
    margin: 10,
    padding: 10,
  },
  loginScreenButtons: {
    padding: 10,
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
  },
  loginScreenButtonsText: {
    color: "white",
    fontSize: 16,
  },
  loginError: {
    color: "red",
    marginLeft: 20,
    paddingLeft: 10,
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  passwordIcon: { paddingRight: 10 },
  signUpContainer: {
    flex: 1,
    justifyContent: "center",
  },
  signUpTitle: {
    fontSize: 32,
    marginBottom: 20,
    textAlign: "center",
    marginTop: "10%",
  },
  signUpPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 10,
    margin: 20,
    backgroundColor: "white",
  },
  signUpPassword: {
    flex: 1,
    padding: 10,
  },
  signUpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 25,
    backgroundColor: "white",
    margin: 20,
  },
  signUpButtonContainer: {
    margin: 10,
    padding: 10,
  },
  signUpScreenButtons: {
    padding: 10,
    borderRadius: 25,
    margin: 5,
    alignItems: "center",
  },
  signUpScreenButtonsText: {
    color: "white",
    fontSize: 16,
  },
  signUpError: {
    color: "red",
    marginLeft: 20,
    paddingLeft: 10,
    textShadowColor: "white",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
});

export default styles;
