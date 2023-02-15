import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import Browse from './Browse'
import Home from './Home'
import {ChatScreen} from './Chat/ChatScreen'

const BOTTOM_APPBAR_HEIGHT = 80;
const MEDIUM_FAB_HEIGHT = 56;

const Tab = createBottomTabNavigator()

const Toolbar = () => {
  let iconName = '';

  return (
  <Tab.Navigator
              screenOptions={({route})=>({
                  tabBarIcon:({color})=>{
                      if(route.name === "home") {
                          iconName = 'home-account'
                     } else if (route.name === "browse") {
                          iconName = "compass"
                      } else if (route.name === "chat") {
                          iconName = "chat"
                      }
                      return <MaterialCommunityIcons name={iconName} size={25} color={color} />
                  },

                  })
              }

              activeColor="#f0edf6"
              inactiveColor="#3e2465"
              barStyle={{ backgroundColor: '#694fad' }}
              tabBarColor="#00aaff"
              >
                  <Tab.Screen name="home" component={Home}

                  />
                  <Tab.Screen name="browse" component={Browse} />
                  <Tab.Screen name="chat" component={ChatScreen} />
              </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: 'aquamarine',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 16,
  },
});

export default Toolbar;