import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {View,Text,StyleSheet,SafeAreaView} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Auth} from 'aws-amplify'

const Header = (props) => {

  return (

    <Appbar.Header style={styles.head}>
        <Title style={styles.name}>
            Wallflower
        </Title>
        <Appbar.Action style={styles.logout} icon="logout" onPress={() => Auth.signOut()} />
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
    logout: {
        marginLeft: 'auto',
    },
});
export default Header;