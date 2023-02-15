import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button} from 'react-native-paper';
import {View,Text,SafeAreaView,Alert} from 'react-native'




const LoginScreen = () => {
    const [Username, setName] = useState('')
    const [Password, setPassword] = useState('')

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
            //onPress={this._loginAsync}>
            >
            Login
        </Button>
    </View>

  );

  /********************* Async functions *********************/

  const _loginAsync = ({navigation}) => {
    if (this.Username == null || this.Username == '') {
        Alert.alert("Login Error: Please enter a username")
    } else if (this.Password == null || this.Password == '') {
        Alert.alert("Login Error: Please enter a password")
    } else {
        // do authentication stuff
        navigation.navigate("home", {name:this.Username})
    }
  };

};

export default LoginScreen;