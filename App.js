/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
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
import Amplify from '@aws-amplify/core'
import {Auth} from 'aws-amplify'
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native'
import config from './src/aws-exports'

import {getUser} from './src/graphql/queries'
import {createUser} from './src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Browse from './screens/Browse'
import Home from './screens/Home'
import {ChatScreen} from './screens/Chat/ChatScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoginScreen from './screens/Login/LoginScreen'
import Toolbar from './screens/Toolbar'
import Root from './screens/Root'

import { EThree } from '@virgilsecurity/e3kit-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()


Amplify.configure(config)

const apiUrl = `http://${
    Platform.OS === 'android' ? '10.0.2.2' : 'localhost'
}:8080`;

const getTokenFactory = identity => {
    return () =>
        fetch(`${apiUrl}/virgil-jwt?identity=${encodeURIComponent(identity)}`)
            .then(res => res.json())
            .then(data => data.virgil_jwt);
};

const getRandomString = (prefix = '') =>
    `${prefix}${Math.random()
        .toString(36)
        .substr(2)}`;


const App = () => {
 //Auth.signOut();
 useEffect( ()=> {
    const fetchUser = async() => {
        //get authenticated user


        const userInfo = await Auth.currentAuthenticatedUser();

        const Identity = getRandomString('E3kitReactNativeTestIdenity');
        const getToken = getTokenFactory(Identity);
        const eeThree = EThree.initialize(getToken, { AsyncStorage });

        //console.log(userInfo);
        if (userInfo) {
            const userData = await API.graphql (
                {
                    query: getUser,
                    variables: {id: userInfo.attributes.sub},
                    authMode: "API_KEY"
                }
            )
            if (userData.data.getUser) {
                console.log("User is already registered in database");
                return;
            }
            const newUser = {
                id: userInfo.attributes.sub,
                name: userInfo.username,
                imageUri: "https://placeimg.com/140/140/any",
                status: "just created my account",
                identity: Identity,
                eThree: eeThree,
            }
            await eeThree.register();
            await API.graphql(
//                graphqlOperation(
//                    createUser,
//                    {input: newUser}
//                )
                {
                    query: createUser,
                    variables: {input: newUser},
                    authMode: "API_KEY"
                }
            )
            //console.log(userData)
        }
    }
    fetchUser();
 }, []);

  return (
    <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FF9913" />
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Toolbar">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Toolbar" component={Toolbar}
                    options={{ headerShown: false }}
                />
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
//export default App;
