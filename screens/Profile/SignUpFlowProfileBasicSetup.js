import * as React from 'react';
import {useState, useEffect} from 'react'
import { connect } from 'react-redux';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight,ScrollView} from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';
import {Auth} from 'aws-amplify'
import {getUser, listUsers} from '../../src/graphql/queries'
import {updateUser, createInterest, updateInterest} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'
import { useIsFocused } from "@react-navigation/native";

import Header from '../Header'

const SignUpFlowProfileBasicSetup = ({route, navigation}) => {
    console.log("HEY WE HAVE INITIATED NEW USER SETUP")

//    const {user} = route.params;

    const [name, setName] = useState("")
    const [age, setAge] = useState(-1)
    const [region, setRegion] = useState("")
    const [status, setStatus] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
                        {label: 'West', value: 'West'},
                        {label: 'Southwest', value: 'Southwest'},
                        {label: 'Midwest', value: 'Midwest'},
                        {label: 'Northeast', value: 'Northeast'},
                        {label: 'Southeast', value: 'Southeast'},
    ]);

    var [ userInterests , setUserInterests ] = React.useState(
{
        "Books & Literature": false,
        "Business": false,
        "Career": false,
        "Movies & TV": false,
        "Education": false,
        "Health": false,
        "Home & Garden": false,
        "Music & Radio": false,
        "Comedy": false,
        "Animals": false,
        "Food & Drink": false,
        "Gaming": false,
        "Travel": false,
        "DIY": false,
        "Sports": false,
        "Beauty & Style": false,
        "Art": false,
        "Tech": false,
        "Automotive": false,
        "Dance": false
    });

    const isFocused = useIsFocused()
    const [user, setUser] = useState()
    const fetchUser = async() => {
        const userInfo = await Auth.currentAuthenticatedUser();
        const userData = await API.graphql (
            {
                query: getUser,
                variables: {id: userInfo.attributes.sub},
                authMode: "API_KEY"
            }
        )
        setUser(userData.data.getUser)
        console.log(user)
    }



   const saveUpdates = async() => {
    fetchUser();
    if(name == "" || age == -1 || region == "") {
        alert("Name, age, and region are required fields")
    }
    else if(Object.keys(userInterests).filter(interest => userInterests[interest] === true) == []) {
        alert("Must choose at least one interest")
    }
    else {
       await API.graphql (
       {
            query: updateUser,
            variables: {
                input: {
                    id: user.id,
                    name: name,
                    age: age,
                    region: region
                }
            },
            authMode: "API_KEY"
       }
       )
       user.name = name
       user.age = age
       user.region = region

        if(status != "") {
           await API.graphql (
           {
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        status: status
                    }
                },
                authMode: "API_KEY"
           }
           )
           user.status = status
        }

        var interestNames = Object.keys(userInterests).filter(interest => userInterests[interest] === true)
        // TODO: for every interest create a model, store in interest array to pass to updatedInterests
        for (var name of interestNames) {
            const interestData = {
                id: name.concat(user.id),
                userID: user.id,
                categoryName: name,
                specificNames: []
            }
            var fetchInterest = await API.graphql (
                {
                    query: createInterest,
                    variables: {
                        input: interestData
                    },
                    authMode: "API_KEY"
                }
            )
            console.log("PROFILE INTERESTS: ", fetchInterest)
        }
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
   }

    return (
        <ScrollView style={styles.container}>

                <Appbar.Header>
                    <Title>
                        Account Setup
                    </Title>
                </Appbar.Header>

                <Text style={styles.username}>Name</Text>
                <TextInput placeholder="Enter your name"
                     onChangeText={(text) =>
                        setName(text)
                     }
                />

                <Text style={styles.username}>Age</Text>
                <TextInput placeholder="Enter your age"
                     numeric value
                     keyboardType={'numeric'}
                     onChangeText={(text) => {
                         if (!isNaN(+(text)) && +((text) > -1)) {
                            setAge(+(text))
                         } else {
                            alert("Age must be a positive integer")
                         }
                     }}
                />

                <Text style={styles.username}>Region</Text>
                <DropDownPicker
                    placeholder="Select your region"
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeValue={(value) => setRegion(value)}
                />

                <Text style={styles.username}>Status</Text>
                <TextInput placeholder="Set your status"
                     onChangeText={(text) =>
                        setStatus(text)
                     }
                />

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

        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
            flex:1,
            backgroundColor:'#FFFFFF',
    },
    profPicText: {
        color: '#89A8D6',
        fontStyle: 'italic',
    },
    username: {
            margin:15,
            fontSize: 20,
            fontWeight: 'bold',
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

export default SignUpFlowProfileBasicSetup;