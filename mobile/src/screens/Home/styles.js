import { StyleSheet } from "react-native";
import colors from "../../../constants/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "flex-start",
        paddingHorizontal: 30,
        paddingTop: 40,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
    },
    cardView: {
        marginTop: 20,
        borderColor: "black",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.62,
        elevation: 4,
    },
    card: {
        width: 150,
        height: 100,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cardIncomeState: {
        width: 10,
        height: 10,
        borderRadius: 10,
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: colors.green,
    },
    cardExpensesState: {
        width: 10,
        height: 10,
        borderRadius: 10,
        position: "absolute",
        top: 10,
        left: 10,
        backgroundColor: colors.primary,
    },
    cardHeader: {
        color: colors.grey,
        fontSize: 16,
        textAlign: "center",
    },
    cardValue: {
        color: colors.black,
        fontSize: 18,
        fontFamily: 'OpenSans-Bold',
        textAlign: "center",
    },
    monthlyBudgetCard: {
        height: 100,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "stretch",
    },
    view: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    text: {
        flexGrow: 1,
        fontSize: 30,
        fontFamily: 'OpenSans-Bold',
  },
  icon: {
      color: colors.primary,
  },
});
