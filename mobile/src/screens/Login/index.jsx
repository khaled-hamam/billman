import React, { useState } from "react";
import { View, TextInput, Text, AsyncStorage } from "react-native";
import Divider from "react-native-divider";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import axios from 'axios';

import styles from "./styles";
import colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import BillmanLogo from "../../../assets/logo_full.svg";

const fetchFonts = () => {
  return Font.loadAsync({
    "OpenSans-Bold": require("../../../assets/fonts/OpenSans-Bold.ttf"),
  });
};

function Login({ navigation }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post('/api/users/login', { email, password });
    if (res.status === 200) {
      await AsyncStorage.setItem("userToken", res.data.token);
      navigation.navigate('Home');
    }
  };

  if (!dataLoaded)
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  return (
    <View style={styles.container}>
      <BillmanLogo width={200} height={200} style={styles.logo} />
      <TextInput
        placeholder="Email"
        style={emailFocused ? styles.focusedInput : styles.textInput}
        onFocus={() => setEmailFocused(true)}
        onBlur={() => setEmailFocused(false)}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={passwordFocused ? styles.focusedInput : styles.textInput}
        onFocus={() => setPasswordFocused(true)}
        onBlur={() => setPasswordFocused(false)}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            textAlign: "center",
            color: "#fff",
            fontSize: 16,
          }}
        >
          LOGIN
        </Text>
      </TouchableOpacity>
      <Divider style={styles.divider} orientation="center" color={colors.grey}>
        OR
      </Divider>
      <TouchableOpacity style={styles.loginWithGoogle} onPress={handleLogin}>
        <Ionicons name="md-mail" size={25} />
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            textAlign: "center",
            color: `${colors.grey}`,
            fontSize: 16,
            marginLeft: 15,
          }}
        >
          Sign in with Google
        </Text>
      </TouchableOpacity>
      <Text
        onPress={() => navigation.replace("Register")}
        style={styles.registerBtn}
      >
        CREATE ACCOUNT
      </Text>
    </View>
  );
}
export default Login;
