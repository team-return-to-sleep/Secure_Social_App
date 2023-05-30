import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {View,Text,StyleSheet,SafeAreaView,Image} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Auth} from 'aws-amplify'

const Header = (props) => {
    return (
        <Appbar.Header style={styles.head}>
            <Image
                style={styles.profileImage}
                source={require('../assets/images/smile_flower.png')}
            />
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
        backgroundColor:'#FFFFFF',
    },
    name: {
        marginLeft: 10,
        color: '#C62F00',
        fontFamily: 'Amaranth-Regular'
    },
    logout: {
        marginLeft: 'auto',
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
});
export default Header;