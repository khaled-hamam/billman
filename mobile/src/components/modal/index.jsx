import React, { useState } from "react";
import { View } from "react-native";
import {
  Button,
  Card,
  Modal,
  Input,
  Datepicker,
  Select,
  SelectItem,
} from "@ui-kitten/components";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";
import CardAvatar from "../cardAvatar";

const CalendarIcon = (props) => (
  <AntDesign name="calendar" size={24} color="black" />
);

const ItemModal = ({ item, handleClose, handleAddExpense }) => {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [ammount, setAmmount] = useState(0);
  const [categories, setCategories] = useState([]);

  const renderOption = (title) => <SelectItem title={title} />;
  const groupDisplayValues = categories.map((index) => {
    const groupTitle = Object.keys(categoriesOptions)[index.section];
    return categoriesOptions[groupTitle];
  });

  const categoriesOptions = [
    "Entertainment",
    "Online Purshace",
    "Supermarker",
    "Others",
  ];

  return (
    <Modal
      backdropStyle={styles.backdrop}
      onBackdropPress={() => handleClose()}
      visible={true}
    >
      <Card disabled={true}>
        <CardAvatar size={70} letterSign="E" />
        <Input
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value="karimm"
        />
        <View style={{ flexDirection: "row" }}>
          <Input
            style={styles.input}
            placeholder="Ammount"
            onChangeText={setAmmount}
          />
          <Datepicker
            style={styles.datePicker}
            placeholder="Pick Date"
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
        </View>
        <Select
          multiSelect={true}
          value={groupDisplayValues.join(", ")}
          selectedIndex={categories}
          onSelect={(index) => setCategories(index)}
          style={styles.categories}
        >
          {Object.keys(categoriesOptions).map(renderOption)}
        </Select>
        <Button style={styles.saveBtn} onPress={handleAddExpense}>
          Save
        </Button>
      </Card>
    </Modal>
  );
};

export default ItemModal;
