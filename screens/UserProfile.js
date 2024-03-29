import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './Header'

const UserProfile = ({route, navigation}) => {

    const [info, setInfo] = useState({
        name:"loading",
        interests:"loading",
        age:"loading"
    })

    const {user} = route.params;

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
                </View>
                <View style={{marginBottom:26}}>
                    <Text> {'\n\n'} </Text>
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
        fontFamily: 'ABeeZee-Regular'
    },
    username: {
        margin:15,
        fontSize: 20,
        fontFamily: 'ABeeZee-Regular'
    },
    specifics: {
        marginBottom: 15,
        marginLeft: 5,
        marginRight: 5,
        width: 'auto',
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#FFF7EA',
        borderWidth: 1.5,
        borderColor: '#FFA34E',
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
        justifyContent: 'flex-start',
        margin: 10,
    },
    specificsWrapper: {
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
        fontFamily: 'ABeeZee-Regular',
    },
});

export default UserProfile;