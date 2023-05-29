import * as React from 'react';
import { StyleSheet,StatusBar } from 'react-native';
import { Appbar, FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import PointScreen from './PointScreen'
import FlowerShop from './FlowerShop'

const Stack = createNativeStackNavigator()

const PointScreenRoot = () => {
    return (
        <Stack.Navigator initialRouteName="PointScreen">
            <Stack.Screen name="PointScreen" component={PointScreen} initialParams={{paramKey: null}}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="FlowerShop" component={FlowerShop}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};

export default PointScreenRoot;

