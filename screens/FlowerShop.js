import * as React from 'react';
import { useState, useCallback, useEffect } from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,ScrollView,Text,SafeAreaView,Alert,Pressable,StyleSheet,Image,AsyncStorage} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from "@react-navigation/native";

import {Auth} from 'aws-amplify'
import {API, graphqlOperation} from '@aws-amplify/api'

import {getUser, getGarden} from '../src/graphql/queries'
import {createGarden, updateGarden} from '../src/graphql/mutations'

import Header from './Header'
import PointScreen from './PointScreen'


const FlowerShop = ({navigation, route}) => {
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
                setPoints(userData.data.getUser.garden.points)
            }
            fetchUser()
        }
    }, [isFocused])

    const garden = {
        flowerSize: userGarden.flowerSize,
        id: userGarden.id,
        points: userGarden.points,
        userID: userGarden.userID,
    }


    const _buyCowboy = async() => {
        garden.points = garden.points - 1
        setUserGarden(garden)
                await API.graphql(
                    {
                        query: updateGarden,
                        variables: {input: garden},
                        authMode: "API_KEY"
                    }
                )
        navigation.navigate('PointScreen', {
                                       paramKey: require('../assets/images/cowboy_flower.png'),
                                     })
    }

    const _buyRibbon = async() => {
        garden.points = garden.points - 1
        setUserGarden(garden)
                    await API.graphql(
                        {
                            query: updateGarden,
                            variables: {input: garden},
                            authMode: "API_KEY"
                        }
                    )
        navigation.navigate('PointScreen', {
                                       paramKey: require('../assets/images/ribbon_flower.png'),
                                     })
    }

    const _buyHeadphone = async() => {
        garden.points = garden.points - 1
        setUserGarden(garden)
                    await API.graphql(
                        {
                            query: updateGarden,
                            variables: {input: garden},
                            authMode: "API_KEY"
                        }
                    )
        navigation.navigate('PointScreen', {
                                       paramKey: require('../assets/images/headphone_flower.png'),
                                     })
    }

    const _reset = async() => {
        navigation.navigate('PointScreen', {
                                       paramKey: require('../assets/images/original_flower.png'),
                                     })
    }




  return (
    <ScrollView>
        <Appbar.BackAction onPress={() => navigation.navigate(PointScreen)} />
        <Pressable
            onPress={_buyCowboy}>
            <Image style={{width:userGarden.flowerSize, height:userGarden.flowerSize}}
                source={require('../assets/images/cowboy_flower.png')}
            />
        </Pressable>

        <Pressable
            onPress={_buyRibbon}>
            <Image style={{width:userGarden.flowerSize, height:userGarden.flowerSize}}
                source={require('../assets/images/ribbon_flower.png')}
            />
        </Pressable>

        <Pressable
            onPress={_buyHeadphone}>
            <Image style={{width:userGarden.flowerSize, height:userGarden.flowerSize}}
                source={require('../assets/images/headphone_flower.png')}
            />
        </Pressable>

        <Pressable
            onPress={_reset}>
            <Image style={{width:userGarden.flowerSize, height:userGarden.flowerSize}}
                source={require('../assets/images/original_flower.png')}
            />
        </Pressable>

    </ScrollView>


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
        backgroundColor:'#FFA34E',
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

export default FlowerShop;