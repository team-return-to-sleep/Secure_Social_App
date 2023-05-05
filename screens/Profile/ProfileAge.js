import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,ScrollView,Text,StyleSheet,Image,SafeAreaView,TouchableHighlight} from 'react-native'
import {useState, useEffect} from 'react'

import Header from '../Header'

import {updateUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'
import {getUser, listUsers} from '../../src/graphql/queries'

const ProfileAge = ({route, navigation}) => {
    const {user} = route.params;
    const [age, setAge] = useState(-1)


    const saveUpdates = async() => {
        const selfData = await API.graphql (
            {
                query: getUser,
                variables: {id: userInfo.attributes.sub},
                authMode: "API_KEY"
            })

        if(age != -1) {
           await API.graphql (
           {
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        age: age
                    }
                },
                authMode: "API_KEY"
           }
           )
           user.age = age
        }
        navigation.navigate("ProfileRegion", {user: selfData.data.getUser});
        console.log("done")
       }

    return (
        <ScrollView style={styles.container}>
            <Header/>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <View style={{flex:1}}>

                <Text style={styles.question}> What is your age? </Text>
                <View style={styles.ageWrapper}>
                    <TextInput placeholder={user.age ? (user.age.toString()) : ("Enter your age")}
                         numeric value
                         keyboardType={'numeric'}
                         style={styles.ageInput}
                         onChangeText={(text) => {
                             if (!isNaN(+(text)) && +((text) > -1)) {
                                setAge(+(text))
                             } else {
                                alert("Age must be a positive integer")
                             }
                         }}
                    />

                    <Text style={{fontSize:9, margin: 15}}>
                        This information is not public but will be used to help you find better matches
                    </Text>

                </View>

                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => saveUpdates()}>
                    Continue
                </Button>

            </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    ageInput: {
        marginTop: '20%',
        width: 150,
        backgroundColor: '#FFF7EA',
    },
    ageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 20,
    },
    question: {
        paddingTop: '3%',
        textAlign: 'center',
        fontSize: 18,
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        position: 'relative',
        marginTop: '15%',
        marginBottom: '35%',
        backgroundColor: '#FFA34E',
    },
});

export default ProfileAge;