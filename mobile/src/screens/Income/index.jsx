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

function Income() {
  const [addModalOpened, setAddModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [incomeItem, setIncomeItem] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [totalIncomes, setTotalIncomes] = useState(0);
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
      (transaction) => transaction.type === "INCOME"
    );
    let total = 0;
    exp.forEach((item) => (total += item.value));

    setIncomes(exp);
    setTotalIncomes(total);
  }, [transactions]);

  useEffect(() => {
    if (incomeItem.name) {
      setEditModalOpened(true);
    }
  }, [incomeItem]);

  useEffect(() => {
    let total = 0;
    incomes.forEach((item) => (total += item.value));
    setTotalIncomes(total);
  }, [incomes]);

  const deleteIncome = async (rowMap, itemId) => {
    const res = await axios.delete(`/api/transactions/${itemId}`);
    if (res.status === 200) {
      const newData = [...incomes];
      const deletedIndex = incomes.findIndex((item) => item.ID === itemId);
      if (deletedIndex >= 0) {
        rowMap[deletedIndex].closeRow();
        newData.splice(deletedIndex, 1);
      }
      setIncomes(newData);
    }
  };

  const handleAddIncome = async (income) => {
    const res = await axios.post("/api/transactions", income);
    if (res.status === 201) {
      const newIncomes = [...incomes];
      newIncomes.push(income);
      setIncomes(newIncomes);
    }
    setAddModalOpened(false);
  };
  const handleEditIncome = async (income) => {
    const res = await axios.patch(`/api/transactions/${income.ID}`, income);
    if (res.status === 200) {
      const newIncomes = [...incomes];
      const editedIndex = newIncomes.findIndex((item) => item.ID === income.ID);
      if (editedIndex >= 0) {
        newIncomes[editedIndex] = income;
        setIncomes(newIncomes);
      }
      setEditModalOpened(false);
    }
  };

  const handleModalClose = () => {
    setEditModalOpened(false);
    setAddModalOpened(false);
    setIncomeItem({});
  };

  const renderItem = (data) => {
    return (
      <TouchableHighlight>
        <View style={styles.card}>
          <CardAvatar size={70} avatarLetter="I" />
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
        onPress={() => setIncomeItem(data.item)}
      >
        <Ionicons name="ios-options" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteIncome(rowMap, data.item.ID)}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {incomes.length > 0 && (
        <SwipeListView
          style={styles.list}
          data={incomes}
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
            <Text style={styles.totalText}>Total Income</Text>
            <Text style={styles.totalValue}>{`${totalIncomes} EGP`}</Text>
          </View>
          <Text style={styles.totalNote}>
            * total income is calculated for this month only
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
            handleSubmit={handleEditIncome}
            btnText="SAVE"
            type="INCOME"
            avatarLetter="I"
            item={incomeItem}
            categoriesOptions={categories}
          />
        )}
        {addModalOpened && (
          <Modal
            handleClose={handleModalClose}
            handleSubmit={handleAddIncome}
            btnText="ADD"
            type="INCOME"
            avatarLetter="I"
            categoriesOptions={categories}
          />
        )}
      </View>
    </View>
  );
}
export default Income;
