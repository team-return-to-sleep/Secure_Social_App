import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,ScrollView,Text,SafeAreaView,StyleSheet,Pressable,TouchableHighlight,Picker} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

import {updateUser, updateInterest} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'
import { useIsFocused } from "@react-navigation/native";

import Header from '../Header'

const ProfileSpecificInterests = ({route, navigation}) => {
    const {user} = route.params;
    const isFocused = useIsFocused()

    var [ broadInterests , setBroadInterests ] = React.useState(user.interests.items.map(e => e.categoryName));
    var [ specInterests, setSpecInterests] = React.useState(user.interests.items.map(e => e.specificNames))

    var [ currInterest, setCurrInterest] = useState(null)
    var [ tempSpecific, setTempSpecific] = useState(null)

    var [ isPress, setIsPress ] = React.useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [specific, setSpecific] = useState(null);
    const [items, setItems] = useState(user.interests.items.map(e => ({label: e.categoryName, value: e})));
//    [
//                        {label: 'gaming', value: 'gaming'},
//                        {label: 'food & drink', value: 'food & drink'},
//    ]);

    const saveInterest = async() => {
        if (currInterest && tempSpecific) {
            console.log("SPECIFIC: ", tempSpecific)
            currInterest.specificNames.push(tempSpecific)
            const updatedInterest = await API.graphql (
            {
                query: updateInterest,
                variables: {
                    input: {
                        id: currInterest.id,
                        specificNames: currInterest.specificNames
                    }
                },
                authMode: "API_KEY"
            })
            console.log("UPDATED SPECIFIC: ", updatedInterest.data.updateInterest)
        }
    }

    const saveUpdates = async() => {
        navigation.navigate("Account");
    }

    return (
        <ScrollView style={styles.container}>

                <Header/>
                <Appbar.BackAction onPress={() => navigation.goBack()} />

                <Text style={styles.question}> Add some personal flavor... </Text>
                <View style={styles.promptWrapper}>
                        <Text style={styles.subtext}> My favorite in </Text>
                        <View>
                            <DropDownPicker
                                placeholder={"--"}
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                style={styles.dropdown}
                                dropDownStyle={{backgroundColor: 'white', width: 100}}
                                onChangeValue={(value) => (
                                    setCurrInterest(value)
                                )}
                            />
                        </View>
                        <Text style={styles.subtext}> is </Text>
                        <TextInput
                            placeholder={'Write in a favorite...'}
                            theme={{colors:{primary:"#000000"}}}
                            value={specific}
                            style={styles.inputBox}
                            onChangeText={(text)=>setTempSpecific(text)}
                        />



                </View>
                <Pressable mode="contained"
                        style={styles.addButton}
                        onPress={() => saveInterest()}>
                        <Text style={styles.addButtonText}>Add</Text>
                </Pressable>
                <View style={styles.interestsWrapper}>
                    {user.interests.items.map((interest) => {
                        return (
                            <View style={{flex:1, marginLeft: 10}}>
                            <View style={styles.category}>
                                <Text style={styles.categoryText}>{interest.categoryName}</Text>
                            </View>
                            <View style={styles.specificWrapper}>

                                {
                                    interest.specificNames.map((specifics)=>{
                                        return (
                                        <View>
                                            <TouchableHighlight
                                                activeOpacity = {1}
                                                underlayColor = {'#FFF7EA'}
                                                style = {styles.selected}
                                            >
                                                <Text>{specifics}</Text>
                                            </TouchableHighlight>
                                        </View>
                                        )
                                    })

                                }
                            </View>
                            </View>
                        );
                    })}
                </View>
                <Button
                mode="contained"
                style={styles.nextButton}
                onPress={() => saveUpdates()}>
                    Continue
                </Button>

            <View style={styles.progressBar}>
                <Text style={styles.flowerCompleted}>✿</Text>
                <Text style={styles.flowerCompleted}>✿</Text>
                <Text style={styles.flowerCompleted}>✿</Text>
                <Text style={styles.flowerCompleted}>✿</Text>
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
    dropdown: {
        backgroundColor: 'white',
        flex:1,
        height: 0,
        marginTop: 10,
        width: 85,
        marginBottom: 30,
        borderColor: '#FFA34E',
        borderWidth: 1,
        minHeight: 30,
        paddingHorizontal: 5,
    },
    inputBox: {
        width: 138,
        height: 20,
        marginTop: 30,
        backgroundColor: 'white',
        borderColor: '#FFA34E',
        borderWidth: 1,
        fontSize:   12,
    },
    addButton: {
        width: 73,
        height: 23,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFA34E',
        marginRight: '10%',
        borderRadius: 24,
    },
    addButtonText: {
        fontSize: 12,
        color: "#181818",
        fontStyle: 'italic'
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
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        width: 90,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        backgroundColor: '#FFF7EA',
        borderWidth: 1.5,
        borderColor: '#FFA34E',
    },
    promptWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    interestsWrapper: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 20,
    },
    specificWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
    },
    question: {
        paddingTop: '1%',
        paddingBottom: 10,
        textAlign: 'center',
        fontSize: 20,
        color: '#E8683F',
    },
    prompt: {
        fontSize: 14,
        color: 'black',
    },
    category: {
        paddingTop: 5,
        paddingBottom: 5,
        alignItems: 'flex-start',
    },
    categoryText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#181818'
    },
    subtext: {
        fontSize: 16,
        marginHorizontal: 3,
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        backgroundColor: '#FFA34E',
        marginBottom: '10%',
    },
    label: {
        fontSize: 13,

    },
})

export default ProfileSpecificInterests;