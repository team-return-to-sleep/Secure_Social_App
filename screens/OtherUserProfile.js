import * as React from 'react';
import {useState, useEffect} from 'react'
import { useIsFocused } from "@react-navigation/native";
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Auth} from 'aws-amplify'
import {getUser} from '../src/graphql/queries'
import {createNotification, updateUser} from '../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from './Header'

const OtherUserProfile = ({route, navigation}) => {
//    const [info, setInfo] = useState({
//        name:"loading",
//        interests:"loading",
//        age:"loading"
//    })

    const {user} = route.params;
    const [isBlocked, setIsBlocked] = useState(false);
    const [isBestBud, setIsBestBud] = useState(false);
    const [myUser, setMyUser] = useState()
    const isFocused = useIsFocused()
    //console.log("OTHER USER: ", user)


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

                let blockList = userData.data.getUser.blockedUsers
                console.log("BLOCKLIST: ", blockList)
                if (blockList && blockList.includes(user.id.toString())) {
                    // already blocked
                    setIsBlocked(true)
                } else {
                    setIsBlocked(false)
                }

                setMyUser(userData.data.getUser)
            }
            fetchUser()
        }
    }, [isFocused])

    const onBlockClickHandler = async () => {
        let blockedIDs = myUser.blockedUsers
        if (isBlocked) {
            // unblock
            if (!blockedIDs) {
                // do nothing
            } else {
                blockedIDs = blockedIDs.filter(e => e !== user.id.toString())
            }

            setIsBlocked(false)
        } else {
            // block
            if (!blockedIDs) {
                blockedIDs = [user.id.toString()]
            } else {
                blockedIDs.push(user.id.toString())
            }
            setIsBlocked(true)
        }

        const updatedUser = {
            id: myUser.id,
            blockedUsers: blockedIDs,
        };

        const updated = await API.graphql (
            {
                query: updateUser,
                variables: {input: updatedUser},
                authMode: "API_KEY"
            }
        )
    }

    const onClickHandler = async () => {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql (
            {
                query: getUser,
                variables: {id: userInfo.attributes.sub},
                authMode: "API_KEY"
            }
        )
        let myFriends = userData.data.getUser.friends
        //console.log(myFriends)
        if (myFriends) {
            for (let i=0; i<myFriends.length; i++) {
                if (myFriends[i] == user.id.toString()) {
                    // already a friend, do nothing!
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

    const onBestBudClickHandler = async () => {
      let bestBudIDs = myUser.bestBuds;
      if (isBestBud) {
        // remove from best buds
        if (!bestBudIDs) {
          // do nothing
        } else {
          bestBudIDs = bestBudIDs.filter(e => e !== user.id.toString());
        }
        setIsBestBud(false);
      } else {
        // add to best buds
        if (!bestBudIDs) {
          bestBudIDs = [user.id.toString()];
        } else {
          bestBudIDs.push(user.id.toString());
        }
        setIsBestBud(true);
      }

      const updatedUser = {
        id: myUser.id,
        bestBuds: bestBudIDs,
      };

      const updated = await API.graphql (
        {
          query: updateUser,
          variables: {input: updatedUser},
          authMode: "API_KEY"
        }
      );
    }


    return (
        <ScrollView testID="scrollView2" style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />

            <Header name="User Profile Info" />
            </Appbar.Header>
                <View style={styles.profileWrapper}>

                    <Text style={styles.username}>{user.name}</Text>
                    <Image
                        style={styles.profilePicture}
                        source={{uri: user.imageUri}}
                    />
                    <View style={styles.bioContainer}>
                        <Text style={styles.bioText}>{user.status}</Text>
                    </View>


                    <View style={styles.contentWrapper}>
                        <View style={styles.divider}/>
                        <View style={styles.interestsWrapper}>
                            {user.interests.items.map((interest) => {
                                return (
                                    <>
                                    <View style={styles.category}>
                                        <Text style={styles.categoryText}>{interest.categoryName}</Text>
                                    </View>
                                    <View style={styles.specificsWrapper}>
                                        {interest.specificNames.map((spec) => {
                                            return (
                                                <View style={styles.specifics}>
                                                    <Text style={styles.interestText}>{spec}</Text>
                                                </View>
                                            )})
                                        }
                                    </View>
                                    </>
                                )
                                })
                            }
                        </View>
                    </View>
                <View>
                    { isBlocked ? (
                        <Text>Unblock to start chatting</Text>
                    ) : (
                        <Button icon="chat-plus"
                                        mode="contained"
                                        style={styles.chatButton}
                                        onPress={() => onClickHandler()}>
                                            <Text style={styles.buttonText}>Start Chatting!</Text>
                        </Button>
                    )}
                </View>
                <Button icon="account-cancel"
                                mode="contained"
                                style={styles.chatButton}
                                onPress={() => onBlockClickHandler()}>
                                    <Text style={styles.buttonText}>{isBlocked ? (<>Unblock</>) : (<>Block</>)}</Text>
                </Button>
                <Button icon="account-heart"
                                        mode="contained"
                                        style={styles.chatButton}
                                        onPress={() => onBestBudClickHandler()}>
                                            <Text style={styles.buttonText}>{isBestBud ? (<>Remove Best Bud</>) : (<>Add as Best Bud</>)}</Text>
                </Button>
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
    category: {
        paddingBottom: 5,
        alignItems: 'flex-start',
    },
    categoryText: {
        fontSize: 20,
        color: '#181818',
        fontFamily: 'ABeeZee-Regular'
    },
    bioContainer: {
        width: '80%',
        height: 125,
        backgroundColor:'#f4f4f4',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    bioText: {
        fontSize: 12,
        margin: 15,
        fontFamily: 'ABeeZee-Regular',
    },
    username: {
        margin:15,
        fontSize: 20,
        fontFamily: 'ABeeZee-Regular',
    },
    specifics: {
        marginBottom: 15,
        marginLeft: 5,
        marginRight: 5,
        width: 90,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#FFF7EA',
        borderWidth: 1.5,
        borderColor: '#FFA34E',
        width: 'auto',
        padding: 5,
    },
    interestText: {
        fontSize: 10,
        fontFamily: 'ABeeZee-Regular',
    },
    interests: {
        width: 80,
        height: 17,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#f4f4f4',
        borderWidth: 2,
        borderColor: '#DDEDEA',
        fontFamily: 'ABeeZee-Regular',
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: 300,
        margin: 20,
    },
    chatButton: {
        margin: 10,
        width: 200,
        height: 40,
        marginTop: '5%',
        backgroundColor: '#FFA34E',
        justifyContent: 'center',
    },
    contentWrapper: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: 10,
    },
    specificsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    profileWrapper: {
        alignItems: 'center',
    },
    profilePicture: {
        width: 170,
        height: 170,
        borderRadius: 170,
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
        fontFamily: 'ABeeZee-Regular',
    },
    buttonText: {
        fontFamily: 'ABeeZee-Regular',
    },
});

export default OtherUserProfile;