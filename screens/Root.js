import * as React from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Home from './Home'
import UserProfile from './UserProfile'
import OtherUserProfile from './OtherUserProfile'
import SignUpFlowProfileBasicSetup from './Profile/SignUpFlowProfileBasicSetup'
import SignUpFlowProfileSpecificInterests from './Profile/SignUpFlowProfileSpecificInterests'
import FlowerShop from './FlowerShop'

const Stack = createNativeStackNavigator()

const Root = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="UserProfile" component={UserProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="OtherUserProfile" component={OtherUserProfile}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUpFlowProfileBasicSetup" component={SignUpFlowProfileBasicSetup}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="SignUpFlowProfileSpecificInterests" component={SignUpFlowProfileSpecificInterests}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FlowerShop" component={FlowerShop}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>

    );
};

export default Root;

