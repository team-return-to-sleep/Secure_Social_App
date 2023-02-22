import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,StyleSheet,Image,SafeAreaView,TouchableHighlight} from 'react-native'

import Header from '../Header'

const ProfileGender = ({navigation}) => {

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => navigation.goBack()} />
                <Title>
                    Edit Profile
                </Title>
            </Appbar.Header>
            <View style={{flex:1}}>

                <Text style={styles.question}> What is your gender? </Text>
                <View style={styles.gendersWrapper}>

                                <View style={styles.genders}>
                                    <Image
                                        style={styles.genderBubble}
                                        source={require('../../assets/images/profpic.png')}
                                    />
                                    <Text>Male</Text>
                                </View>
                                <View style={styles.genders}>
                                    <Image
                                        style={styles.genderBubble}
                                        source={require('../../assets/images/profpic.png')}
                                    />
                                    <Text>Female</Text>
                                </View>
                                <View style={styles.genders}>
                                     <Image
                                         style={styles.genderBubble}
                                         source={require('../../assets/images/profpic.png')}
                                     />
                                     <Text>Other</Text>
                                </View>
                </View>
                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate("ProfileInterests")}>
                    Continue
                </Button>

            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    genders: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#ffffff',
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#DDEDEA',
        alignItems: 'center',
    },
    selected: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 150,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#DDEDEA',
        borderRadius: 24,
        borderWidth: 3,
        borderColor: '#DDEDEA',
        alignItems: 'center',
    },
    genderBubble: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    gendersWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 20,
    },
    question: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        position: 'relative',
        marginBottom: '35%',
        backgroundColor: '#BBCAEB',
    },
});

export default ProfileGender;