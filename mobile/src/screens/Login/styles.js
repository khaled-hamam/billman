import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 60,
    marginTop: 15,
  },
  logo: {
    alignSelf: "center",
    marginTop: 35,
  },
  textInput: {
    height: 40,
    marginBottom: 25,
    paddingHorizontal: 10,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
  },
  focusedInput: {
    height: 40,
    marginBottom: 25,
    paddingHorizontal: 10,
    width: 300,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  loginButton: {
    height: 40,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center",
    marginBottom: 25,
  },
  loginWithGoogle: {
    height: 50,
    width: 300,
    borderWidth: 0.3,
    borderColor: colors.grey,
    marginTop: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerBtn: {
    position: "absolute",
    bottom: 35,
    fontWeight: "bold",
    fontSize: 16,
  },
});
