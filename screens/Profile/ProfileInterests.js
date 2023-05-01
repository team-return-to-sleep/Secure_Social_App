import * as React from 'react';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight} from 'react-native'

import {updateUser, createInterest} from '../../src/graphql/mutations'
import {getInterest} from '../../src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from '../Header'

const ProfileInterests = ({route, navigation}) => {

    const {user} = route.params;
    var interests = user.interests.items;
    console.log("INTERESTS USER: ", user)
    if (!interests) {
        interests = [];
    }
    console.log("INTERESTS: ", interests)
    var [ userInterests , setUserInterests ] = React.useState(
{
        "Books & Literature": interests.some(e => e.categoryName === "Books & Literature"),
        "Business": interests.some(e => e.categoryName === "Business"),
        "Career": interests.some(e => e.categoryName === "Career"),
        "Movies & TV": interests.some(e => e.categoryName === "Movies & TV"),
        "Education": interests.some(e => e.categoryName === "Education"),
        "Health": interests.some(e => e.categoryName === "Health"),
        "Home & Garden": interests.some(e => e.categoryName === "Home & Garden"),
        "Music & Radio": interests.some(e => e.categoryName === "Music & Radio"),
        "Comedy": interests.some(e => e.categoryName === "Comedy"),
        "Animals": interests.some(e => e.categoryName === "Animals"),
        "Food & Drink": interests.some(e => e.categoryName === "Food & Drink"),
        "Gaming": interests.some(e => e.categoryName === "Gaming"),
        "Travel": interests.some(e => e.categoryName === "Travel"),
        "DIY": interests.some(e => e.categoryName === "DIY"),
        "Sports": interests.some(e => e.categoryName === "Sports"),
        "Beauty & Style": interests.some(e => e.categoryName === "Beauty & Style"),
        "Art": interests.some(e => e.categoryName === "Art"),
        "Tech": interests.some(e => e.categoryName === "Tech"),
        "Automotive": interests.some(e => e.categoryName === "Automotive"),
        "Dance": interests.some(e => e.categoryName === "Dance")
    });

    var [ isPress, setIsPress ] = React.useState(false);

    const saveUpdates = async() => {
        var interestNames = Object.keys(userInterests).filter(interest => userInterests[interest] === true)
        // TODO: for every interest create a model, store in interest array to pass to updatedInterests
        var updatedInterests = []
        var oldInterests = user.interests.items
        for (var name of interestNames) {
            const interestData = {
                id: name.concat(user.id),
                userID: user.id,
                categoryName: name,
                specificNames: []
            }
            var fetchInterest;
            if (oldInterests) {
                fetchInterest = oldInterests.find(e => e.categoryName === name)
            }
//            await API.graphql (
//                {
//                    query: getInterest,
//                    variables: {id: interestData.id},
//                    authMode: "API_KEY"
//                }
//            )
            if (!fetchInterest) {
                fetchInterest = await API.graphql (
                    {
                        query: createInterest,
                        variables: {
                            input: interestData
                        },
                        authMode: "API_KEY"
                    }
                )
                console.log("PROFILE INTERESTS: ", fetchInterest)
                updatedInterests.push(fetchInterest)
            } else {
                console.log("PROFILE INTERESTS: ", fetchInterest)
                updatedInterests.push(fetchInterest)
            }

        }
//        await API.graphql (
//        {
//            query: updateUser,
//            variables: {
//                input: {
//                    id: user.id,
//                    interests: updatedInterests
//                }
//            },
//            authMode: "API_KEY"
//        })
        const testUser = await API.graphql (
        {
            query: getUser,
            variables: {
                    id: user.id,
            },
            authMode: "API_KEY"
        })
        console.log("UPDATED USER: ", testUser)
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