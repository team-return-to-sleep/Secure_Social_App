import * as React from 'react';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight} from 'react-native'

import Header from '../Header'

const ProfileInterests = ({navigation}) => {

    var [ isPress, setIsPress ] = React.useState(false);

    var touchProps = {
        activeOpacity: 1,
        underlayColor: '#ffffff',
        style: isPress ? styles.selected : styles.interests,
        onHideUnderlay: () => setIsPress(true),
        onShowUnderlay: () => setIsPress(false),
        onPress: () => {}
    };

    return (
        <View style={styles.container}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                </Appbar.Header>

                <Text style={styles.question}> What are your interests? </Text>
                <View style={styles.interestsWrapper}>
                    <TouchableHighlight {...touchProps}>
                        <Text>Anime</Text>
                    </TouchableHighlight>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                    <View style={styles.interests}/>
                </View>
                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => navigation.navigate("ProfileFavorites")}>
                    Continue
                </Button>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    interests: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#ffffff',
        borderWidth: 3,
        borderColor: '#DDEDEA',
    },
    selected: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        width: 100,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#DDEDEA',
        borderWidth: 3,
        borderColor: '#DDEDEA',
    },
    interestsWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    question: {
        paddingTop: 20,
        textAlign: 'center',
        fontSize: 18,
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        marginBottom: '50%',
        backgroundColor: '#BBCAEB',
    },
})

export default ProfileInterests;