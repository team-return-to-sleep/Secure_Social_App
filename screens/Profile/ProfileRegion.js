import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,ScrollView,Text,StyleSheet,Image,SafeAreaView,TouchableHighlight} from 'react-native'
import {useState, useEffect} from 'react'

import Header from '../Header'

import {updateUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'
import {getUser, listUsers} from '../../src/graphql/queries'

const ProfileRegion = ({route, navigation}) => {
    const {user} = route.params;
    const [region, setRegion] = useState("")

    const saveUpdates = async() => {
        const selfData = await API.graphql (
        {
            query: getUser,
            variables: {id: userInfo.attributes.sub},
            authMode: "API_KEY"
        })

        if(region != "") {
           await API.graphql (
           {
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        region: region
                    }
                },
                authMode: "API_KEY"
           }
           )
           user.region = region
        }

        navigation.navigate("ProfileInterests", {user: selfData.data.getUser});
       }

    return (
        <ScrollView style={styles.container}>
            <Header/>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <View style={{flex:1}}>

                <Text style={styles.question}> What is your geographical region? </Text>
                <View style={styles.regionWrapper}>

                                <TouchableHighlight style={styles.regions}
                                    onPress={(region)=>setRegion("Northeast"), console.log(region)}>
                                    <Text>Northeast</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.regions}
                                    onPress={(region)=>setRegion("Southeast")}>
                                    <Text>Southeast</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.regions}
                                    onPress={(region)=>setRegion("Southwest")}>
                                    <Text>Southwest</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.regions}
                                    onPress={(region)=>setRegion("West")}>
                                    <Text>West</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.regions}
                                    onPress={(region)=>setRegion("Midwest")}>
                                    <Text>Midwest</Text>
                                </TouchableHighlight>
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
    regions: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#DDEDEA',
        alignItems: 'center',
    },
    selected: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#DDEDEA',
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#DDEDEA',
        alignItems: 'center',
    },
    regionWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
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
        marginBottom: '35%',
        backgroundColor: '#BBCAEB',
    },
});

export default ProfileRegion;