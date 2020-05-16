import React, { useState } from "react";
import { View, TextInput, Text, AsyncStorage } from "react-native";
import Divider from "react-native-divider";
import { TouchableOpacity } from "react-native-gesture-handler";
import axios from 'axios';
import * as Google from 'expo-google-app-auth';

import styles from "./styles";
import colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import BillmanLogo from "../../../assets/logo_full.svg";

function Login({ navigation, setToken }) {
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await axios.post('/api/users/login', { email, password });
    if (res.status === 200) {
      await AsyncStorage.setItem("userToken", res.data.token);
      axios.defaults.headers.common.Authorization = res.data.token;
      setToken(res.data.token);
    }
  };

  const handleGoogleLogin = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      clientId: '1001013939779-gv2jlhjp1vgaf1ilsmv7maq85ahvvcf7.apps.googleusercontent.com',
    });

    if (type === 'success') {
      try {
        const { data: { token } } = await axios.post('/api/users/google', { name: user.name, email: user.email });
        await AsyncStorage.setItem("userToken", token);
        axios.defaults.headers.common.Authorization = token;
        setToken(token);
      } catch (error) {
        console.log(error);
      }
    }
  }

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
      <TouchableOpacity style={styles.loginWithGoogle} onPress={handleGoogleLogin}>
        <Ionicons name="logo-google" size={25} />
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
