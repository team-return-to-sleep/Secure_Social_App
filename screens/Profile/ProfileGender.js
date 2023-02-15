import * as React from 'react';
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView} from 'react-native'

import Header from '../Header'

const ProfileGender = ({navigation}) => {


    return (
        <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
        </Appbar.Header>
        <View style={{flex:1}}>

            <Header name="What is your gender?" />

            <Button icon="content-save"
            mode="contained"
            style={{margin:20}}
            onPress={() => navigation.navigate("ProfileInterests")}>
                Continue
            </Button>
        </View>
        </>


      );
}

export default ProfileGender;