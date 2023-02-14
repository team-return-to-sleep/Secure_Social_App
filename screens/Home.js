import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {View,Text,SafeAreaView} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const Home = () => {

  return (

    <Appbar.Header
    theme={{
        colors:{
            primary:"#00aaff"

        }

    }}
    style={{flexDirection:"row", justifyContent:"center", backgroundColor:'#00aaff'}}

    >
        <Title>
            <Text>Secure Messaging App</Text>
        </Title>
    </Appbar.Header>

  );
};

export default Home;