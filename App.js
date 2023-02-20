/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {SafeAreaProvider} from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Browse from './screens/Browse'
import Home from './screens/Home'
import {ChatScreen} from './screens/Chat/ChatScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoginScreen from './screens/Login/LoginScreen'
import Toolbar from './screens/Toolbar'

const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Toolbar" component={Toolbar}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>

    </SafeAreaProvider>

    );
};

export default App;
