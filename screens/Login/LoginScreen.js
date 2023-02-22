import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button} from 'react-native-paper';
import {View,Text,SafeAreaView,Alert} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Amplify, {Auth} from '@aws-amplify/core'


const LoginScreen = ({navigation}) => {
    const [Username, setName] = useState('')
    const [Password, setPassword] = useState('')

    // Not actually async, may need to restructure this as a class with functions
    /********************* Async functions *********************/

   const _loginAsync = () => {
     if (Username == null || Username == '') {
         Alert.alert("Login Error: Please enter a username")
     } else if (Password == null || Password == '') {
         Alert.alert("Login Error: Please enter a password")
     } else {
         // do authentication stuff
         navigation.navigate("Toolbar", {screen:'Home'})
     }
   };

  return (

    <View style={{flex:1}}>

        <TextInput
            placeholder="Username"
            theme={{colors:{primary:"#00aaff"}}}
            value={Username}
            onChangeText={(text)=>setName(text)}
        />

        <TextInput
            placeholder="Password"
            theme={{colors:{primary:"#00aaff"}}}
            value={Password}
            onChangeText={(text)=>setPassword(text)}
        />

        <Button icon="content-save"
            mode="contained"
            style={{margin:20}}
            onPress={_loginAsync}
            //onPress={() => navigation.navigate("Toolbar", {screen:'Home'})}
            //onPress={Auth.signOut()}
        >
            Login
        </Button>
    </View>

  );



};

export default LoginScreen;