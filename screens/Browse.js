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
    const [hasSearched, setHasSearched] = useState(false)
    const [users, setUsers] = useState([])
    const [searchedUsers, setSearched] = useState([])
    const [currUsers, setCurr] = useState([])

    useEffect( ()=> {
        const fetchUsers = async() => {
                const usersData = await API.graphql(
                    {
                        query: listUsers,
                        authMode: "API_KEY"
                    }
                )
                setUsers(usersData.data.listUsers.items)
                setCurr(usersData.data.listUsers.items)
                // console.log(usersData.data.listUsers.items)
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log("updated currUsers")
    }, [currUsers]);

    const onClickHandler = async () => {
        if (name != '') {
            let results = []
            for (let i=0; i<users.length; i++) {
                if (users[i].name == name) {
                    results.push(users[i])
                }
            }
//            setSearched(users)
//            setUsers(results)
            //setHasSearched(true)
            if (results.length < 1) {
                Alert.alert("Sorry, cannot find user " + name)
            } else {
                setCurr(results)
                currUsers = results
                console.log("set?")
            }
            //console.log("results: ", results)
        }
        //setUsers(searchedUsers)
        setCurr(users)
        //setHasSearched(false)
    }

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
        onPress={() => onClickHandler()
        }>
            Find User
        </Button>
        <ScrollView style={styles.container}>
            <View style={styles.profileWrapper}>
                {
                currUsers.map((user) => {
                                    return (
                                        <Pressable
                                          style={styles.profile}
                                          onPress={() => navigation.navigate("OtherUserProfile", {user: user})}>
                                        <Image
                                          style={styles.profile}
                                          source={{uri: user.imageUri}}
                                        />
                                        </Pressable>
                                    );
                                })}
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