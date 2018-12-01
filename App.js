/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './MainIndex';
import ContactScreen from './Component/Contact';
import InvokeScreen from './Component/Invoke';
import SocialScreen from './Component/Social';
import LoginScreen from './Component/Login';


const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Contact: {
    screen: ContactScreen
  },
  Invoke:{
    screen: InvokeScreen
  },
  Social:{
    screen: SocialScreen
  },
  Login:{
    screen:LoginScreen
  }

},{
  headerMode:'none',
  

});

export default createAppContainer(AppNavigator);