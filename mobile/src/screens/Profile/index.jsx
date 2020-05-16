import React, { useState, useEffect } from "react";
import { View, Text, Keyboard, AsyncStorage } from "react-native";
import { Input, Icon } from "@ui-kitten/components";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Avatar from "../../components/avatar";
import download from "../../../assets/download.jpg";
import { createStackNavigator } from "@react-navigation/stack";

function Profile({ navigation, setToken }) {
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(undefined);
  const [monthlyBudget, setMonthlyBudget] = useState();

  const handleEdit = async () => {
    console.log(name, email, monthlyBudget, password);
    const res = await axios.patch("/api/users", {
      name,
      monthlyBudget,
      password
    });
  };

  const handleLogOut = async () => {
    setToken(undefined);
    AsyncStorage.removeItem("userToken");
  };

  useEffect(() => {}, [name, monthlyBudget]);

  useEffect(() => {
    setName(userInfo.name);
    setMonthlyBudget(userInfo.monthlyBudget);
  }, [userInfo]);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get("/api/users/me");
      if (res.status === 200) {
        setUserInfo(res.data);

        return;
      }
      return undefined;
    };
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar size={80} source={download} />
      </View>
      <Input
        placeholder="Email"
        value={userInfo.email}
        disabled={true}
        style={styles.input}
      />
      <Input
        placeholder="Name"
        style={styles.input}
        onChangeText={value => setName(value)}
        defaultValue={userInfo.name}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={value => setPassword(value)}
      />
      <Input
        placeholder="Budget"
        style={styles.input}
        onChangeText={value => setMonthlyBudget(parseInt(value))}
        defaultValue={
          userInfo.monthlyBudget && userInfo.monthlyBudget.toString()
        }
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          handleEdit();
          Keyboard.dismiss();
        }}
      >
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            textAlign: "center",
            color: "#fff",

            fontSize: 16
          }}
        >
          SAVE CHANGES
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logOutButton} onPress={handleLogOut}>
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            textAlign: "center",
            color: "#fff",
            fontSize: 16
          }}
        >
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
}
export default Profile;
