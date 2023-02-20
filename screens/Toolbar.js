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
import {ChatScreen} from './Chat/ChatScreen'
import Account from './Account'
import ProfileRoot from './Profile/ProfileRoot'

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const Tab = createBottomTabNavigator()

const Toolbar = () => {
  let iconName = '';

  return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#000000",
                tabBarStyle: {
                    position: 'absolute',
                    bottom: '3%',
                    left: '10%',
                    right: '10%',
                    elevation: 0,
                    backgroundColor: '#BBCAEB',
                    borderRadius: 20,
                },
                tabBarIcon: () => {
                    if(route.name === "Home") {
                        iconName = "home-account";
                    } else if (route.name === "Browse") {
                        iconName = "compass";
                    } else if (route.name === "Chat") {
                        iconName = "chat";
                    } else if (route.name === "Account") {
                        iconName = "account-circle";
                    }
                    return <MaterialCommunityIcons name={iconName} size={25} color="#000000"/>
                },
            })}

            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#694fad' }}
            tabBarColor="#00aaff"
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false}} />
            <Tab.Screen name="Browse" component={Browse} options={{ headerShown: false}} />
            <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false}} />
            <Tab.Screen name="Account" component={ProfileRoot} options={{ headerShown: false}} />
        </Tab.Navigator>
  );
};

export default Toolbar;