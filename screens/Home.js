import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {View,Text,SafeAreaView} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toolbar from './Toolbar'

const Home = () => {
//  const profileName = props.route.params;
//
//  const getName = () => {
//    let profileName;
//    const {name} = props.route.params
//    profileName = name
//    return profileName;
//  }

  return (
    <>
    <Appbar.Header
    theme={{
        colors:{
            primary:"#00aaff"

        }

    }}
    style={{flexDirection:"row", justifyContent:"center", backgroundColor:'#00aaff'}}

    >
        <Title>
            <Text>Hello, user</Text>
        </Title>
    </Appbar.Header>

    </>
  );
};

export default Home;