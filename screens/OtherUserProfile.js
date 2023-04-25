import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {Auth} from 'aws-amplify'
import {getUser} from '../src/graphql/queries'
import {updateUser} from '../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from './Header'

const OtherUserProfile = ({route, navigation}) => {

    const [info, setInfo] = useState({
        name:"loading",
        interests:"loading",
        age:"loading"
    })

    const {user} = route.params;
    //console.log("user: ", user)

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

    }

    return (
        <ScrollView style={styles.container}>
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
                        <Text style={styles.bio}>{user.status}</Text>
                    </View>


                    <View style={styles.contentWrapper}>
                        <View style={styles.divider}/>
                        <View style={styles.interestsWrapper}>
                            <View style={styles.interests}>
                                <Text style={styles.interestText}>INTEREST1</Text>
                            </View>
                            <View style={styles.interests}>
                                <Text style={styles.interestText}>INTEREST2</Text>
                            </View>
                            <View style={styles.interests}>
                                <Text style={styles.interestText}>INTEREST3</Text>
                            </View>
                            <View style={styles.interests}>
                                <Text style={styles.interestText}>INTEREST4</Text>
                            </View>
                            <View style={styles.interests}>
                                <Text style={styles.interestText}>INTEREST5</Text>
                            </View>
                        </View>


                        <View style={styles.divider}/>
                            <View style={styles.interestsWrapper}>
                                <View style={styles.interests}>
                                    <Text style={styles.interestText}>FAVORITE1</Text>
                                </View>
                                <View style={styles.interests}>
                                    <Text style={styles.interestText}>FAVORITE2</Text>
                                </View>
                                <View style={styles.interests}>
                                    <Text style={styles.interestText}>FAVORITE3</Text>
                                </View>
                                <View style={styles.interests}>
                                    <Text style={styles.interestText}>FAVORITE4</Text>
                                </View>
                                <View style={styles.interests}>
                                    <Text style={styles.interestText}>FAVORITE5</Text>
                                </View>
                            </View>
                    </View>

                <Button icon="chat-plus"
                                mode="contained"
                                style={styles.accountButton}
                                onPress={() => onClickHandler()}>
                                    Start Chatting!
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
    bioContainer: {
        width: '80%',
        height: 125,
        backgroundColor:'#f4f4f4',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    bio: {
        fontSize: 12,
        margin: 15,
    },
    username: {
        margin:15,
        fontSize: 20,
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
    },
    interestText: {
        fontSize: 10,
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: 300,
        margin: 20,
    },
    accountButton: {
        margin: 10,
        width: 200,
        height: 40,
        backgroundColor: '#BBCAEB',
        justifyContent: 'center',
    },
    contentWrapper: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 10,
    },
    interestsWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
    },
});

export default OtherUserProfile;