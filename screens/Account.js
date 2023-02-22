import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import Header from './Header'
import UserProfile from './UserProfile'


const Account = ({navigation}) => {

    const [info, setInfo] = useState({
        name:"loading",
        interests:"loading",
        age:"loading"
    })

    /* <Text style={{margin:20, fontSize:25}}>
           Display name: {info.name} {'\n'}
           Interests: {info.interests} {'\n'}
           Age: {info.age} {'\n'}
       </Text> */

  return (
    <ScrollView style={styles.container}>

        <Header name="Account Info" />
            <View style={styles.accountWrapper}>
                <Text style={styles.username}>rqin</Text>
                <Image
                    style={styles.accountPicture}
                    source={require('../assets/images/pfp_flower.jpg')}
                />
                <Button icon="content-save"
                mode="contained"
                style={styles.profPicButton}>
                    <Text style={styles.profPicText}>Change profile picture</Text>
                </Button>

                <Button mode="contained"
                style={styles.accountButton}
                onPress={() => navigation.navigate("ProfileGender")}>
                    <Text>Edit Interests Profile</Text>
                </Button>
                <Button mode="contained"
                style={styles.accountButton}>
                    <Text>Edit Personal Details</Text>
                </Button>
                <Button mode="contained"
                style={styles.accountButton}
                onPress={() => navigation.navigate("UserProfile")}>
                    <Text>View Public Profile</Text>
                </Button>
            </View>
            <View style={{marginBottom:26}}>
                        <Text>  {'\n\n'} </Text>
            </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
            flex:1,
            backgroundColor:'#FFFFFF',
    },
    accountButton: {
        margin:10,
        width: 200,
        height: 40,
        backgroundColor: '#BBCAEB',
        justifyContent: 'center',

    },
    accountWrapper: {
        alignItems: 'center',
        marginTop: '0%',
    },
    accountPicture: {
        width: 250,
        height: 250,
        borderRadius: 250,
    },
    profPicButton: {
        margin:10,
        width: 200,
        height: 40,
        backgroundColor: 'transparent',
    },
    profPicText: {
        color: '#89A8D6',
        fontStyle: 'italic',
    },
    username: {
            margin:15,
            fontSize: 30,
            fontWeight: 'bold',
    },
});

export default Account;