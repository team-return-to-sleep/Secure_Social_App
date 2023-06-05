import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, Button, Badge } from 'react-native-paper';
import {View,Text,SafeAreaView,ScrollView,Image,StyleSheet,Pressable,ImageBackground} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import Header from './Header'

import {Auth} from 'aws-amplify'
import {updateUser, createNotification } from '../src/graphql/mutations'

import {getUser, listUsers} from '../src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'
import { useIsFocused } from "@react-navigation/native";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toolbar from './Toolbar'
import UserProfile from './UserProfile'
import ChatRequests from './ChatRequests'
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
            const newNotif = {
                toUserID: user.id,
                fromUserID: userData.data.getUser.id,
                hasRead: false,
                content: "chat request",
            }
            console.log(newNotif)
            const notification = await API.graphql(
                {
                    query: createNotification,
                    variables: {input: newNotif},
                    authMode: "API_KEY"
                }
            )
            console.log(notification)
            // TODO: what do we do if that other person already wants to chat?
            // cuz if that's the case, then a chatroom will be automatically created
            // maybe we can take them to that chatroom?
        } else {
            myFriends = [user.id.toString()]
            const newNotif = {
                toUserID: user.id,
                fromUserID: userData.data.getUser.id,
                hasRead: false,
                content: "chat request",
            }
            console.log(newNotif)
            const notification = await API.graphql(
                {
                    query: createNotification,
                    variables: {input: newNotif},
                    authMode: "API_KEY"
                }
            )
            console.log(notification)
            // TODO: what do we do if that other person already wants to chat?
            // cuz if that's the case, then a chatroom will be automatically created
            // maybe we can take them to that chatroom?
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

                    const selfID = selfData.data.getUser.id
                    const selfName = selfData.data.getUser.name
                    const selfAge = selfData.data.getUser.age
                    const selfRegion = selfData.data.getUser.region
                    const selfInterests = selfData.data.getUser.interests.items
                    console.log(selfName)
                    console.log(selfAge)
                    console.log(selfRegion)
                    console.log(selfInterests)
                    if(!selfName || !selfAge || !selfRegion || !selfInterests) {
                        navigation.navigate("ProfileAge", {user: selfData.data.getUser})
                    }

                    const usersData = await API.graphql(
                        {
                            query: listUsers,
                            authMode: "API_KEY"
                        }
                    )

                    var allUsers = usersData.data.listUsers.items;
                    var blockedIDs = selfData.data.getUser.blockedUsers
                    if (blockedIDs) {
                        allUsers = allUsers.filter(e => blockedIDs.includes(e.id) === false)
                    }
                    allUsers = allUsers.filter(e => !e.blockedUsers ||
                        e.blockedUsers && (e.blockedUsers.includes(selfID.toString()) === false))
                    console.log("HOME BLOCKED USERS: ", blockedIDs)
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

                        let bBonus =  (b.region && selfRegion && b.region === selfRegion)?1:0
                        let aBonus = (a.region && selfRegion && a.region === selfRegion)?1:0
                        return ((compareInterests(b.interests.items, selfInterests) + bBonus) -
                               (compareInterests(a.interests.items, selfInterests) + aBonus))

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
                <Pressable mode="contained"
                    onPress={() => navigation.navigate("ChatRequests")}
                    style={styles.profile}>
                    <Text style={styles.name}>Click here to see who wants to chat with you!</Text>
                </Pressable>
                </View>

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
        borderRadius: 20,
        fontFamily: 'ABeeZee-Regular'
    },
    status: {
        marginHorizontal: 30,
        fontFamily: 'ABeeZee-Regular'
    },
    subtext: {
        alignSelf: 'center',
        fontSize: 16,
        textAlign:"center",
        marginHorizontal: '10%',
        fontFamily: 'ABeeZee-Regular'
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
        fontFamily: 'ABeeZee-Italic'
    },
    buttons: {
        width:'100%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        fontFamily: 'ABeeZee-Regular'
    },
});

export default Home;