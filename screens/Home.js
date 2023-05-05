import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, Button, Badge } from 'react-native-paper';
import {View,Text,SafeAreaView,ScrollView,Image,StyleSheet,Pressable,ImageBackground} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import Header from './Header'

import {Auth} from 'aws-amplify'
import {updateUser} from '../src/graphql/mutations'

import {getUser, listUsers} from '../src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'
import { useIsFocused } from "@react-navigation/native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toolbar from './Toolbar'
import UserProfile from './UserProfile'
import Browse from './Account'
import ProfileAge from './Profile/ProfileAge'
import ProfileRegion from './Profile/ProfileRegion'

const Home = ({navigation}) => {
    const [user, setUser] = useState([])
    const [users, setUsers] = useState([])
    const isFocused = useIsFocused()

    const onClickHandler = async (user) => {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql (
            {
                      query: getUser,
                      variables: {id: userInfo.attributes.sub},
                      authMode: "API_KEY"
            }
        )

        let myFriends = userData.data.getUser.friends
        if (myFriends) {
            for (let i=0; i<myFriends.length; i++) {
                if (myFriends[i] == user.id.toString()) {
                    return;
                }
            }

            myFriends.push(user.id.toString())
        } else {
            myFriends = [user.id.toString()]
        }
        const updatedUser = {
            id: userData.data.getUser.id,
            friends: myFriends,
        };
        const updated = await API.graphql (
                {
                          query: updateUser,
                          variables: {input: updatedUser},
                          authMode: "API_KEY"
                }
        )
        navigation.navigate("Chats")

      }


    useEffect( ()=> {
        if(isFocused){
            const fetchUsers = async() => {
                    const userInfo = await Auth.currentAuthenticatedUser();
                    setUser(userInfo.attributes.preferred_username)

                    const selfData = await API.graphql (
                        {
                            query: getUser,
                            variables: {id: userInfo.attributes.sub},
                            authMode: "API_KEY"
                        }
                    )

                    //console.log("DEBUG SELF: ", selfData.data.getUser.interests.items)
                    const selfInterests = selfData.data.getUser.interests.items
                    const selfRegion = selfData.data.getUser.region
                    const selfAge = selfData.data.getUser.age
//                    console.log("MYREGIONIS")
//                    console.log(selfRegion)
                    if(!selfAge) {
                        navigation.navigate("ProfileAge", {user: selfData.data.getUser})
                    }
                    if(!selfRegion) {
                        navigation.navigate("ProfileAge", {user: selfData.data.getUser})
                    }

                    const usersData = await API.graphql(
                        {
                            query: listUsers,
                            authMode: "API_KEY"
                        }
                    )

                    const allUsers = usersData.data.listUsers.items;
                    //console.log("DEBUG ALL: ", allUsers)

                    let compareInterests = (a1, a2) =>
                        a1.reduce((a, c) => a + a2.some(e => e.categoryName === c.categoryName), 0);

                    // sort by number of matching interests; descending order
                    allUsers.sort(function(a, b){
                        if (!b.interests.items && a.interests.items) {
                            return -1
                        } else if (!a.interests.items && b.interests.items) {
                            return 1
                        } else if (!a.interests.items && !b.interests.items) {
                            return 0
                        }
                        return (compareInterests(b.interests.items, selfInterests) +
                                ((b.region && selfRegion && b.region === selfRegion)?1:0)) -
                               (compareInterests(a.interests.items, selfInterests) +
                                ((a.region && selfRegion && a.region === selfRegion))?1:0)
                    })
                    setUsers(allUsers)
                    // for verification purposes
                    for (let curr of allUsers) {
                        console.log("HOME matches: ", curr.name, " ", curr.interests.items)
                    }
                    //setUsers(usersData.data.listUsers.items)
                    // console.log(usersData.data.listUsers.items)
            }
            fetchUsers();
        }
     }, [isFocused]);

         return (
            <ScrollView style={styles.container}>
                <Header />
                <Text style={styles.flowerText}>✿</Text>
                <Text style={styles.subtext}>Hello {user}! Let's grow your next friendship. </Text>
                <View style={styles.profileWrapper}>
                    {users.map((user) => {
                        return (
                            <Pressable
                                style={styles.profile}>
                                <Image
                                    style={styles.profileImage}
                                    source={{uri: user.imageUri}}
                                />
                                <Text style={styles.name}>{user.name}</Text>
                                <Text style={styles.status}>{user.status}</Text>
                                <View style={styles.buttons}>
                                    <Pressable mode="contained"
                                    style={styles.accountButton}
                                    onPress={() => navigation.navigate("OtherUserProfile", {user: user})}>
                                        <Text style={styles.buttonText}>View Profile</Text>
                                    </Pressable>
                                    <Pressable mode="contained"
                                    style={styles.accountButton}
                                    onPress={() => onClickHandler(user)}>
                                        <Text style={styles.buttonText}>Start Chatting</Text>
                                    </Pressable>
                                </View>
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
        width: 74,
        height: 74,
        borderRadius: 50,
        margin: 20,
    },
    profile: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 7,
        marginBottom: 7,
        width: 285,
        height: 203,
        backgroundColor: 'rgba(255, 247, 234, 0.3)',
        borderColor: '#FFA34E',
        borderRadius: 24,
        borderWidth: 1.5,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    name: {
        marginLeft: 40,
        marginTop: 30,
        color: 'black',
        fontSize: 20,
        lineHeight: 54,
        lineWidth: 100,
        fontWeight: 'bold',
        borderRadius: 20,
    },
    status: {
        marginHorizontal: 30,
    },
    subtext: {
        alignSelf: 'center',
        fontSize: 15,
        textAlign:"center",
        marginHorizontal: '10%',
    },
    flowerText: {
        alignSelf: 'center',
        fontSize: 30,
        textAlign:"center",
        color: "#FF9472",
    },
    accountButton: {
        width: 95,
        height: 20,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        borderColor: '#FFA34E',
        borderRadius: 24,
        borderWidth: 1.5,
        marginHorizontal: 5,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        fontSize:10,
        color: "#181818",
    },
    buttons: {
        width:'100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default Home;