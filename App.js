/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import type {Node} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Platform
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

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { CourierClient } from "@trycourier/courier";


const Stack = createNativeStackNavigator()
Amplify.configure(config)

// NEW FOR PUSH NOTIF
Notifications.setNotificationHandler({
 handleNotification: async () => ({
   shouldShowAlert: true,
   shouldPlaySound: false,
   shouldSetBadge: false,
 }),
});

async function registerForPushNotificationsAsync() {
 let token;
 if (1) {
   console.log("HERE")
   const { status: existingStatus } = await Notifications.getPermissionsAsync();
   let finalStatus = existingStatus;
   if (existingStatus !== 'granted') {
     const { status } = await Notifications.requestPermissionsAsync();
     finalStatus = status;
   }
   if (finalStatus !== 'granted') {
     alert('Failed to get push token');
     return;
   }
   token = (await Notifications.getExpoPushTokenAsync()).data;
   console.log("Expo push token:", token);
 } else {
   alert('Can not use this device (not physical)');
 }

 if (Platform.OS === 'android') {
   Notifications.setNotificationChannelAsync('default', {
     name: 'default',
     importance: Notifications.AndroidImportance.MAX,
     vibrationPattern: [0, 250, 250, 250],
     lightColor: '#FF231F7C',
   });
 }

 return token;
}

async function sendPushNotification(expoPushToken) {
 const message = {
   to: expoPushToken,
   sound: 'default',
   title: 'HI FROM WALLFLOWER',
   body: 'Testing push',
   data: { testData: 'test data' },
 };

 await fetch('https://exp.host/--/api/v2/push/send', {
   method: 'POST',
   headers: {
     Accept: 'application/json',
     'Accept-encoding': 'gzip, deflate',
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(message),
 });
}

// END NEW

const App = () => {

// NEW FOR PUSH NOTIF
const [expoPushToken, setExpoPushToken] = useState('');
 const [notification, setNotification] = useState(false);
 const notificationListener = useRef();
 const responseListener = useRef();

 useEffect(() => {
   registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
     setNotification(notification);
     console.log("Notification set")
   });

   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
     console.log(response);
   });

   return () => {
     Notifications.removeNotificationSubscription(notificationListener.current);
     Notifications.removeNotificationSubscription(responseListener.current);
   };
 }, []);
 // END NEW


 //Auth.signOut();
 useEffect( ()=> {
    const fetchUser = async() => {
        //get authenticated user
        const userInfo = await Auth.currentAuthenticatedUser();
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
            }
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



/*<View
   style={{
     flex: 1,
     alignItems: 'center',
     justifyContent: 'space-around',
   }}>
   <Button
     title="Press to Send Notification"
     onPress={async () => {
       await sendPushNotification(expoPushToken);
     }}
   />
 </View>*/
