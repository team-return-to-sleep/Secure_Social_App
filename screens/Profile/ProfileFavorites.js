import * as React from 'react';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight} from 'react-native'

import {updateUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from '../Header'

const ProfileFavorites = ({route, navigation}) => {
    const {user} = route.params;
    const interests = user.interests.items
    console.log("PROFILE FAVORITES interests: ", interests)
    var [ userInterests , setUserInterests ] = React.useState(interests);

    var favorites = {}
    // TODO: can instead create a "favorited" tag in the interest model and toggle that
    interests.forEach(interest => {
        if (!user.favoriteInterests.items || !(user.favoriteInterests.items.some(e => e.categoryName === interest.categoryName))) {
            favorites[interest.categoryName] = false;
        }
        else {
            favorites[interest.categoryName] = true;
        }
    });

    var [ favoriteInterests , setFavoriteInterests ] = React.useState(favorites);

    var [ isPress, setIsPress ] = React.useState(false);

   const saveUpdates = async() => {
    //TODO: change to updateInterest and toggle favorited field
//    var updatedFavoriteInterests = Object.keys(favoriteInterests).filter(interest => favoriteInterests[interest] === true)
//    await API.graphql (
//    {
//        query: updateUser,
//        variables: {
//            input: {
//                id: user.id,
//                favoriteInterests: updatedFavoriteInterests
//            }
//        },
//        authMode: "API_KEY"
//    })
    navigation.navigate("ProfileSpecificInterests", {user: user});
    //navigation.navigate("Account");
    }

    return (
        <View style={styles.container}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Title>
                        Interests
                    </Title>
                </Appbar.Header>

                <Text style={styles.question}> What are your favorite interests? </Text>
                <View style={styles.interestsWrapper}>
                    {Object.keys(favoriteInterests).map((interest) => {
                        return (
                            <TouchableHighlight
                              activeOpacity = {1}
                              underlayColor = {'#ffffff'}
                              style = {favoriteInterests[interest] ? styles.selected : styles.interests}
                              onPress={() => {
                              console.log("INNER LOOP: ", interest)
                                var temp = {...favoriteInterests}
                                if(favoriteInterests[interest]) {
                                    temp[interest] = false;
                                } else {
                                    temp[interest] = true;
                                }
                                setFavoriteInterests(temp)
                              }}
                              >
                              <Text>{interest}</Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => saveUpdates()}>
                    Save
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
        color: 'black',
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
        marginBottom: '25%',
        backgroundColor: '#BBCAEB',
    },
})

export default ProfileFavorites;