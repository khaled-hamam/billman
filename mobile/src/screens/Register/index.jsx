import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import BillmanLogo from "../../../assets/logo_full.svg";
import axios from "axios";

function Register({ navigation }) {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await axios.post("/api/users", { name, email, password });
    if (res.status === 201) {
      navigation.navigate("Login");
    }
  };

  return (
    <View style={styles.container}>
      <BillmanLogo width={200} height={200} style={styles.logo} />
      <TextInput
        placeholder="Name"
        style={nameFocused ? styles.focusedInput : styles.textInput}
        onFocus={() => setNameFocused(true)}
        onBlur={() => setNameFocused(false)}
        onChangeText={setName}
      />
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
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            textAlign: "center",
            color: "#fff",
            fontSize: 16,
          }}
        >
          REGISTER
        </Text>
      </TouchableOpacity>
      <Text
        style={styles.registerBtn}
        onPress={() => navigation.replace("Login")}
      >
        ALREADY HAVE ACCOUNT?
      </Text>
    </View>
  );
}
export default Register;
