import * as React from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


import Account from '../Account'
import ProfileGender from './ProfileGender'
import SignUpFlowProfileBasicSetup from './SignUpFlowProfileBasicSetup'
import SignUpFlowProfileSpecificInterests from './SignUpFlowProfileSpecificInterests'
import ProfileInterests from './ProfileInterests'
import ProfileBasicInfo from './ProfileBasicInfo'
import ProfilePicture from './ProfilePicture'
import ProfileAge from './ProfileAge'
import ProfileBlocklist from './ProfileBlocklist'
import ProfileRegion from './ProfileRegion'
import ProfileSpecificInterests from './ProfileSpecificInterests'
import ChatRequests from '../ChatRequests'
import UserProfile from '../UserProfile'
import OtherUserProfile from '../OtherUserProfile'

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
                <Stack.Screen name="SignUpFlowProfileBasicSetup" component={SignUpFlowProfileBasicSetup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="SignUpFlowProfileSpecificInterests" component={SignUpFlowProfileSpecificInterests}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileAge" component={ProfileAge}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileRegion" component={ProfileRegion}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileInterests" component={ProfileInterests}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileSpecificInterests" component={ProfileSpecificInterests}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileBasicInfo" component={ProfileBasicInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="UserProfile" component={UserProfile}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfilePicture" component={ProfilePicture}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ProfileBlocklist" component={ProfileBlocklist}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="ChatRequests" component={ChatRequests}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="OtherUserProfile" component={OtherUserProfile}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

    );
};

export default ProfileRoot;