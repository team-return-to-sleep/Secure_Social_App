import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView} from 'react-native'


import Header from './Header'

const Browse = () => {
    const [name, setName] = useState('')
  return (

    <View style={{flex:1}}>
        <Header name="Browse Screen"/>
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
            Save Changes
        </Button>
    </View>

  );
};

export default Browse;