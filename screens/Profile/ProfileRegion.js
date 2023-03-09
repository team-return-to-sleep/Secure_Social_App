import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,ScrollView,Text,StyleSheet,Image,SafeAreaView,TouchableHighlight} from 'react-native'

import Header from '../Header'

const ProfileGender = ({navigation}) => {
    const [region, setRegion] = React.useState('')

    return (
        <ScrollView style={styles.container}>
            <Header/>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <View style={{flex:1}}>

                <Text style={styles.question}> What is your geographical region? </Text>
                <View style={styles.regionWrapper}>

                                <TouchableHighlight style={styles.genders}
                                    onPress={(genders)=>setRegion("Northeast"), console.log(gender)}>
                                    <Text>Northeast</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.genders}
                                    onPress={(genders)=>setRegion("Southeast")}>
                                    <Text>Southeast</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.genders}
                                    onPress={(genders)=>setRegion("Southwest")}>
                                    <Text>Southwest</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.genders}
                                    onPress={(genders)=>setRegion("West")}>
                                    <Text>West</Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={styles.genders}
                                    onPress={(genders)=>setRegion("Midwest")}>
                                    <Text>Midwest</Text>
                                </TouchableHighlight>
                </View>
                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate("ProfileInterests")}>
                    Continue
                </Button>

            </View>
        </ScrollView>
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
    regionWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        marginBottom: 20,
    },
    question: {
        paddingTop: '3%',
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