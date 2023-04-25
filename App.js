/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, {useState, useCallback, useEffect} from 'react';

import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  ActivityIndicator,
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
import {createUser, createGarden} from './src/graphql/mutations'
import {listUsers} from './src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'

import Browse from './screens/Browse'
import Home from './screens/Home'
import {ChatScreen} from './screens/Chat/ChatScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LoginScreen from './screens/Login/LoginScreen'
import Toolbar from './screens/Toolbar'
import Root from './screens/Root'
import ProfileRoot from './screens/Profile/ProfileRoot'

const Stack = createNativeStackNavigator()

LogBox.ignoreAllLogs() // removes warnings from phone screen

Amplify.configure(config)

const App = () => {
 //Auth.signOut();

 const [exists, setExists] = useState(false);


 useEffect( ()=> {
    const fetchUser = async() => {

        //get authenticated user
        userInfo = await Auth.currentAuthenticatedUser();

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
                setExists(true)

                if (!userData.data.getUser.garden) {
                    await API.graphql(
                        {
                            query: createGarden,
                            variables: {
                                input: {
                                    userID: userData.data.getUser.id,
                                    id: userData.data.getUser.id,
                                    flowerSize: 120,
                                    points: 10
                                }
                            },
                            authMode: "API_KEY"
                        }
                    )
                }

                return;
            }
            const newUser = {
                id: userInfo.attributes.sub,
                name: userInfo.username,
                imageUri: "https://placeimg.com/140/140/any",
                status: "just created my account",
            }
            await API.graphql(
                {
                    query: createUser,
                    variables: {input: newUser},
                    authMode: "API_KEY"
                }
            )
            await API.graphql(
                {
                    query: createGarden,
                    variables: {
                        input: {
                            userID: newUser.id,
                            id: newUser.id,
                            flowerSize: 120,
                            points: 10
                        }
                    },
                    authMode: "API_KEY"
                }
            )
            //console.log(userData)
        }

    }

    fetchUser();

 }, []);
    console.log("exists ", exists)
  return (
    <SafeAreaProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FF9913" />
        <NavigationContainer>
            <Stack.Navigator initialRouteName={!exists ? ("Toolbar") : ("ProfileRoot")}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Toolbar" component={Toolbar}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileRoot" component={ProfileRoot}
                    options={{ headerShown: false}}
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

export default withAuthenticator(App, {signUpConfig});
//export default App;
