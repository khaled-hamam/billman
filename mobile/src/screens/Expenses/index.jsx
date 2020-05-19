import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, TouchableHighlight, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

import { SwipeListView } from "react-native-swipe-list-view";
import styles from "./styles";
import colors from "../../../constants/colors";
import Modal from "../../components/modal/index";
import CardAvatar from "../../components/cardAvatar";

function Expenses() {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [expenseItem, setExpenseItem] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
      const res = await axios.get("/api/transactions");
      if (res.status === 200) {
        setTransactions(res.data);

        const itemCategories = [];
        res.data.forEach(t => {
          t.categories.forEach(c => {
            if (itemCategories.indexOf(c) === -1) {
              itemCategories.push(c);
            }
          })
        });

        setCategories(itemCategories);
        return;
      }
      return undefined;
    };
    getTransactions();
  }, []);

  useEffect(() => {
    const exp = transactions.filter(
      (transaction) => transaction.type === "EXPENSE"
    );
    let total = 0;
    exp.forEach((item) => (total += item.value));

    setExpenses(exp);
    setTotalExpenses(total);
  }, [transactions]);

  useEffect(() => {
    if (expenseItem.name) {
      setEditModalOpened(true);
    }
  }, [expenseItem]);

  useEffect(() => {
    let total = 0;
    expenses.forEach((item) => (total += item.value));
    setTotalExpenses(total);
  }, [expenses]);

  const deleteRow = async (rowMap, itemId) => {
    const res = await axios.delete(`/api/transactions/${itemId}`);
    if (res.status === 200) {
      const newData = [...expenses];
      const deletedIndex = expenses.findIndex((item) => item.ID === itemId);
      if (deletedIndex >= 0) {
        rowMap[deletedIndex].closeRow();
        newData.splice(deletedIndex, 1);
      }
      setExpenses(newData);
    }
  };

  const handleAddExpense = async (expense) => {
    const res = await axios.post("/api/transactions", expense);
    if (res.status === 201) {
      const newExpenses = [...expenses];
      newExpenses.push(expense);
      setExpenses(newExpenses);
    }
    setAddModalOpened(false);
  };
  const handleEditExpense = async (expense) => {
    const res = await axios.patch(`/api/transactions/${expense.ID}`, expense);
    if (res.status === 200) {
      const newExpenses = [...expenses];
      const editedIndex = newExpenses.findIndex(
        (item) => item.ID === expense.ID
      );
      if (editedIndex >= 0) {
        newExpenses[editedIndex] = expense;
        setExpenses(newExpenses);
      }
      setEditModalOpened(false);
    }
  };

  const handleModalClose = () => {
    setEditModalOpened(false);
    setAddModalOpened(false);
    setExpenseItem({});
  };

  const renderItem = (data) => {
    return (
      <TouchableHighlight>
        <View style={styles.card}>
          <CardAvatar size={70} avatarLetter="E" />
          <View style={styles.cardData}>
            <Text style={styles.itemText}>{data.item.name}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.itemValue}>{`${data.item.value} EGP`}</Text>
              <Text style={styles.textMonth}> / Month</Text>
            </View>
          </View>
          <AntDesign name="left" size={24} color={colors.grey} />
        </View>
      </TouchableHighlight>
    );
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.cardOptions}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() => setExpenseItem(data.item)}
      >
        <Ionicons name="ios-options" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.ID)}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {expenses.length > 0 && (
        <SwipeListView
          style={styles.list}
          data={expenses}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-100}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          keyExtractor={(_, index) => index.toString()}
        />
      )}
      <View style={styles.bottomView}>
        <View style={{ flexDirection: "column", flexGrow: 1, marginLeft: 25 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.totalText}>Total Expenses</Text>
            <Text style={styles.totalValue}>{`${totalExpenses} EGP`}</Text>
          </View>
          <Text style={styles.totalNote}>
            * total expenses is calculated for this month only
          </Text>
        </View>
        <Ionicons
          name="ios-add-circle-outline"
          size={60}
          color="white"
          style={styles.addBtn}
          onPress={() => setAddModalOpened(true)}
        />
        {editModalOpened && (
          <Modal
            handleClose={handleModalClose}
            handleSubmit={handleEditExpense}
            btnText="SAVE"
            type="EXPENSE"
            avatarLetter="E"
            item={expenseItem}
            categoriesOptions={categories}
          />
        )}
        {addModalOpened && (
          <Modal
            handleClose={handleModalClose}
            handleSubmit={handleAddExpense}
            btnText="ADD"
            type="EXPENSE"
            avatarLetter="E"
            categoriesOptions={categories}
          />
        )}
      </View>
    </View>
  );
}
export default Expenses;
