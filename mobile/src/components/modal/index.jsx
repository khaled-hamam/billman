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
import moment from "moment";

import styles from "./styles";
import CardAvatar from "../cardAvatar";
import CategoriesInput from "../CategoriesInput";

const CalendarIcon = (props) => (
  <AntDesign name="calendar" size={24} color="black" />
);

const ItemModal = ({
  item,
  handleClose,
  handleSubmit,
  btnText,
  type,
  avatarLetter,
}) => {
  const [name, setName] = useState(item ? item.name : "");
  const [date, setDate] = useState(
    item ? new Date(moment(item.CreatedAt).format("l")) : new Date()
  );
  const [amount, setAmount] = useState(parseInt(item ? item.value : 0));
  const [categories, setCategories] = useState([]);

  return (
    <Modal
      backdropStyle={styles.backdrop}
      onBackdropPress={handleClose}
      visible={true}
    >
      <Card disabled={true}>
        <CardAvatar size={70} avatarLetter={avatarLetter} />
        <Input
          style={styles.input}
          placeholder="Name"
          onChangeText={(value) => setName(value)}
          defaultValue={name}
        />
        <View style={{ flexDirection: "row" }}>
          <Input
            style={styles.input}
            placeholder="Amount"
            onChangeText={(value) => setAmount(value)}
            defaultValue={item && amount.toString()}
          />
          <Datepicker
            style={styles.datePicker}
            placeholder="Pick Date"
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
        </View>
        <CategoriesInput options={['cat1', 'abc', 'khaled', 'karim']} categories={categories} setCategories={setCategories} />
        <Button
          style={styles.saveBtn}
          onPress={() =>
            handleSubmit({
              ...item,
              value: parseInt(amount),
              name: name,
              CreatedAt: date,
              type: type,
            })
          }
        >
          {btnText}
        </Button>
      </Card>
    </Modal>
  );
};

export default ItemModal;
