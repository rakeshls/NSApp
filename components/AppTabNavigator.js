import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Buy from '../screens/BuyScreen';
import Sell from '../screens/SellScreen';

export const AppTabNavigator = createBottomTabNavigator({
   BuyItems: {
    screen: Buy,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/buy.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Buy",
    }
  },
  SellItems: {
    screen: Sell,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/sell.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Sell",
    }
  }
});