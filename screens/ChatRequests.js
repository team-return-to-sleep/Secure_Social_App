import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
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
import { Activities } from '../assets/Activities';

import {Auth} from 'aws-amplify'
import {getUser, listUsers, getChatRoomUser, listNotifications} from '../src/graphql/queries'
import {createChatRoom, createChatRoomUser} from '../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import { useIsFocused } from "@react-navigation/native";
import {createNativeStackNavigator } from '@react-navigation/native-stack';
import {ChatScreen} from './Chat/ChatScreen'


const ChatRequests = ({navigation}) => {
    const isFocused = useIsFocused()
    const Stack = createNativeStackNavigator()

    const [myUserData, setMyUserData] = useState()
    const [users, setUsers] = useState([])

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
                // get all requests that have the proper toUserID
                // use filters!!! heheheh
                let requests = await API.graphql(
                    {
                        query: listNotifications,
                        variables: {filter: {toUserID: {eq: userData.data.getUser.id}}},
                        authMode: "API_KEY"
                    }
                )

                let chatRequests = requests.data.listNotifications.items

                const userRequests = []
                if (chatRequests) {
                    for (let i=0; i<chatRequests.length; i++) {
                        userRequests.push(chatRequests[i].fromUser)
                        // update Notif to change isRead to true
                    }
                    setUsers(userRequests)
                }
            }

            fetchUser();
        }
    }, [isFocused]);


    const onBlockClickHandler = async () => {
        let notifs = myUser.sentNotifs
        var index = notifs.indexOf(user.id.toString());
        if (index > -1) {
            notifs.splice(index, 1);
        }

        const updatedUser = {
            id: myUser.id,
            sentNotifs: notifs,
        };

        const updated = await API.graphql (
            {
                query: updateUser,
                variables: {input: updatedUser},
                authMode: "API_KEY"
            }
        )
    }

    return (
        <ScrollView style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Header />
            </Appbar.Header>

            <View>
                {users.length > 0 ? (
                    <View style={styles.headerWrapper}>
                        <Text style={styles.subtext}>Blocked Users</Text>
                    </View>
                ) : (
                    <View style={styles.emptyChatsWrapper}>
                        <Text style={styles.midtext}>You have no bans! </Text>
                    </View>
                )}
            </View>

            <View style={styles.chatWrapper}>
                {users.map((user) => {
                    if(user){
                    return (
                        <View style={styles.chatContainer}>
                            <Pressable
                            style={styles.chat}
                            onPress={() => navigation.navigate("OtherUserProfile", {user: user})}>
                                <View style={styles.imageWrapper}>
                                    <Image
                                        style={styles.profileImage}
                                        source={{uri: user.imageUri}}
                                    />
                                    <View>
                                        <Text style={styles.subtext}> {user.name} </Text>
                                        <Text style={styles.msgtext}> Click to view profile </Text>
                                    </View>
                                </View>
                            </Pressable>
                            <Pressable mode="contained"
                            style={styles.chatButton}
                            onPress={() => onBlockClickHandler()}>
                                <Text style={styles.buttonText}>Ignore</Text>
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
        backgroundColor:'#FFFFFF',
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
    chatButton: {
        margin: 10,
        width: 200,
        height: 40,
        marginTop: '5%',
        backgroundColor: '#FFA34E',
        justifyContent: 'center',
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
        color: 'black',
    },
    midtext: {
        fontSize: 15,
        textAlign:"center",
        marginHorizontal: '10%',
        color: 'black',
        margin: 10,
    },
    msgtext: {
        marginLeft:5,
        color:'#181818',
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
    }
});

export default ChatRequests;
