import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, TouchableHighlight, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { SwipeListView } from "react-native-swipe-list-view";
import Avatar from "../../components/avatar";
import splash from "../../../assets/splash.png";
import styles from "./styles";
import colors from "../../../constants/colors";
import Modal from "../../components/modal/index";

function Expenses() {
  const [modalOpened, setModalOpened] = useState(false);
  const [listData, setListData] = useState([]);
  const data = [
    {
      name: "karim",
    },
  ];
  useEffect(() => {
    setListData(data);
  }, []);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  const handleAddExpense = () => {
    setModalOpened(false);
  };
  const handleModalClose = () => {
    setModalOpened(false);
  };

  const renderItem = (data) => {
    return (
      <TouchableHighlight>
        <View style={styles.card}>
          <Avatar source={splash} size={80} />
          <View style={styles.cardData}>
            <Text style={styles.itemText}>{data.item.name}</Text>
            <View style={styles.valueContainer}>
              <Text style={styles.itemValue}>180 EGP</Text>
              <Text style={styles.itemText}> / Month</Text>
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
        onPress={() => closeRow(rowMap, data.item.key)}
      >
        <Ionicons name="ios-options" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.key)}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <SwipeListView
        style={styles.list}
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-100}
        previewOpenValue={-40}
        previewOpenDelay={3000}
      />
      <View style={styles.bottomView}>
        <View style={{ flexDirection: "column", flexGrow: 1, marginLeft: 25 }}>
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.totalText}>Total Expenses</Text>
            <Text style={styles.totalValue}>1530 EGP</Text>
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
          onPress={() => setModalOpened(true)}
        />
        {modalOpened && (
          <Modal
            handleClose={handleModalClose}
            handleAddExpense={handleAddExpense}
          />
        )}
      </View>
    </View>
  );
}

export default Expenses;
