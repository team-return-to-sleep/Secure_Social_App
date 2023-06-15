import * as React from 'react';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,ScrollView,SafeAreaView,StyleSheet,TouchableHighlight} from 'react-native'

import {updateUser, createInterest, deleteInterest} from '../../src/graphql/mutations'
import {getUser, getInterest} from '../../src/graphql/queries'
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
        //var updatedInterests = []
        var oldInterests = user.interests.items

        // check if any interests were removed
        if (oldInterests) {
            for (var oldInterest of oldInterests) {
                if (userInterests[oldInterest.categoryName] === false) {
                    const deleted = await API.graphql (
                        {
                            query: deleteInterest,
                            variables: {
                                input: {id: oldInterest.id}
                            },
                            authMode: "API_KEY"
                        }
                    )
                    console.log("DELETED INTEREST: ", deleted)
                }
            }
        }
        // create new interest model for user if it doesn't yet exist
        for (var name of interestNames) {
            const interestData = {
                id: name.concat(user.id),
                userID: user.id,
                categoryName: name,
                specificNames: []
            }

            if (!oldInterests || !oldInterests.some(e => e.categoryName === name)) {
                await API.graphql (
                    {
                        query: createInterest,
                        variables: {
                            input: interestData
                        },
                        authMode: "API_KEY"
                    }
                )
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
        navigation.navigate("ProfileSpecificInterests", {user: testUser.data.getUser});
    }

    return (
        <ScrollView style={styles.container}>

                <Header/>
                <Appbar.BackAction onPress={() => navigation.goBack()} />

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
                              <Text style={styles.interestText}>{interest}</Text>
                            </TouchableHighlight>
                        );
                    })}
                </View>
                <Button mode="contained"
                style={styles.nextButton}
                onPress={() => saveUpdates()}>
                    Next
                </Button>

                <View style={styles.progressBar}>
                    <Text style={styles.flowerCompleted}>✿</Text>
                    <Text style={styles.flowerCompleted}>✿</Text>
                    <Text style={styles.flowerCompleted}>✿</Text>
                    <Text style={styles.flowerNotCompleted}>✿</Text>
                </View>
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    progressBar: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignSelf: 'center',
        fontSize: 100,
        marginBottom: '35%',
        position: 'relative',
    },
    flowerCompleted: {
        fontSize: 30,
        margin: 2,
        color: '#FF9472',
    },
    flowerNotCompleted: {
        fontSize: 30,
        margin: 2,
        color: '#FF9472',
        opacity: 0.3,
    },
    interests: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#ffffff',
        borderWidth: 1.5,
        borderColor: '#FFA34E',
        color: 'black',
    },
    interestText: {
        size: 14,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    selected: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#FFA34E',
        borderWidth: 3,
        borderColor: '#FFA34E',
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
        paddingTop: '1%',
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        color: '#E8683F',
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        marginTop: '5%',
        backgroundColor: '#FFA34E',
        marginBottom: '10%',
    },
})

export default ProfileInterests;