import React, { useState } from "react";
import {View, Text, TextInput} from "react-native";

import { Card } from '@ui-kitten/components';

import styles from "./styles";


function Home({navigation}) {
    const [incomeValue, setIncomeValue] = useState(0);
    const [expensesValue, setExpensesValue] = useState(0);
    const [monthlyBudget, setMonthlyBudget] = useState(0);
    return(
    <View style={styles.container}>
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
                <Card style={styles.monthlyBudgetCard}>
                    <Text style={styles.cardHeader}>Monthly Budget
                    <Text style={styles.cardValue}>{monthlyBudget} EGP</Text>
                    </Text>
                    <Text>
                        <Text>{monthlyBudget - expensesValue} EGP</Text>
                        Remaining
                    </Text>
                </Card>
            </View>
    </View>
    );
}

export default Home;