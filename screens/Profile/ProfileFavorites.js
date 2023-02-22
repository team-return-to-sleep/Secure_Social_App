import * as React from 'react';
import { Appbar,Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,ScrollView} from 'react-native'

import Header from '../Header'

const ProfileFavorites = ({navigation}) => {
    return (

        <ScrollView style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Title>
                    Edit Profile
                </Title>
            </Appbar.Header>

            <Text style={styles.question}> What are your favorites? </Text>
            <View style={styles.interestsWrapper}>
                <View style={styles.interests}/>
                <View style={styles.interests}/>
                <View style={styles.interests}/>
                <View style={styles.interests}/>
                <View style={styles.interests}/>
            </View>
            <Button icon="content-save"
            mode="contained"
            style={styles.nextButton}
            onPress={() => navigation.navigate("Account")}>
                Continue
            </Button>
            <View style={{marginBottom:26}}>
               <Text>  {'\n\n'} </Text>
            </View>
        </ScrollView>

      );
};

const styles = StyleSheet.create({
    container: {
            flex:1,
            backgroundColor:'#FFFFFF',
    },
    interests: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#DDEDEA',
        alignItems: 'center',
    },
    interestsWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
    },
    question: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        marginBottom: '15%',
        backgroundColor: '#BBCAEB',
    },
})

export default ProfileFavorites;