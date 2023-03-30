import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, Badge } from 'react-native-paper';
import {View,Text,SafeAreaView,ScrollView,Image,StyleSheet,Pressable,ImageBackground} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import Header from './Header'

import {listUsers} from '../src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toolbar from './Toolbar'
import UserProfile from './UserProfile'
import Browse from './Account'

const Home = ({navigation}) => {
    const [users, setUsers] = useState([])

    useEffect( ()=> {
        const fetchUsers = async() => {
                const usersData = await API.graphql(
                    {
                        query: listUsers,
                        authMode: "API_KEY"
                    }
                )
                setUsers(usersData.data.listUsers.items)
                // console.log(usersData.data.listUsers.items)
        }
        fetchUsers();
     }, []);

         return (
            <ScrollView style={styles.container}>
                <Header />
                <SafeAreaView>
                     <View style={styles.headerWrapper}>
                         {users.map((user) => {
                             return (
                                 <Image
                                   key={user.id}
                                   style={styles.profileImage}
                                   source={{uri: user.imageUri}}
                                 />
                             );
                         })}
                     </View>
                </SafeAreaView>
                <Text style={styles.subtext}>Your Friends</Text>
                <View style={styles.profileWrapper}>
                    {users.map((user) => {
                        return (
                            <Pressable
                                key={user.id}
                                style={styles.profile}
                                onPress={() => navigation.navigate("OtherUserProfile", {user: user})}>
                            <Image
                                style={styles.profile}
                                source={{uri: user.imageUri}}
                            />
                            <Text style={styles.nameIcon}>{user.name}</Text>
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
        );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
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
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
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
    chooseButton: {
        borderRadius: 50,
        width: 20,
    },
    imageIcon: {
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
            position: 'absolute',
    },
    nameIcon: {
        marginTop: 50,
        color: 'white',
        fontSize: 20,
        lineHeight: 54,
        lineWidth: 100,
        fontWeight: 'bold',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000c0',
        borderRadius: 20,
        position: 'absolute',
    },
    subtext: {
        marginLeft:15,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Home;