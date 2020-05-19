import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Card } from "@ui-kitten/components";
import { LineChart } from "react-native-chart-kit";
import { FontAwesome } from "@expo/vector-icons";

import styles from "./styles";
import colors from "../../../constants/colors";
import { parseData } from "./parseData";
import axios from "axios";
import Avatar from "billman-avatar";
import Loading from "../../components/Loading";

function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [incomeValue, setIncomeValue] = useState(0);
  const [expensesValue, setExpensesValue] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [graphData, setGraphData] = useState(undefined);
  const [cardDimensions, setCardDimensions] = useState({
    width: 0,
    height: 0,
  });

  const loadData = async () => {
    const res = await axios.get("/api/transactions");
    const { data: user } = await axios.get("/api/users/me");
    const { months, monthlyTotalIncome, monthlyTotalExpenses } = parseData(
      res.data
    );

    const monthsNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const data = {
      labels: months.map((month) => monthsNames[month]),
      datasets: [
        {
          data: monthlyTotalIncome,
          color: (opacity = 1) => `rgba(255, 180, 8, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
        {
          data: monthlyTotalExpenses,
          color: (opacity = 1) => `rgba(59, 126, 102, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ["Expenses", "Income"], // optional
    };
    setGraphData(data);
    setIncomeValue(monthlyTotalIncome[monthlyTotalIncome.length - 1]);
    setExpensesValue(monthlyTotalExpenses[monthlyTotalExpenses.length - 1]);
    setMonthlyBudget(user.monthlyBudget);
    setLoading(false);
  };

  React.useEffect(() => {
    loadData();
    const handle = navigation.addListener("focus", async () => {
      await loadData();
    });

    return handle.remove;
  }, []);




  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(35, 36, 40, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    fillShadowGradientOpacity: 0,
  };

  // if (loading) {
  //   return <Loading />
  // }

  return (
    <View style={[styles.container, { paddingBottom: 30 }]}>
      <View style={styles.header}>
        <Text style={styles.text}>Dashboard</Text>
        <View>
          <Avatar
            size={50}
            icon={
              <FontAwesome
                style={{ marginBottom: 5 }}
                size={30}
                name="user-circle-o"
                onPress={() => { navigation.navigate("Profile") }}
              />
            }
          />
        </View>
      </View>
      <View style={styles.view}>
        <View style={styles.cardView}>
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("Income")}
          >
            <Text style={styles.cardHeader}>Income</Text>
            <Text style={styles.cardValue}>{incomeValue} EGP</Text>
          </Card>
          <View style={styles.cardIncomeState}></View>
        </View>

        <View style={styles.cardView}>
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("Expenses")}
          >
            <Text style={styles.cardHeader}>Expenses</Text>
            <Text style={styles.cardValue}>{expensesValue} EGP</Text>
          </Card>
          <View style={styles.cardExpensesState}></View>
        </View>
      </View>
      <View style={styles.cardView}>
        <Card style={[styles.monthlyBudgetCard]}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <Text style={styles.cardHeader}>Monthly Budget</Text>
            <Text style={styles.cardValue}>{monthlyBudget} EGP</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              position: "absolute",
              bottom: -15,
            }}
          >
            <Text style={{ fontFamily: "OpenSans-Bold", marginRight: 5 }}>
              {monthlyBudget - expensesValue} EGP
            </Text>
            <Text style={{ fontFamily: "OpenSans" }}>Remaining</Text>
          </View>
        </Card>
      </View>
      <View
        style={[styles.cardView, { flexGrow: 1 }]}
        onLayout={(event) => {
          const { x, y, width, height } = event.nativeEvent.layout;
          if (!cardDimensions.height) {
            setCardDimensions({ width, height });
          }
        }}
      >
        <Card
          style={{
            flexGrow: 1,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {graphData && (
            <LineChart
              data={graphData}
              width={cardDimensions.width}
              height={cardDimensions.height - 80}
              chartConfig={chartConfig}
            />
          )}
        </Card>
      </View>
    </View>
  );
}

export default Home;
