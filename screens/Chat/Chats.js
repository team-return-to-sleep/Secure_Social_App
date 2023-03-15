import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,ScrollView,Image,StyleSheet,Alert,Pressable} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import Header from '../Header'

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

    // fetch my user data
    useEffect( ()=> {
        if(isFocused){
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
           const myFriends = userData.data.getUser.friends
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
                    friendUsers.push(friendData.data.getUser)
                }
                //console.log("friends: ", friendUsers)
                setUsers(friendUsers)
           }
        }
        const fetchUsers = async() => {

                const usersData = await API.graphql(
                    {
                        query: listUsers,
                        authMode: "API_KEY"
                    }
                )
                setUsers(usersData.data.listUsers.items)
        }
        fetchUser();
        //fetchUsers();
        }
     }, [isFocused]);

    const onClickHandler = async (otherUser) => {
        // if you already have a chat room with the other user, no need to create a new one! :)
        // note that for now, we assume only 1:1 messaging
        // this can be modified later
        //console.log(otherUser)
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

        if (myRooms) {
            for (let i=0; i<myRooms.length; i++) {
//                console.log(myRooms[i].chatRoom.chatRoomUsers.items[0].userID)
//                console.log("otheruser id:")
//                console.log(otherUser.id)
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

      return (
          <ScrollView style={styles.container}>
              <Header />

              <SafeAreaView>
                  <View style={styles.headerWrapper}>
                        {users.length > 0 ? (
                            <Text style={styles.subtext}>Messages</Text>
                        ) : (
                            <Text style={styles.midtext}>Start chatting with someone by clicking on their profile!</Text>

                        )}
                  </View>
              </SafeAreaView>

              <View style={styles.chatWrapper}>
                    {users.map((user) => {
                      return (
                        <Pressable
                        style={styles.chat}
                        onPress={() => onClickHandler(user)}>
                            <View style={styles.imageWrapper}>
                            <Image
                                style={styles.profileImage}
                                source={{uri: user.imageUri}}
                            />
                            <View>
                                <Text style={styles.subtext}> {user.name} </Text>
                                <Text style={styles.msgtext}> Latest Message Here </Text>
                            </View>

                            </View>
                        </Pressable>
                        );
                  })}
              </View>
              <View style={{marginBottom:26}}>
                    <Text>  {'\n\n'} </Text>
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
        paddingBottom: 0,
        alignItems: 'center',
    },
    chatWrapper: {
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
        justifyContent: 'flex-start',

    },
    chat: {
        margin: 7,
        width: '90%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#BBCAEB',
        borderRadius: 24,
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
        fontWeight: 'bold',
    },
    midtext: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',

    },
    msgtext: {
        marginLeft:5,
        color:'#FFFFFF',
        fontWeight: 'bold',
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