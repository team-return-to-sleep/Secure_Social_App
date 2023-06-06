import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, TextInput, Button, Badge } from 'react-native-paper';
import {View,Text,SafeAreaView,ScrollView, FlatList,Linking,TouchableOpacity,Image,StyleSheet,Alert,Pressable} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import Header from '../Header'
import {
 Menu,
 MenuProvider,
 MenuOptions,
 MenuOption,
 MenuTrigger,
 renderers
} from 'react-native-popup-menu';
import { Activities } from '../../assets/Activities';

import {Auth} from 'aws-amplify'
import {getUser, listUsers, getChatRoomUser} from '../../src/graphql/queries'
import {createChatRoom, createChatRoomUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import { useIsFocused } from "@react-navigation/native";
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import {ChatScreen} from './ChatScreen'

const Chats = ({navigation}) => {
    const isFocused = useIsFocused()
    const Stack = createNativeStackNavigator()

    const [myUserData, setMyUserData] = useState()
    const [users, setUsers] = useState([])
    const [chatRooms, setChatRooms] = useState({})

    const { ContextMenu } = renderers;

    // fetch user data
    useEffect(() => {
        if(isFocused){
            // fetch my user data
            const fetchUser = async() => {
                const userInfo = await Auth.currentAuthenticatedUser();
                const userData = await API.graphql (
                    {
                        query: getUser,
                        variables: {id: userInfo.attributes.sub},
                        authMode: "API_KEY"
                    }
                )
                setMyUserData(userData.data.getUser)
                let myFriends = userData.data.getUser.friends
                let myRooms = userData.data.getUser.chatRoomUser.items
                const myID = userData.data.getUser.id

                var blockedIDs = userData.data.getUser.blockedUsers
                if (myFriends && blockedIDs) {
                    myFriends = myFriends.filter(e => blockedIDs.includes(e) === false)
                }

                const friendUsers = []
                if (myFriends) {
                    for (let i=0; i<myFriends.length; i++) {
                        const friendData = await API.graphql (
                            {
                                query: getUser,
                                variables: {id: myFriends[i]},
                                authMode: "API_KEY"
                            }
                        )

                        if (friendData) {
                            const friendUser = friendData.data.getUser
                            if (friendUser && (!friendUser.blockedUsers ||
                                friendUser.blockedUsers.includes(userData.data.getUser.id) === false)) {
                                friendUsers.push(friendData.data.getUser)
                            }
                        }
                    }
                    //console.log("friends: ", friendUsers)
                    setUsers(friendUsers)
                }

                // set UserToLastMessage map
                if (myRooms) {
                    for (let i=0; i<myRooms.length; i++) {
                        if (myRooms[i].chatRoom.chatRoomUsers.items.length < 2) {
                            console.log("not a valid chatroom: ", myRooms[i].chatRoom.chatRoomUsers.items)
                            continue;
                        }

                        if (myRooms[i].chatRoom.chatRoomUsers.items[0].userID != myID) {
                            // room with this person already exists!
                            setChatRooms(chatRooms => ({
                                ...chatRooms,
                                [myRooms[i].chatRoom.chatRoomUsers.items[0].userID] : myRooms[i].chatRoom.lastMessage
                            }))
                        } else if (myRooms[i].chatRoom.chatRoomUsers.items[1].userID != myID) {
                            setChatRooms(chatRooms => ({
                                ...chatRooms,
                                [myRooms[i].chatRoom.chatRoomUsers.items[1].userID] : myRooms[i].chatRoom.lastMessage
                            }))
                        }
                    }
                }
            }

            fetchUser();
        }
    }, [isFocused]);

    const onClickHandler = async (otherUser) => {
        // if you already have a chat room with the other user, no need to create a new one! :)
        // note that for now, we assume only 1:1 messaging
        // this can be modified later
        // console.log(otherUser)
        // TODO: I think this was here to get most updated user? see if necessary
        const userInfo = await Auth.currentAuthenticatedUser();
            const userData = await API.graphql (
                {
                    query: getUser,
                    variables: {id: userInfo.attributes.sub},
                    authMode: "API_KEY"
                }
            )
        const myData = userData.data.getUser
        setMyUserData(myData)
        let myRooms = myData.chatRoomUser.items
        let exists = false

        // console.log(myRooms)
        // console.log(myUserData.chatRoomUser.items)
        //myRooms.map(e => console.log("DEBUG: ", e.chatRoom.chatRoomUsers.items))
        if (myRooms) {
            for (let i=0; i<myRooms.length; i++) {
                // TODO: room with yourself; do we still want this since you can't create a room
                // TODO: with yourself with the current UI

                if (myRooms[i].chatRoom.chatRoomUsers.items.length < 2) {
                    console.log("not a valid chatroom: ", myRooms[i].chatRoom.chatRoomUsers.items)
                    continue;
                }

                if (myUserData.id == otherUser.id) {
                    if (myRooms[i].chatRoom.chatRoomUsers.items[0].userID == otherUser.id &&
                        myRooms[i].chatRoom.chatRoomUsers.items[1].userID == otherUser.id) {
                        // room with this person already exists!

                        console.log("room exists!")
                        navigation.navigate("ChatScreen", {
                            chatRoomID: myRooms[i].chatRoomID,
                            user: myData,
                            otherUser: otherUser,
                        })
                        exists = true
                    }
                } else {
                    if (myRooms[i].chatRoom.chatRoomUsers.items[0].userID == otherUser.id ||
                        myRooms[i].chatRoom.chatRoomUsers.items[1].userID == otherUser.id) {
                        // room with this person already exists!
                        console.log("room exists!")
                        navigation.navigate("ChatScreen", {
                            chatRoomID: myRooms[i].chatRoomID,
                            user: myData,
                            otherUser: otherUser,
                        })
                        exists = true
                    }
                }
            }
        }

        if (!exists) {
            console.log("created new :/")
            // create new chat room
            const newChatRoomData = await API.graphql(
                {
                    query: createChatRoom,
                    variables: {input: {}},
                    authMode: "API_KEY"
                }
            )

            if (!newChatRoomData.data) {
                console.log("Failed to create a chat room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            // add self (authenticated user) to the chat room
            const userInfo = await Auth.currentAuthenticatedUser();
            const userData = await API.graphql(
                {
                    query: createChatRoomUser,
                    variables: {
                        input: {
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id,
                        }
                    },
                    authMode: "API_KEY"
                }
            )
            // setMyUserData(userData)

            // add other user to chat room
            await API.graphql(
                {
                    query: createChatRoomUser,
                    variables: {
                        input: {
                            userID: otherUser.id,
                            chatRoomID: newChatRoom.id,
                        }
                    },
                    authMode: "API_KEY"
                }
            )

            navigation.navigate("ChatScreen", {
                chatRoomID: newChatRoom.id,
                user: myUserData,
                otherUser: otherUser,
            })
        }
    }

    /* UNUSED UI FOR ONLINE STATUS
    <SafeAreaView>
       <ScrollView
           contentContainerStyle={styles.headerWrapper}
           horizontal={true}
           showsHorizontalScrollIndicator={false}
       >
           {users.map((user) => {
               if (user){
               return (
                   <Image
                       style={styles.profileImage}
                       source={{uri: user.imageUri}}
                   />
               );}
           })}
       </ScrollView>
   </SafeAreaView> */

    return (
        <ScrollView style={styles.container}>
            <Header />

            <View>
                {users.length > 0 ? (
                    <View style={styles.headerWrapper}>
                        <Text style={styles.subtext}>Messages</Text>
                    </View>
                ) : (
                    <View style={styles.emptyChatsWrapper}>
                        <Text style={styles.midtext}>You have no chats! Start chatting. </Text>
                        <Button mode="contained"
                        style={styles.goButton}
                        onPress={() => navigation.navigate("Home")}>
                            <Text style={styles.goText}>Go to Home</Text>
                        </Button>
                        <Button mode="contained"
                        style={styles.goButton}
                        onPress={() => navigation.navigate("Browse")}>
                            <Text style={styles.goText}>Go to Browse</Text>
                        </Button>
                    </View>
                )}
            </View>

            <View style={styles.chatWrapper}>
                {users.map((user) => {
                    if(user){
                        //console.log("CHATROOMS: ", chatRooms)
                        let latestMessage = null
                        if (chatRooms.hasOwnProperty(user.id)) {
                            latestMessage = chatRooms[user.id]
                            //console.log("CHATS LATESTMESSAGE: ", latestMessage)
                        }
                        let isNew = (latestMessage &&
                                     latestMessage.userID == user.id &&
                                     !latestMessage.hasRead) ? true : false
                    return (
                        <View style={styles.chatContainer}>
                            <Pressable
                            style={styles.chat}
                            onPress={() => onClickHandler(user)}>
                                <View style={styles.imageWrapper}>
                                    <View>
                                        { isNew ? (
                                            <View>
                                                <Image
                                                    style={styles.profileImage}
                                                    source={{uri: user.imageUri}}
                                                />
                                                <Badge style={styles.badge}>
                                                    1
                                                </Badge>
                                            </View>
                                        ) : (
                                            <Image
                                                style={styles.profileImage}
                                                source={{uri: user.imageUri}}
                                            />
                                        )}

                                    </View>
                                    <View>
                                        <Text style={styles.subtext}> {user.name} </Text>

                                        {isNew ? (
                                            <Text style={styles.msgtext}> New Message! </Text>
                                        ) : (
                                            <Text style={styles.msgtext}> No New Messages </Text>
                                        )}

                                    </View>

                                </View>
                            </Pressable>
                        </View>
                    );
                    }
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
        flexWrap: 'nowrap',
        backgroundColor:'#FFFFFF',
        marginBottom: '10%',
        maxWidth: '100%',
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 0,
        alignItems: 'center',
    },
    chatWrapper: {
        flex: 1,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        marginHorizontal: '3%',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent: 'flex-start',
        marginHorizontal: 5,
    },
    chat: {
        margin: '1%',
        width: '95%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFF7EA',
        borderRadius: 24,
        borderColor: '#FFA34E',
        borderWidth: 1.5,
    },
    chatContainer: {
        margin: 7,
        alignItems: 'center',
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    imageWrapper: {
        marginRight: 'auto',
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    chooseButton: {
        borderRadius: 50,
        width: 20,
    },
    subtext: {
        marginLeft:5,
        fontSize: 20,
        color: 'black',
        fontFamily: 'ABeeZee-Regular'
    },
    midtext: {
        fontSize: 15,
        textAlign:"center",
        marginHorizontal: '10%',
        color: 'black',
        margin: 10,
        fontFamily: 'ABeeZee-Regular'
    },
    msgtext: {
        marginLeft:5,
        color:'#181818',
        fontSize: 12,
        fontFamily: 'ABeeZee-Regular'
    },
    gameButton: {
        width: 30,
        height: 30,
        borderRadius: 30,
        marginLeft: 10,
    },
    emptyChatsWrapper: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    goButton: {
        margin:3,
        width: 150,
        height: 35,
        backgroundColor: '#FFA34E',
        justifyContent: 'center',
    },
    goText: {
        fontSize: 13,
        color: "#181818",
        alignSelf: 'center',
    },
    badge: {
        position: 'absolute',
        top: 30,
        right: 0,
    },
});

export default Chats;

/* Top horizontal bar of profiles
    <SafeAreaView>
     <View style={styles.headerWrapper}>
           {users.map((user) => {
               return (
                   <Image
                     style={styles.profileImage}
                     source={{uri: user.imageUri}}
                   />
               );
           })}
     </View>
    </SafeAreaView> */