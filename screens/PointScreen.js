import * as React from 'react';
import { useState, useCallback, useEffect } from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Pressable,Text,SafeAreaView,Alert,StyleSheet,Image,AsyncStorage} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from "@react-navigation/native";

import {Auth} from 'aws-amplify'
import {API, graphqlOperation} from '@aws-amplify/api'

import {getUser, getGarden} from '../src/graphql/queries'
import {createGarden, updateGarden} from '../src/graphql/mutations'

import Header from './Header'
import FlowerShop from './FlowerShop'
import Outfits from '../assets/images/Outfits';

const PointScreen = ({navigation}) => {
    const default_garden = {
        userID: "0",
        id: "0",
        flowerSize: 120,
        points: 10,
        flowerOutfit: "original",
    }
    const isFocused = useIsFocused()
    const [points, setPoints] = useState(0)
    const [outfit, setOutfit] = useState("")
    const [size, setSize] = useState(120)
    const [userGarden, setUserGarden] = useState(default_garden)

    useEffect(() => {
        if (isFocused) {
            const fetchUser = async () => {
                const userInfo = await Auth.currentAuthenticatedUser();

                let userGarden = await API.graphql(
                    {
                        query: getGarden,
                        variables: {id: userInfo.attributes.sub},
                        authMode: "API_KEY",
                    }
                )
                console.log("USER INFO", userGarden)

                if (userGarden) {
                        console.log("here")
                        var garden = {
                            flowerSize: userGarden.data.getGarden.flowerSize,
                            id: userGarden.data.getGarden.id,
                            userID: userGarden.data.getGarden.userID,
                            points: userGarden.data.getGarden.points,
                            flowerOutfit: userGarden.data.getGarden.flowerOutfit,
                        }
                        console.log("garden exists; flower points: ", garden.points)
                        console.log("garden exists; flower outfit: ", garden.flowerOutfit)
                        const dboutfit = garden.flowerOutfit
                        if (dboutfit=="original"){
                            setOutfit(Outfits.fits.original)
                        } else if (dboutfit=="ribbon") {
                            setOutfit(Outfits.fits.ribbon)
                        } else if (dboutfit=="cowboy") {
                            setOutfit(Outfits.fits.cowboy)
                        } else if (dboutfit=="headphone") {
                            setOutfit(Outfits.fits.headphone)
                        }


                } else {
                        garden = {
                            userID: myUserData.id,
                            id: myUserData.id,
                            flowerSize: 120,
                            points: 10,
                            flowerOutfit: "original",
                        }
                        await API.graphql(
                            {
                                query: createGarden,
                                variables: {input: garden},
                                authMode: "API_KEY"
                            }
                        )
                        console.log("created new garden!")
                }
                setUserGarden(garden)
                console.log("POINTSCREEN GARDEN: ", userGarden)
                setPoints(garden.points)
            }
            fetchUser()
        }
    }, [isFocused])

    const _toShop = async() => {
        navigation.navigate("FlowerShop")
    }

    const _checkOutfit = async() => {
        console.log(Number(require('../assets/images/cowboy_flower.png')))
    }

    const _waterPlant = async () => {
        const garden = {
            flowerSize: userGarden.flowerSize,
            id: userGarden.id,
            points: userGarden.points,
            userID: userGarden.userID,
            flowerOutfit: userGarden.flowerOutfit,
        }
        console.log("POINTSCREEN GARDEN: ", garden)
        if (garden.points >= 1) {
            console.log(garden.points)
            console.log(garden.flowerOutfit)
            try {
                garden.points = garden.points - 1
                garden.flowerSize = garden.flowerSize + 40
            } catch (error) {
                console.log("error saving flower data")
            }
            //{styles.image.width = garden.flowerSize}
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

    <View style={{flex:1, flexDirection:'column', backgroundColor:'#83AD85'}}>
        <Header/>
        <Appbar.Header style={styles.head}>
            <Title style={styles.name}>
                    Points: {userGarden.points}
            </Title>
            <View style={styles.actionsBar}>
                <Appbar.Action style={styles.button} icon="watering-can" testID = "waterplant" onPress={_waterPlant} />
                <Appbar.Action style={styles.button} icon="shopping" testID = "toshop" onPress={_toShop} />
            </View>
        </Appbar.Header>
        <View style={styles.imageBox}>
            <Pressable
            onPress={_checkOutfit}>
                    <Image style={{width:userGarden.flowerSize, height:userGarden.flowerSize}}
                        source={outfit}/>

            </Pressable>
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
    name: {
        float: 'right',
        fontFamily: 'ABeeZee-Regular'
    },
    actionsBar: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 7,
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

export default PointScreen;