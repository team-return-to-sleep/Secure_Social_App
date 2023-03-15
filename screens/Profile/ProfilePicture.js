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
                <Pressable onPress={() => setImageUri(Pictures.pfps.interest1)}>
                    <Image style={styles.pictures}
                        source={{uri: Pictures.pfps.interest1}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.interest2)}>
                        <Image style={styles.pictures}
                        source={{uri: Pictures.pfps.interest2}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.interest3)}>
                    <Image style={styles.pictures}
                        source={{uri: Pictures.pfps.interest3}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.interest4)}>
                    <Image style={styles.pictures}
                        source={{uri: Pictures.pfps.interest4}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.interest5)}>
                    <Image style={styles.pictures}
                        source={{uri: Pictures.pfps.interest5}}/>
                </Pressable>
                <Pressable onPress={() => setImageUri(Pictures.pfps.interest6)}>
                    <Image style={styles.pictures}
                        source={{uri: Pictures.pfps.interest6}}/>
                </Pressable>
                <View style={styles.pictures}/>
                <View style={styles.pictures}/>
                <View style={styles.pictures}/>
                <View style={styles.pictures}/>
                <View style={styles.pictures}/>
                <View style={styles.pictures}/>
            </View>
            <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => { navigation.navigate("Account");
                    updatePicture();
                    console.log("success")}}>
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
        width: 100,
        height: 100,
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