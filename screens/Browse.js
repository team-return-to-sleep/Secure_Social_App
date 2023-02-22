import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,Image,Pressable,StyleSheet,ScrollView,Alert} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import Header from './Header'


const Browse = () => {
    const [name, setName] = useState('')
  return (
    <>
    <View style={{flex:1}}>
        <Header/>
            <TextInput
            label="search for a username"
            theme={{colors:{primary:"#000000"}}}
            value={name}
            onChangeText={(text)=>setName(text)}
        />

        <Button icon="magnify"
        mode="contained"
        style={{margin:20, backgroundColor: '#BBCAEB'}}
        onPress={() => Alert.alert("Sorry, cannot find user " + name)
        }>
            Find User
        </Button>
        <ScrollView style={styles.container}>
            <View style={styles.profileWrapper}>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                    <Image
                      style={styles.profile}
                      source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                      <Image
                         style={styles.profile}
                         source={require('../assets/images/profpic.png')}
                      />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                    <Image
                      style={styles.profile}
                      source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                    <Image
                      style={styles.profile}
                      source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
                    <Pressable
                      style={styles.profile}
                      onPress={() => navigation.navigate("UserProfile")}>
                    <Image
                      style={styles.profile}
                      source={require('../assets/images/profpic.png')}
                    />
                    </Pressable>
            </View>
        </ScrollView>
    </View>


    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    profile: {
            marginLeft: 10,
            marginRight: 10,
            marginTop: 7,
            marginBottom: 7,
            width: 170,
            height: 170,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: '#AFE1AF',
            borderRadius: 24,
    },
    profileWrapper: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 20,
            paddingBottom: 20,
    },
});

export default Browse;