import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export default StyleSheet.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    flex: 1,
    width: 300,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    borderWidth: 0,
  },
  datePicker: {
    backgroundColor: "white",
    color: "white",
    padding: 10,
    borderRadius: 10,
  },
  categories: {
    backgroundColor: "white",
    padding: 10,
  },
});
