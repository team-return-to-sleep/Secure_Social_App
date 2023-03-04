import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,Image,Pressable,StyleSheet,ScrollView,Alert} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {listUsers} from '../src/graphql/queries'

import {API, graphqlOperation} from '@aws-amplify/api'

import Header from './Header'


const Browse = ({navigation}) => {
    const [name, setName] = useState('')
    const [users, setUsers] = useState([])

    useEffect( ()=> {
        const fetchUsers = async() => {
            //try{
                const usersData = await API.graphql(
                    {
                        query: listUsers,
                        authMode: "API_KEY"
                    }
                )
                setUsers(usersData.data.listUsers.items)
                //console.log(usersData.data.listUsers.items)
                console.log(users[0].imageUri)
            //catch(e){console.log("error"}
        }
        fetchUsers();
     }, []);

  return (
    <>
    <View style={{flex:1}}>
        <Header/>
            <TextInput
            label="search for a username"
            theme={{colors:{primary:"#000000"}}}
            value={name}
            onChangeText={(text)=>setName(text)}
        />

        <Button icon="magnify"
        mode="contained"
        style={{margin:20, backgroundColor: '#BBCAEB'}}
        onPress={() => Alert.alert("Sorry, cannot find user " + name)
        }>
            Find User
        </Button>
        <ScrollView style={styles.container}>
            <View style={styles.profileWrapper}>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("OtherUserProfile", {user: users[0]})}>
                    <Image
                      style={styles.profile}
                      source={{uri: users[0].imageUri}}
                     // source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                      <Image
                         style={styles.profile}
                         source={require('../assets/images/profpic.png')}
                      />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                    <Image
                      style={styles.profile}
                      source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                    <Image
                      style={styles.profile}
                      source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                    <Image
                      style={styles.profile}
                      source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
            </View>
        </ScrollView>
    </View>


    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    profile: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 7,
            marginBottom: 7,
            width: 170,
            height: 170,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: '#AFE1AF',
            borderRadius: 24,
    },
    profileWrapper: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20,
    },
});

export default Browse;