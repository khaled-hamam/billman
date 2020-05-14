import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import axios from "axios";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Expenses from "./src/screens/Expenses";
import Home from "./src/screens/Home";
import constants from "./constants";

axios.defaults.baseURL = constants.API_URL;

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });
};

export default function App() {
  const [token, setToken] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const promises = [
          await AsyncStorage.getItem("userToken"),
          fetchFonts(),
        ];
        const [token] = await Promise.all(promises);
        setToken(token);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    axios.defaults.headers.common.Authorization = token;
  }, [token]);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token == null ? (
            <>
              <Stack.Screen
                name="Login"
                component={(props) => <Login {...props} setToken={setToken} />}
              />
              <Stack.Screen name="Register" component={Register} />
            </>
          ) : (
            <>
              <Stack.Screen name="Expenses" component={Expenses} />
              <Stack.Screen name="Home" component={Home} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
