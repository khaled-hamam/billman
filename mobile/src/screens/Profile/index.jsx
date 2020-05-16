import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Image, AsyncStorage } from "react-native";
import { Input, Icon } from "@ui-kitten/components";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from "axios";
import Avatar from "../../components/avatar";
import download from "../../../assets/download.jpg";
import { createStackNavigator } from "@react-navigation/stack";

function Profile({ navigation, setToken }) {
  const [userInfo, setUserInfo] = useState({});
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [budgetFocused, setBudgetFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
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
    console.log(res.status);
  };

  const handleLogOut = async () => {
    setToken(undefined);
    AsyncStorage.removeItem("userToken");
  };

  useEffect(() => {
    console.log("effect", name, monthlyBudget);
  }, [name, monthlyBudget]);

  useEffect(() => {
    setName(userInfo.name);
    setMonthlyBudget(userInfo.monthlyBudget);
    console.log(monthlyBudget, name);
  }, [userInfo]);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await axios.get("/api/users/me");
      if (res.status === 200) {
        setUserInfo(res.data);

        console.log(userInfo);
        return;
      }
      return undefined;
    };
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Profile</Text>
        <Avatar size={80} source={download} />
      </View>
      <Input
        placeholder="Email"
        value={userInfo.email}
        disabled={true}
        style={styles.input}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
      />
      <Input
        placeholder="Name"
        style={styles.input}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        onChangeText={value => setName(value)}
        defaultValue={userInfo.name}
      />
      <Input
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={value => setPassword(value)}
      />
      <Input
        placeholder="Budget"
        style={styles.input}
        onFocus={() => {
          setBudgetFocused(true);
          console.log(userInfo.monthlyBudget);
        }}
        onBlur={() => setBudgetFocused(false)}
        onChangeText={value => setMonthlyBudget(parseInt(value))}
        defaultValue={
          userInfo.monthlyBudget && userInfo.monthlyBudget.toString()
        }
      />

      <TouchableOpacity style={styles.saveButton} onPress={() => handleEdit()}>
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
