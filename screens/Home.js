import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, Badge } from 'react-native-paper';
import {View,Text,SafeAreaView,ScrollView,Image,StyleSheet,Pressable,ImageBackground} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import Header from './Header'

import {getUser, listUsers} from '../src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'
import {Auth} from 'aws-amplify'
import { useIsFocused } from "@react-navigation/native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toolbar from './Toolbar'
import UserProfile from './UserProfile'
import Browse from './Account'

const Home = ({navigation}) => {
    const [users, setUsers] = useState([])
    const isFocused = useIsFocused()

    useEffect( ()=> {
        if(isFocused){
            const fetchUsers = async() => {
                    const userInfo = await Auth.currentAuthenticatedUser();
                    const selfData = await API.graphql (
                        {
                            query: getUser,
                            variables: {id: userInfo.attributes.sub},
                            authMode: "API_KEY"
                        }
                    )
                    const selfInterests = selfData.data.getUser.interests

                    const usersData = await API.graphql(
                        {
                            query: listUsers,
                            authMode: "API_KEY"
                        }
                    )
                    const allUsers = usersData.data.listUsers.items;

                    let compareInterests = (a1, a2) => a1.reduce((a, c) => a + a2.includes(c), 0);

                    // sort by number of matching interests; descending order
                    allUsers.sort(function(a, b){
                        if (!b.interests && a.interests) {
                            return -1
                        } else if (!a.interests && b.interests) {
                            return 1
                        } else if (!a.interests && !b.interests) {
                            return 0
                        }
                        return compareInterests(b.interests, selfInterests) -
                               compareInterests(a.interests, selfInterests)
                    })
                    setUsers(allUsers)
                    // for verification purposes
                    for (let curr of allUsers) {
                        console.log("HOME matches: ", curr.name, " ", curr.interests)
                    }
            }
            fetchUsers();
        }
    }, [isFocused]);

    return (
        <ScrollView style={styles.container}>
            <Header />

            <SafeAreaView>
                <ScrollView
                    contentContainerStyle={styles.headerWrapper}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {users.map((user) => {
                        return (
                            <Image
                                style={styles.profileImage}
                                source={{uri: user.imageUri}}
                            />
                        );
                    })}
                </ScrollView>
            </SafeAreaView>

            <Text style={styles.subtext}>Your Matches</Text>

            <View style={styles.profileWrapper}>
                {users.map((user) => {
                    return (
                        <Pressable
                            style={styles.profile}
                            onPress={() => navigation.navigate("OtherUserProfile", {user: user})}
                        >
                            <Image
                                style={styles.profile}
                                source={{uri: user.imageUri}}
                            />
                            <Text style={styles.nameIcon}>{user.name}</Text>
                        </Pressable>
                    );
                })}
            </View>
            <View style={{marginBottom:26}}>
                <Text> {'\n\n'} </Text>
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
        marginHorizontal: 12,
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
        marginTop: 120,
        color: 'white',
        fontSize: 20,
        lineHeight: 54,
        lineWidth: 170,
        fontWeight: 'bold',
        //textAlign: 'center',
        //textAlignVertical: 'bottom', // android only
        //justifyContent: 'center',
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