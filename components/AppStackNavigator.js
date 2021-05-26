import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import Buy from '../screens/BuyScreen'
import RecvDetailsScreen from '../screens/RecvDetailsScreen'
export const AppStackNavigator = createStackNavigator({
    ItemDonateList:{
        screen:Buy,
        navigationOptions:{
            headerShown:false
        }
    },
    ItemRecverDetails:{
        screen:RecvDetailsScreen,
        navigationOptions:{
            headerShown:false
        }
    },
},
    {
        initialRouteName:'ItemRecverDetails'
    }
)