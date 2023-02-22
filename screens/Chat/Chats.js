import * as React from 'react';
import { Appbar, Title, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,ScrollView,Image,StyleSheet, Pressable} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Feather from 'react-native-vector-icons/Feather'
import Header from '../Header'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {ChatScreen} from './ChatScreen'

const Chats = ({navigation}) => {

      const Stack = createNativeStackNavigator()

      return (
          <ScrollView style={styles.container}>
              <Header />
              <SafeAreaView>
                  <View style={styles.headerWrapper}>
                      <Image
                          style={styles.profileImage}
                          source={require('../../assets/images/profpic.png')}
                      />
                      <Image
                          style={styles.profileImage}
                          source={require('../../assets/images/profpic.png')}
                      />
                      <Image
                          style={styles.profileImage}
                          source={require('../../assets/images/profpic.png')}
                      />
                      <Image
                          style={styles.profileImage}
                          source={require('../../assets/images/profpic.png')}
                      />
                      <Image
                          style={styles.profileImage}
                          source={require('../../assets/images/profpic.png')}
                      />
                  </View>
              </SafeAreaView>

              <View style={styles.chatWrapper}>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
                  <Pressable
                  style={styles.chat}
                  onPress={() => navigation.navigate("ChatScreen")}/>
              </View>
          </ScrollView>
        );

};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 15,
        paddingBottom: 15,
        alignItems: 'center',
    },
    chatWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    chat: {
        margin: 7,
        width: '90%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#D9D9D9',
        borderRadius: 24,
    },
    chooseButton: {
        borderRadius: 50,
        width: 20,
    },
});

export default Chats;