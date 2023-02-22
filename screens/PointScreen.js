import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,Alert,StyleSheet,Image} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from './Header'


const PointScreen = () => {
    const [points, setPoints] = useState(20)
    const [size, setSize] = useState(120)
    const _waterPlant = () => {
        if (points >= 10) {
            setPoints(points-10)
            setSize(size+50)
            {styles.image.width = size}
        } else {
            Alert.alert("You don't have enough points :(\nChat with someone to earn more!")
        }
    }

  return (

    <View style={{flex:1, flexDirection:'column', backgroundColor:'#7CFC00'}}>
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