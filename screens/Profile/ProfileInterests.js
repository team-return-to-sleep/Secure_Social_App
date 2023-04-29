import * as React from 'react';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight} from 'react-native'

import {updateUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from '../Header'

const ProfileInterests = ({route, navigation}) => {

    const {user} = route.params;
    var interests = user.interests;
    if (!interests) {
        interests = [];
    }

    var [ userInterests , setUserInterests ] = React.useState(
{
        "Books & Literature": interests.includes("Books & Literature"),
        "Business": interests.includes("Business"),
        "Career": interests.includes("Career"),
        "Movies & TV": interests.includes("Movies & TV"),
        "Education": interests.includes("Education"),
        "Health": interests.includes("Health"),
        "Home & Garden": interests.includes("Home & Garden"),
        "Music & Radio": interests.includes("Music & Radio"),
        "Comedy": interests.includes("Comedy"),
        "Animals": interests.includes("Animals"),
        "Food & Drink": interests.includes("Food & Drink"),
        "Gaming": interests.includes("Gaming"),
        "Travel": interests.includes("Travel"),
        "DIY": interests.includes("DIY"),
        "Sports": interests.includes("Sports"),
        "Beauty & Style": interests.includes("Beauty & Style"),
        "Art": interests.includes("Art"),
        "Tech": interests.includes("Tech"),
        "Automotive": interests.includes("Automotive"),
        "Dance": interests.includes("Dance")
    });

    var [ isPress, setIsPress ] = React.useState(false);

    const saveUpdates = async() => {
        var updatedInterests = Object.keys(userInterests).filter(interest => userInterests[interest] === true)
        // TODO: for every interest create a model, store in interest array to pass to updatedInterests
        await API.graphql (
        {
            query: updateUser,
            variables: {
                input: {
                    id: user.id,
                    interests: updatedInterests
                }
            },
            authMode: "API_KEY"
        })
        navigation.navigate("ProfileFavorites", {user: user, interests: updatedInterests});
    }

    return (
        <View style={styles.container}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Title>
                        Account
                    </Title>
                </Appbar.Header>

                <Text style={styles.question}> What are your interests? </Text>
                <View style={styles.interestsWrapper}>
                    {Object.keys(userInterests).map((interest) => {
                        return (
                            <TouchableHighlight
                              activeOpacity = {1}
                              underlayColor = {'#ffffff'}
                              style = {userInterests[interest] ? styles.selected : styles.interests}
                              onPress={() => {
                                var temp = {...userInterests}
                                if(userInterests[interest]) {
                                    temp[interest] = false;
                                } else {
                                    temp[interest] = true;
                                }
                                setUserInterests(temp)
                              }}
                              >
                              <Text>{interest}</Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
                <Button mode="contained"
                style={styles.nextButton}
                onPress={() => saveUpdates()}>
                    Next: Choose Favorite Interests
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
        width: 280,
        alignSelf: 'center',
        marginBottom: '25%',
        backgroundColor: '#BBCAEB',
    },
})

export default ProfileInterests;