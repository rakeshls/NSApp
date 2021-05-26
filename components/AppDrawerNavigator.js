import React from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator}from './AppTabNavigator'
import CSBMenu from './CSBMenu'
import  SettingScreen from '../screens/SettingScreen'
import myTranstionScreen from '../screens/MyTransactions'
import NotificationScreen from '../screens/NotifcationScreen'
import {Icon} from 'react-native-elements'
export const AppDrawerNavigator=createDrawerNavigator({
Home:{
    screen:AppTabNavigator,
    navigationOptions:{
        drawerIcon:<Icon name='home' type='font-awesome'  />,
        drawerLabel:"Home"
    }
},
MyTranstions:{
 screen:myTranstionScreen,
  navigationOptions:{
    drawerIcon:<Icon name='gift' type='font-awesome'  />,
    drawerLabel:"My Transtions"
}
},
Notification:{
screen: NotificationScreen,
navigationOptions:{
    drawerIcon:<Icon name='bell' type='font-awesome'  />,
    drawerLabel:"Notifications"
}
},
Setting:{
    screen:SettingScreen,
    navigationOptions:{
        drawerIcon : <Icon name="settings" type ="fontawesome5" />,
        drawerLabel : "Settings"
      }
},
},
{
    contentComponent:CSBMenu
},
{initialRouteName:'Home'
})