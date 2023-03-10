import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Browse from './Browse'
import Home from './Home'
import ChatRoot from './Chat/ChatRoot'
import Account from './Account'
import ProfileRoot from './Profile/ProfileRoot'
import PointScreen from './PointScreen'
import Root from './Root'

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const Tab = createBottomTabNavigator()

const Toolbar = () => {
  let iconName = '';

  return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#FC4C02",
                tabBarInactiveTintColor: "#000000",
                tabBarStyle: {
                    position: 'absolute',
                    bottom: '3%',
                    left: '10%',
                    right: '10%',
                    elevation: 0,
                    backgroundColor: '#BBCAEB',
                    borderRadius: 20,
                },
                tabBarIcon: ({focused, color}) => {
                    if(route.name === "Home") {
                        iconName = "home-account";
                    } else if (route.name === "Browse") {
                        iconName = "compass";
                    } else if (route.name === "Chats") {
                        iconName = "chat";
                    } else if (route.name === "Account") {
                        iconName = "account-circle";
                    } else if (route.name === "PointScreen") {
                        iconName = "flower";
                    }
                    return <MaterialCommunityIcons name={iconName} size={25} color={focused?"#FC4C02":"#000000"}/>
                },
            })}

            barStyle={{ backgroundColor: '#694fad' }}
            tabBarColor="#00aaff"
        >
            <Tab.Screen name="Home" component={Root} options={{ headerShown: false}} />
            <Tab.Screen name="Browse" component={Browse} options={{ headerShown: false}} />
            <Tab.Screen name="Chats" component={ChatRoot} options={{ headerShown: false}} />
            <Tab.Screen name="PointScreen" component={PointScreen} options={{ headerShown: false}} />
            <Tab.Screen name="Account" component={ProfileRoot} options={{ headerShown: false}} />
        </Tab.Navigator>
  );
};

export default Toolbar;