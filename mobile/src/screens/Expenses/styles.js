import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  card: {
    backgroundColor: "#FFF",
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardOptions: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 5,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 50,
  },
  backRightBtnLeft: {
    backgroundColor: colors.primary,
    right: 50,
  },
  backRightBtnRight: {
    backgroundColor: colors.warning,
    right: 0,
  },
  itemValue: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },
  textMonth: {
    color: "#000",
    fontSize: 16,
  },
  cardData: {
    marginLeft: 20,
    flexGrow: 1,
  },
  itemText: {
    fontSize: 16,
    color: colors.grey,
  },
  valueContainer: {
    flexDirection: "row",
  },
  bottomView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    position: "absolute",
    bottom: 0,
    maxHeight: 100,
  },
  totalText: {
    fontSize: 16,
    color: "white",
  },
  totalValue: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
  },
  totalNote: {
    fontSize: 10,
    color: "white",
  },
  addBtn: {
    marginRight: 30,
  },
  input: {
    flex: 1,
    width: 300,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  list: {
    flex: 1,
    flexGrow: 1,
    marginBottom: 70,
  },
});
