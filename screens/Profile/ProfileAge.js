import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,ScrollView,Text,StyleSheet,Image,SafeAreaView,TouchableHighlight} from 'react-native'

import Header from '../Header'

const ProfileGender = ({navigation}) => {
    const [age, setAge] = React.useState('')

    return (
        <ScrollView style={styles.container}>
            <Header/>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <View style={{flex:1}}>

                <Text style={styles.question}> What is your age? </Text>
                <View style={styles.ageWrapper}>
                    <TextInput style={styles.ageInput}
                        label="Enter your age"
                        value={age}
                        onChangeText={(text)=>setAge(text)}/>

                    <Text style={{fontSize:9, margin: 15}}>
                        This information is not public but will be used to help you find better matches
                    </Text>

                </View>
                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate("ProfileRegion")}>
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
    ageInput: {
        marginTop: '20%',
        width: 150,
        backgroundColor: '#DDEDEA',
    },
    ageWrapper: {
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
        marginTop: '15%',
        marginBottom: '35%',
        backgroundColor: '#BBCAEB',
    },
});

export default ProfileGender;