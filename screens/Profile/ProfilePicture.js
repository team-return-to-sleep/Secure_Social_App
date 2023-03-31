import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView,ScrollView,Pressable,TouchableOpacity,TouchableHighlight} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {updateUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from '../Header'
import Pictures from '../../assets/images/Pictures';


const ProfilePicture = ({route, navigation}) => {
    const {user} = route.params;
    /*const [users, setUsers] = useState([])*/
    /*let imageUri = useRef<String>("");*/
    const [imageUri, setImageUri] = useState("")

    const [info, setInfo] = useState({
        name:"loading",
        interests:"loading",
        age:"loading"
    })

  /*useEffect(()=>{
  		setImageUri("pfp1.png");
  	}, []) */

    /*useEffect( ()=> {
        const fetchUser = async() => {
          const userInfo = await Auth.currentAuthenticatedUser();
          const userData = await API.graphql (
            {
              query: getUser,
              variables: {id: userInfo.attributes.sub},
              authMode: "API_KEY"
             }
           )
           setUsers(Array(1).fill(userData.data.getUser))
        }
        fetchUser();
     }, []);*/

  useEffect(()=>{
    setImageUri(user.imageUri)
  }, [])

  const updatePicture = async () => {
    await API.graphql (
       {
            query: updateUser,
            variables: {
                input: {
                    id: user.id,
                    imageUri: imageUri
                }
            },
            authMode: "API_KEY"
       }
       )
       user.imageUri = imageUri
}

  return (
    <ScrollView style={styles.container}>
            <Header name="Change Profile Picture" />
            <View style={styles.accountWrapper}>
                <Image
                    style={styles.accountPicture}
                    source={{uri: imageUri}}
                />
            </View>

            <View style={styles.picturesWrapper}>
                <Pressable onPress={() => setImageUri(Pictures.pfps.music)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.music}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.art)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.art}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.games)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.games}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.animals)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.animals}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.sports)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.sports}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.reading)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.reading}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.business)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.business}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.career)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.career}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.movies)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.movies}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.education)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.education}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.health)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.health}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.home)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.home}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.comedy)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.comedy}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.food)}>
                    <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.food}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.travel)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.travel}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.DIY)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.DIY}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.beauty)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.beauty}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.tech)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.tech}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.auto)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.auto}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.dance)}>
                <Image style={styles.pictures}
                    source={{uri: Pictures.pfps.dance}}/>
                </Pressable>


            </View>
            <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => { navigation.navigate("Account");
                    updatePicture();
                    console.log("successfully changed profile picture")}}>
                    Save
            </Button>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
            flex:1,
            backgroundColor:'#FFFFFF',
    },
    accountButton: {
        margin:10,
        width: 200,
        height: 40,
        backgroundColor: '#BBCAEB',
        justifyContent: 'center',
    },
    accountWrapper: {
        alignItems: 'center',
        marginTop: '0%',
    },
    accountPicture: {
        width: 220,
        height: 220,
        borderRadius: 220,
        borderWidth: 3,
        borderColor: '#DDEDEA'
    },
    username: {
        margin:15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    pictures: {
        margin: 7,
        width: 80,
        height: 80,
        borderRadius: 80,
        borderWidth: 3,
        borderColor: '#DDEDEA',
    },
    picturesWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        position: 'relative',
        marginBottom: '35%',
        backgroundColor: '#BBCAEB',
    },
});

export default ProfilePicture;