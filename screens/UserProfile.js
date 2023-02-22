import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView, ScrollView} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Header from './Header'

const UserProfile = ({navigation}) => {

    const [info, setInfo] = useState({
        name:"loading",
        interests:"loading",
        age:"loading"
    })

  return (
    <ScrollView style={styles.container}>

        <Header name="User Profile Info" />
            <View style={styles.profileWrapper}>

                <Text style={styles.username}>USERNAME</Text>
                <Image
                    style={styles.profilePicture}
                    source={require('../assets/images/profpic.png')}
                />
                <View style={styles.bioContainer}>
                    <Text style={styles.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
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

export default UserProfile;