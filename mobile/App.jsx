import React, { useReducer, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AsyncStorage } from "react-native";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";

import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Expenses from "./src/screens/Expenses";

const Stack = createStackNavigator();
export default function App() {
  [token, setToken] = useState(null);
  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        token = await AsyncStorage.getItem("userToken");
      } catch (e) {
        return e;
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {token == null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Expenses} />
            </>
          ) : (
            <Stack.Screen name="Home" />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
}
