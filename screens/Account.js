import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Header from './Header'


const Account = ({navigation}) => {
    const [info, setInfo] = useState({
        name:"loading",
        interests:"loading",
        age:"loading"
    })

  return (

    <View style={{flex:1}}>

        <Header name="Account Info" />

        <Text style={{margin:20, fontSize:25}}>
            Display name: {info.name} {'\n'}
            Interests: {info.interests} {'\n'}
            Age: {info.age} {'\n'}
        </Text>

        <Button icon="content-save"
        mode="contained"
        style={{margin:20}}
        onPress={() => navigation.navigate("ProfileGender")}>
            Edit Profile
        </Button>
    </View>



  );
};

export default Account;