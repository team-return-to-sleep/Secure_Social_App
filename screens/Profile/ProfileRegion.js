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
    const [isPress, setIsPress] = useState("");

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

                                <TouchableHighlight style = {isPress=="Northeast" ? styles.selected : styles.regions}
                                    underlayColor = {'#ffffff'}
                                    onPress={(region)=>setRegion("Northeast"), (isPress)=>setIsPress('Northeast')}>
                                    <Text>Northeast</Text>
                                </TouchableHighlight>
                               <TouchableHighlight style = {isPress=="Southeast" ? styles.selected : styles.regions}
                                    underlayColor = {'#ffffff'}
                                    onPress={(region)=>setRegion("Southeast"), (isPress)=>setIsPress('Southeast')}>
                                    <Text>Southeast</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style = {isPress=="Southwest" ? styles.selected : styles.regions}
                                    underlayColor = {'#ffffff'}
                                    onPress={(region)=>setRegion("Southwest"), (isPress)=>setIsPress('Southwest')}>
                                    <Text>Southwest</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style = {isPress=="West" ? styles.selected : styles.regions}
                                    underlayColor = {'#ffffff'}
                                    onPress={(region)=>setRegion("West"), (isPress)=>setIsPress('West')}>
                                    <Text>West</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style = {isPress=="Midwest" ? styles.selected : styles.regions}
                                    underlayColor = {'#ffffff'}
                                    onPress={(region)=>setRegion("Midwest"), (isPress)=>setIsPress('Midwest')}>
                                    <Text>Midwest</Text>
                                </TouchableHighlight>
                </View>
                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => saveUpdates()}>
                    Continue
                </Button>

                <View style={styles.progressBar}>
                    <Text style={styles.flowerCompleted}>✿</Text>
                    <Text style={styles.flowerCompleted}>✿</Text>
                    <Text style={styles.flowerNotCompleted}>✿</Text>
                    <Text style={styles.flowerNotCompleted}>✿</Text>
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
    progressBar: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        fontSize: 100,
        marginBottom: '35%',
        position: 'relative',
    },
    flowerCompleted: {
        fontSize: 30,
        margin: 2,
        color: '#FF9472',

    },
    flowerNotCompleted: {
        fontSize: 30,
        margin: 2,
        color: '#FF9472',
        opacity: 0.3,
    },
    regions: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#FFA34E',
        alignItems: 'center',
    },
    selected: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 10,
        marginRight: 10,
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#FFA34E',
        borderRadius: 24,
        borderWidth: 1.5,
        borderColor: '#FFA34E',
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
        paddingTop: '1%',
        textAlign: 'center',
        fontSize: 20,
        color: '#D73400'
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        position: 'relative',
        marginBottom: '10%',
        backgroundColor: '#FFA34E',

    },
});

export default ProfileRegion;