import * as React from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Chats from './Chats'
import {ChatScreen} from './ChatScreen'

const Stack = createNativeStackNavigator()

const ChatRoot = () => {
    return (
        <Stack.Navigator initialRouteName="Chats">
            <Stack.Screen name="Chat" component={Chats}
                options={{ headerShown: false }}
            />

            <Stack.Screen name="ChatScreen" component={ChatScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default ChatRoot;