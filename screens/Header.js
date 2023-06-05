import * as React from 'react';
import { Appbar, Title } from 'react-native-paper';
import {Pressable,View,Text,StyleSheet,SafeAreaView,Image} from 'react-native'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {Auth} from 'aws-amplify'
import Icon from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import ChatRequests from './ChatRequests'

const Header = (props) => {
    const navigation = useNavigation();

    return (
        <Appbar.Header style={styles.head}>
            <Image
                style={styles.profileImage}
                source={require('../assets/images/smile_flower.png')}
            />
            <Title style={styles.name}>
                Wallflower
            </Title>
            <View style={styles.actionWrapper}>
                <Appbar.Action style={styles.messageNotifs} icon="message-alert-outline" onPress={() => navigation.navigate("ChatRequests")}/>
                <Appbar.Action style={styles.logout} icon="logout" onPress={() => Auth.signOut()} />
            </View>
        </Appbar.Header>
    );
};

const styles = StyleSheet.create({
    head: {
        flexDirection:"row",
        backgroundColor:'#FFFFFF',
    },
    actionWrapper: {
        display: 'flex',
        flexWrap: 'nowrap',
        marginLeft: 'auto',
        flexDirection: 'row',
    },
    messageNotifs: {

    },
    name: {
        marginLeft: 10,
        color: '#C62F00',
        fontFamily: 'Amaranth-Regular'
    },
    logout: {
    },
    profileImage: {
        width: 30,
        height: 30,
        borderRadius: 30,
    },
});
export default Header;