import React, { useReducer, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import axios from "axios";
import { AppLoading } from "expo";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Expenses from "./src/screens/Expenses";
import Home from "./src/screens/Home";
import constants from "./constants";

axios.defaults.baseURL = constants.API_URL;

const Stack = createStackNavigator();
export default function App() {
  const [token, setToken] = useState(undefined);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        setToken(await AsyncStorage.getItem("userToken"));
        setLoading(false);
      } catch (e) {
        return e;
      }
    };
    bootstrapAsync();
  }, []);

  if (loading) {
    return <AppLoading />;
  }

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token == null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Expenses} />
              <Stack.Screen name="Home" component={Home} />
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
