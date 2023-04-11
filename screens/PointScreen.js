import * as React from 'react';
import { useState, useCallback, useEffect } from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,Alert,StyleSheet,Image,AsyncStorage} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from "@react-navigation/native";

import {Auth} from 'aws-amplify'
import {API, graphqlOperation} from '@aws-amplify/api'

import {getUser, getGarden} from '../src/graphql/queries'
import {createGarden, updateGarden} from '../src/graphql/mutations'

import Header from './Header'


const PointScreen = () => {
    const default_garden = {
        userID: "0",
        id: "0",
        flowerSize: 120,
        points: 10
    }
    const isFocused = useIsFocused()
    const [points, setPoints] = useState(0)
    const [size, setSize] = useState(120)
    const [userGarden, setUserGarden] = useState(default_garden)

    useEffect(() => {
        if (isFocused) {
            const fetchUser = async () => {
                const userInfo = await Auth.currentAuthenticatedUser();
                const userData = await API.graphql (
                    {
                        query: getUser,
                        variables: {id: userInfo.attributes.sub},
                        authMode: "API_KEY"
                    }
                )
                setUserGarden(userData.data.getUser.garden)
                //console.log("POINTSCREEN GARDEN: ", userData.data.getUser.garden)
                setPoints(userData.data.getUser.garden.points)
            }
            fetchUser()
        }
    }, [isFocused])

    const _waterPlant = async () => {
        const garden = {
            flowerSize: userGarden.flowerSize,
            id: userGarden.id,
            points: userGarden.points,
            userID: userGarden.userID,
        }
        if (garden.points >= 10) {
            try {
                //await AsyncStorage.setItem('flowerPoints', (points-10).toString())
                garden.points = garden.points - 10
                garden.flowerSize = garden.flowerSize + 40
            } catch (error) {
                console.log("error saving flower data")
            }
            //{styles.image.width = garden.flowerSize}
            console.log("POINTSCREEN GARDEN: ", garden)
            setUserGarden(garden)
            await API.graphql(
                {
                    query: updateGarden,
                    variables: {input: garden},
                    authMode: "API_KEY"
                }
            )

        } else {
            Alert.alert("You don't have enough points :(\nChat with someone to earn more!")
        }
    }

  return (

    <View style={{flex:1, flexDirection:'column', backgroundColor:'#AFE1AF'}}>
        <Header/>
        <Appbar.Header style={styles.head}>
            <Title style={styles.name}>
                    Points: {userGarden.points}
            </Title>
            <Appbar.Action style={styles.button} icon="watering-can" onPress={_waterPlant} />
        </Appbar.Header>
        <View style={styles.imageBox}>
            <Image style={{width:userGarden.flowerSize, height:userGarden.flowerSize}}
                source={require('../assets/images/smile_flower.png')}
            />
        </View>
    </View>



  );
};

const styles = StyleSheet.create({
    head: {
        width: '100%',
        flexDirection:"column",
        backgroundColor:'#ffffff',
        //alignItems: 'end',
        justifyContent: 'flex-end',
    },
    points: {
        float: 'right',
    },
    button: {
        float: 'right',
        backgroundColor:'#D9D9D9',
    },
    imageBox: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 120,
        resizeMode:"stretch"
        //justifyContent: 'center',
    }
});

export default PointScreen;