import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage, Vibration, Platform } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import * as Font from "expo-font";
import { AppLoading, Notifications } from "expo";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import axios from "axios";
import { setCustomText } from "react-native-global-props";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Expenses from "./src/screens/Expenses";
import Income from "./src/screens/Income";
import Profile from "./src/screens/Profile";

import Home from "./src/screens/Home";
import constants from "./constants";

axios.defaults.baseURL = constants.API_URL;

const Stack = createStackNavigator();

const fetchFonts = () => {
  return Font.loadAsync({
    OpenSans: require("./assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });
};

registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }
};


export default function App() {
  const [token, setToken] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const WrappedLogin = (props) => <Login {...props} setToken={setToken} />;
  const WrappedProfile = (props) => <Profile {...props} setToken={setToken} />;

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const promises = [
          await AsyncStorage.getItem("userToken"),
          fetchFonts(),
          registerForPushNotificationsAsync()
        ];
        const [token] = await Promise.all(promises);
        setCustomText({
          style: {
            fontFamily: "OpenSans"
          }
        });
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
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            headerTitleStyle: { fontFamily: "OpenSans-Bold" }
          }}
        >
          {token == null ? (
            <>
              <Stack.Screen
                name="Login"
                component={WrappedLogin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Income" component={Income} />
              <Stack.Screen name="Expenses" component={Expenses} />
              <Stack.Screen
                name="Profile"
                component={WrappedProfile}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
