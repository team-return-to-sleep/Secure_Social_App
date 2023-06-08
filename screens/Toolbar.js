import * as React from 'react';
import {useState, useEffect} from 'react'
import { StyleSheet } from 'react-native';
import { AccessibilityRole } from 'react-native';
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
import PointScreenRoot from './PointScreenRoot'
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
                    backgroundColor: '#FFC1AD',
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
                    return <MaterialCommunityIcons
                            name={iconName}
                            size={25}
                            color={focused?"#FC4C02":"#000000"}
                            //accessibilityLabel={route.name}
                            //accessibilityRole="button"
                            //testID={`TabIcon-${route.name}Tab`}
                            />
                },
            })}

            barStyle={{ backgroundColor: '#694fad' }}
            tabBarColor="#00aaff"
        >
            <Tab.Screen name="Home" component={Root} options={{ headerShown: false, tabBarTestID: 'HomeTab'}} />
            <Tab.Screen name="Browse" component={Browse} options={{ headerShown: false, tabBarTestID: 'BrowseTab'}} />
            <Tab.Screen name="Chats" component={ChatRoot} options={{ headerShown: false, tabBarTestID: 'ChatsTab'}} />
            <Tab.Screen name="PointScreen" component={PointScreenRoot} options={{ headerShown: false, tabBarTestID: 'PointScreenTab'}} />
            <Tab.Screen name="Account" component={ProfileRoot} options={{ headerShown: false, tabBarTestID: 'AccountTab'}} />
        </Tab.Navigator>
    );
};

export default Toolbar;