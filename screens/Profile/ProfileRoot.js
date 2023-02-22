import * as React from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


import Account from '../Account'
import ProfileGender from './ProfileGender'
import ProfileInterests from './ProfileInterests'
import ProfileFavorites from './ProfileFavorites'
import UserProfile from '../UserProfile'

const Stack = createNativeStackNavigator()

const ProfileRoot = () => {

  return (
            <Stack.Navigator initialRouteName="Account">
                <Stack.Screen name="Account" component={Account}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileGender" component={ProfileGender}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileInterests" component={ProfileInterests}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileFavorites" component={ProfileFavorites}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="UserProfile" component={UserProfile}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

    );
};

export default ProfileRoot;