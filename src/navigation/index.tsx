import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import { createBottomTabNavigator } from "react-navigation-tabs";

import { createStackNavigator } from "react-navigation-stack";

import { Icon } from "react-native-elements";
import AppLoading from "./AppLoading";
import {
  Signup,
  Signin,
  ForgotPassword,
  Confirm,
  ChangeUsername,
  ChangeAttributes
} from "authentication";

import { Colors } from "common";
import { View } from "react-native";
import { Text } from "react-native-ui-kitten";

const GenericScreen = () => (
  <View>
    <Text>I'm a screen!!</Text>>
  </View>
);

const RandomStack = createStackNavigator(
  {
    GenericScreen
  },
  {
    defaultNavigationOptions: {
      header: null
    },
    navigationOptions: {
      tabBarIcon: ({ focused }) => (
        <Icon
          name="shop"
          type="entypo"
          color={focused ? Colors.blue : "white"}
          size={25}
        />
      )
    }
  }
);

const App = createBottomTabNavigator({
  RandomStack
});

const AuthStack = createStackNavigator(
  {
    Signin,
    Signup,
    ForgotPassword,
    Confirm
  },
  {
    defaultNavigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      App,
      Auth: AuthStack,
      AppLoading
    },
    {
      initialRouteName: "AppLoading"
    }
  )
);
