import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Card } from "@ui-kitten/components";
import { LineChart } from "react-native-chart-kit";

import styles from "./styles";
import colors from "../../../constants/colors";
import axios from "axios";

function Home({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [incomeValue, setIncomeValue] = useState(0);
  const [expensesValue, setExpensesValue] = useState(0);
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [cardDimensions, setCardDimensions] = useState({
    width: 0,
    height: 0,
  });

  React.useEffect(() => {
    const loadData = async () => {
      const res = await axios.get('/api/transactions');
      console.log(res.data);
    }

    loadData();
  }, []);

  if (loading) {}

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(255, 180, 8, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [25, 30, 40, 60, 50, 100],
        color: (opacity = 1) => `rgba(59, 126, 102, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ["Expenses", "Income"], // optional
  };

  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(35, 36, 40, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    fillShadowGradientOpacity: 0,
  };

  return (
    <View style={[styles.container, { paddingBottom: 30 }]}>
      <View style={styles.header}>
        <Text style={styles.text}>Dashboard</Text>
        <View></View>
      </View>
      <View style={styles.view}>
        <View style={styles.cardView}>
          <Card style={styles.card}>
            <Text style={styles.cardHeader}>Income</Text>
            <Text style={styles.cardValue}>{incomeValue} EGP</Text>
          </Card>
          <View style={styles.cardIncomeState}></View>
        </View>

        <View style={styles.cardView}>
          <Card style={styles.card}>
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
        <Card style={{ flexGrow: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
          <LineChart
            data={data}
            width={cardDimensions.width}
            height={cardDimensions.height - 80}
            chartConfig={chartConfig}
          />
        </Card>
      </View>
    </View>
  );
}

export default Home;
