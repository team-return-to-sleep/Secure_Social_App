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


const FlowerShop = ({navigation}) => {
    const default_garden = {
        userID: "0",
        id: "0",
        flowerSize: 120,
        points: 0,
        flowerOutfit: "require('../assets/images/original_flower.png')",
    }
    const isFocused = useIsFocused()
    const [points, setPoints] = useState(0)
    const [size, setSize] = useState(120)
    const [outfit, setOutfit] = useState("")
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

                    } else {
                            garden = {
                                userID: myUserData.id,
                                id: myUserData.id,
                                flowerSize: 120,
                                points: 10,
                                flowerOutfit: "require('../assets/images/original_flower.png')"
                                //flowerOutfit: require('../assets/images/original_flower.png'),
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

    const garden = {
        flowerSize: userGarden.flowerSize,
        id: userGarden.id,
        points: userGarden.points,
        userID: userGarden.userID,
        flowerOutfit: userGarden.flowerOutfit,
    }

    // NOTE: VERY UNOPTIMAL CODE JUST TO GET THINGS WORKING FIRST
    const _buyCowboy = async() => {
        if (garden.points >= 10) {
                    garden.points = garden.points - 10
                    garden.flowerOutfit = require('../assets/images/cowboy_flower.png')
                    setUserGarden(garden)
                    await API.graphql(
                        {
                            query: updateGarden,
                            variables: {input: garden},
                            authMode: "API_KEY"
                        }
                    )
                    navigation.navigate('PointScreen')
                } else {
                    Alert.alert("You don't have enough points :(")
                }
    }

    const _buyRibbon = async() => {
        if (garden.points >= 10) {
            garden.points = garden.points - 10
            garden.flowerOutfit = require('../assets/images/ribbon_flower.png')
            setUserGarden(garden)
            await API.graphql(
                {
                    query: updateGarden,
                    variables: {input: garden},
                    authMode: "API_KEY"
                }
            )
            navigation.navigate('PointScreen')
        } else {
            Alert.alert("You don't have enough points :(")
        }
    }

    const _buyHeadphone = async() => {
        console.log(garden.points)
        console.log(garden.flowerOutfit)
        if (garden.points >= 10) {
            garden.flowerOutfit = require('../assets/images/headphone_flower.png')
            garden.points = garden.points - 10
            setUserGarden(garden)
            await API.graphql(
                {
                    query: updateGarden,
                    variables: {input: garden},
                    authMode: "API_KEY"
                }
            )
            navigation.navigate('PointScreen')
        } else {
            Alert.alert("You don't have enough points :(")
        }
    }

    const _reset = async() => {
        garden.flowerOutfit = require('../assets/images/original_flower.png')
        setUserGarden(garden)
        await API.graphql(
            {
                query: updateGarden,
                variables: {input: garden},
                authMode: "API_KEY"
            }
        )
        navigation.navigate('PointScreen')
    }


  return (
    <ScrollView testID = "scrollView3">
        <Appbar.BackAction onPress={() => navigation.navigate(PointScreen)} />
        <Text style={styles.mainText}>Style Shop</Text>
        <Text style={styles.subtext}>Bored of your look? Let's change things up with your own personal style!</Text>
        <Title style={styles.points}>
                Points: {userGarden.points}
        </Title>
        <View style={styles.shopLayout}>
            <View style={styles.item}>
                <Image style={styles.outfits}
                    source={require('../assets/images/cowboy_flower.png')}
                />
                <Text styles={styles.priceTag}>Cost: 10 points</Text>
                <Pressable
                testID="buyCowboyButton"
                style={styles.buyButton}
                onPress={_buyCowboy}>
                    <Text style={styles.buyText}>Buy</Text>
                </Pressable>
            </View>

            <View style={styles.item}>
                    <Image style={styles.outfits}
                        source={require('../assets/images/ribbon_flower.png')}
                    />
                <Text styles={styles.priceTag}>Cost: 10 points</Text>
                <Pressable
                testID="buyRibbonButton"
                style={styles.buyButton}
                onPress={_buyRibbon}>
                    <Text style={styles.buyText}>Buy</Text>
                </Pressable>
            </View>

            <View style={styles.item}>
                <Image style={styles.outfits}
                    source={require('../assets/images/headphone_flower.png')}
                />
                <Text styles={styles.priceTag}>Cost: 10 points</Text>
                <Pressable
                testID="buyHeadphoneButton"
                style={styles.buyButton}
                onPress={_buyHeadphone}>
                    <Text style={styles.buyText}>Buy</Text>
                </Pressable>
            </View>

            <View style={styles.item}>
                <Image style={styles.outfits}
                    source={require('../assets/images/original_flower.png')}
                />
                <Text styles={styles.priceTag}>Free</Text>
                <Pressable
                testID="buyOriginalButton"
                style={styles.buyButton}
                onPress={_reset}>
                    <Text style={styles.buyText}>Buy</Text>
                </Pressable>
            </View>
        </View>

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
        alignSelf: 'center',
    },
    outfits: {
        width: 200,
        height: 200,
        margin: -15,
        marginBottom: -50,
    },
    shopLayout: {
        marginTop: '3%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainText: {
        alignSelf: 'center',
        textAlign:"center",
        fontSize: 50,
        color: '#181818',
        fontWeight: 'bold',
    },
    subtext: {
        alignSelf: 'center',
        textAlign:"center",
        fontSize: 16,
        color: '#181818',
        marginHorizontal: '20%',
        marginVertical: '5%',
    },
    priceTag: {
        fontSize: 10,
        color: '#181818',
    },
    item: {
        alignItems: 'center',
        marginBottom: '15%'
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
    buyButton: {
        width: 50,
        height: 20,
        backgroundColor: '#FFA34E',
        justifyContent: 'center',
        borderColor: '#FFA34E',
        borderRadius: 24,
        borderWidth: 1.5,
        marginTop: 10,
        alignItems: 'center',
    },
    buyText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    image: {
        width: 120,
        height: 120,
        resizeMode:"stretch"
    }
});

export default FlowerShop;