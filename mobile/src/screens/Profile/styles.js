import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingHorizontal: 30,
    paddingTop: 40,
    backgroundColor: "white",
    alignItems: "center"
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontFamily: "OpenSans-Bold"
  },
  view: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  input: {
    width: 300,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10
  },
  saveButton: {
    marginTop: 25,
    marginBottom: 10,
    height: 40,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: "center"
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 40
  },
  logOutButton: {
    height: 40,
    paddingHorizontal: 10,
    width: 300,
    borderRadius: 10,
    backgroundColor: colors.warning,
    justifyContent: "center",
    marginTop: 10
  }
});
