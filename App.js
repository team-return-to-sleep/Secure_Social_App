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
import Amplify, {Auth} from '@aws-amplify/core'
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native'
import config from './src/aws-exports'

import Browse from './screens/Browse'
import Home from './screens/Home'
import {ChatScreen} from './screens/Chat/ChatScreen'
import LoginScreen from './screens/Login/LoginScreen'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

Amplify.configure(config)
// Auth.signOut();
const App = () => {

  return (
    <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#00aaff" />
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="home" component={Home}
                    initialParams={{name:"guest"}}
                />
                <Stack.Screen name="browse" component={Browse} />
                <Stack.Screen name="chat" component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>


        </SafeAreaProvider>

    );
};

const signUpConfig = {
    header: "Sign Up",
    hideAllDefaults: true,
    signUpFields: [
        {
            label: "Full name",
            key: "name",
            required: true,
            displayOrder: 1,
            type: "string",
        },
        {
            label: "Email",
            key: "email",
            required: true,
            displayOrder: 2,
            type: "string",
        },
        {
            label: "Username",
            key: "preferred_username",
            required: true,
            displayOrder: 3,
            type: "string",
        },
        {
            label: "Password",
            key: "password",
            required: true,
            displayOrder: 4,
            type: "password",
        },
    ]
}

const customTheme = {...AmplifyTheme}

//<NavigationContainer>
//
//            <Tab.Navigator
//            screenOptions={({route})=>({
//                tabBarIcon:({color})=>{
//                    let iconName;
//                    if(route.name === "home") {
//                        iconName = ''
//                    } else if (route.name === "search") {
//                        iconName = ""
//                    }
//                },
//
//                })
//            }
//            initialRouteName="Home"
//            activeColor="#f0edf6"
//            inactiveColor="#3e2465"
//            barStyle={{ backgroundColor: '#694fad' }}
//            tabBarColor="#00aaff"
//            >
//                <Tab.Screen name="home" component={Home}
//                    initialParams={{name:"guest"}}
//                />
//                <Tab.Screen name="browse" component={Browse} />
//                <Tab.Screen name="chat" component={ChatScreen} />
//            </Tab.Navigator>
//          </NavigationContainer>

export default withAuthenticator(App, {signUpConfig});
