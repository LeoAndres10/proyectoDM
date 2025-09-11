import { StyleSheet } from "react-native";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    color: "#111",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b6b6b",
    marginBottom: 24,
    textAlign: "center",
  },
  formGroup: { marginBottom: 16 },
  label: {
    marginBottom: 6,
    fontWeight: "600",
    fontSize: 14,
    color: "#111",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 15,
    color: "#111",
    backgroundColor: "#fff",
  },
  button: {
    height: 48,
    backgroundColor: "#111",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  link: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    color: "#111",
    textDecorationLine: "underline",
  },
});
