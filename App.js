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

import Browse from './screens/Browse'
import Home from './screens/Home'
import {ChatScreen} from './screens/Chat/ChatScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator()

const App = () => {

  return (
    <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
        <NavigationContainer>
            <Tab.Navigator
            screenOptions={({route})=>({
                tabBarIcon:({color})=>{
                    let iconName;
                    if(route.name === "home") {
                        iconName = 'home-account'
                    } else if (route.name === "browse") {
                        iconName = "compass"
                    } else if (route.name === "chat") {
                        iconName = "chat"
                    }
                    return <MaterialCommunityIcons name={iconName} size={25} color={color} />
                },

                })
            }
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#00aaff' }}
            tabBarColor="#00aaff"
            >
                <Tab.Screen name="home" component={Home} />
                <Tab.Screen name="browse" component={Browse} />
                <Tab.Screen name="chat" component={ChatScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>

    );
};



export default App;
