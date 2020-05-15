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

const CalendarIcon = (props) => (
  <AntDesign name="calendar" size={24} color="black" />
);

const ItemModal = ({ item, handleClose, handleSubmit, btnText }) => {
  const [name, setName] = useState(item ? item.name : "");
  const [date, setDate] = useState(
    item ? new Date(moment(item.CreatedAt).format("l")) : new Date()
  );
  const [ammount, setAmmount] = useState(parseInt(item ? item.value : 0));

  return (
    <Modal
      backdropStyle={styles.backdrop}
      onBackdropPress={handleClose}
      visible={true}
    >
      <Card disabled={true}>
        <CardAvatar size={70} letterSign="E" />
        <Input
          style={styles.input}
          placeholder="Name"
          onChangeText={(value) => setName(value)}
          defaultValue={name}
        />
        <View style={{ flexDirection: "row" }}>
          <Input
            style={styles.input}
            placeholder="Ammount"
            onChangeText={(value) => setAmmount(value)}
            defaultValue={item && ammount.toString()}
          />
          <Datepicker
            style={styles.datePicker}
            placeholder="Pick Date"
            date={date}
            onSelect={(nextDate) => setDate(nextDate)}
            accessoryRight={CalendarIcon}
          />
        </View>
        {/* TODO: SELECT */}
        <Button
          style={styles.saveBtn}
          onPress={() =>
            handleSubmit({
              ...item,
              value: parseInt(ammount),
              name: name,
              CreatedAt: date,
              type: "EXPENSE",
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
