import * as React from 'react';
import { useState, useCallback, useEffect } from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,Alert,StyleSheet,Image,AsyncStorage} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from "@react-navigation/native";

import Header from './Header'


const PointScreen = () => {
    const isFocused = useIsFocused()
    const [points, setPoints] = useState(0)
    const [size, setSize] = useState(120)

    useEffect(() => {
        if (isFocused) {
        const loadPoints = async () => {
            try {
                const val = await AsyncStorage.getItem('flowerPoints')
                console.log("load points pointScreen: ", val)
                if (val) {
                    setPoints(parseInt(val))
                } else {
                    await AsyncStorage.setItem('flowerPoints', '20')
                    setPoints(20)
                }
            } catch (error) {
                console.log("error retrieving flower data")
            }
        }
        loadPoints()
        }
    }, [isFocused])

    const _waterPlant = async () => {
        if (points >= 10) {
            try {
                await AsyncStorage.setItem('flowerPoints', (points-10).toString())
            } catch (error) {
                console.log("error saving flower data")
            }
            setPoints(points-10)
            setSize(size+25)
            {styles.image.width = size}

        } else {
            Alert.alert("You don't have enough points :(\nChat with someone to earn more!")
        }
    }

    return (
        <View style={{flex:1, flexDirection:'column', backgroundColor:'#AFE1AF'}}>
            <Header/>
            <Appbar.Header style={styles.head}>
                <Title style={styles.name}>
                        Points: {points}
                </Title>
                <Appbar.Action style={styles.button} icon="watering-can" onPress={_waterPlant} />
            </Appbar.Header>
            <View style={styles.imageBox}>
                <Image style={{width:size, height:size}}
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
        backgroundColor:'#BBCAEB',
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