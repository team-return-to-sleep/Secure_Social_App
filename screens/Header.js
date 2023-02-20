import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {View,Text,StyleSheet,SafeAreaView} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'

const Header = (props) => {

  return (

    <Appbar.Header style={styles.head}>
        <Title style={styles.name}>
            Wallflower
        </Title>
    </Appbar.Header>

  );
};

const styles = StyleSheet.create({
    head: {
        flexDirection:"row",
        backgroundColor:'#ffffff',
    },
    name: {
        marginLeft: 10,
    },
});
export default Header;