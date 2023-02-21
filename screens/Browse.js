import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from './Header'


const Browse = () => {
    const [name, setName] = useState('')
  return (
    <>
    <View style={{flex:1}}>
        <Header/>
            <TextInput
            label="name"
            theme={{colors:{primary:"#00aaff"}}}
            value={name}
            onChangeText={(text)=>setName(text)}
        />

        <Button icon="content-save"
        mode="contained"
        style={{margin:20}}
        onPress={() => console.log('Pressed')
        }>
            Search User
        </Button>
    </View>


    </>
  );
};

export default Browse;