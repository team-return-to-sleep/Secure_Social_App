import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused } from "@react-navigation/native";

import {Auth} from 'aws-amplify'
import {getUser, listUsers} from '../src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'
import { useIsFocused } from "@react-navigation/native";

import Header from './Header'
import UserProfile from './UserProfile'

const Account = ({route, navigation}) => {
  const isFocused = useIsFocused()
  const [users, setUsers] = useState([])

        const fetchUser = async() => {
          const userInfo = await Auth.currentAuthenticatedUser();
          const userData = await API.graphql (
            {
              query: getUser,
              variables: {id: userInfo.attributes.sub},
              authMode: "API_KEY"
             }
           )
           setUsers(Array(1).fill(userData.data.getUser))
        }

     useEffect( ()=> {
        if(isFocused) {
            fetchUser();
        }
     }, [isFocused]);

  return (
    <ScrollView style={styles.container}>
            <Header name="Account Info" />
            <View style={styles.accountWrapper}>
                  {users.map((user) => {
                    return (
                    <>
                    <Text style={styles.username}>{user.name}</Text>
                    <Image
                        style={styles.accountPicture}
                        source={{uri: user.imageUri}}
                    />
                    <Button icon="content-save"
                    mode="contained"
                    style={styles.profPicButton}
                    onPress={() => navigation.navigate("ProfilePicture", {user: user})}>
                        <Text style={styles.profPicText}>Change profile picture</Text>
                    </Button>
                    <Button mode="contained"
                    style={styles.accountButton}
                        onPress={() => {
                            navigation.navigate("ProfileInterests", {user: user})}
                        }>
                        <Text>Edit Interests Profile</Text>
                    </Button>
                    <Button mode="contained"
                    style={styles.accountButton}
                        onPress={() => navigation.navigate("ProfileBasicInfo", {user: user})}>
                        <Text>Edit Personal Details</Text>
                    </Button>
                    <Button mode="contained"
                    style={styles.accountButton}
                    onPress={() => navigation.navigate("UserProfile", {user: user})}>
                        <Text>View Public Profile</Text>
                    </Button>
                    </>
                    );
                  })}
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