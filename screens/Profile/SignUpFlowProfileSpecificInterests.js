import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,ScrollView,Text,SafeAreaView,StyleSheet,TouchableHighlight,Picker} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

import {updateUser, updateInterest} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from '../Header'

const SignUpFlowProfileSpecificInterests = ({route, navigation}) => {
    const {user} = route.params;

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

                <Appbar.Header>
                    <Title>
                        Choose Specific Interests
                    </Title>
                </Appbar.Header>

                <Text style={styles.question}> Add your personal flavors! </Text>
                <View style={styles.promptWrapper}>
                        <Text style={{flex:1, marginLeft: 10}}> MY favorite in </Text>
                        <DropDownPicker
                            placeholder={"Select interest"}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            containerStyle={{height: 10}}
                            style={{
                                    backgroundColor: 'white',
                                    marginLeft: 10,
                                    flex:1,
                                    height: 30,
                                    width: 100,
                                    minHeight: 30,
                                    paddingHorizontal: 5,
                                   }}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: 'white', width: 100}}
                            onChangeValue={(value) => (
                                setCurrInterest(value)
                            )}
                        />
                        <Text > is {'\n'}</Text>
                        <TextInput
                            label="write in a favorite"
                            theme={{colors:{primary:"#000000"}}}
                            value={specific}
                            style={{
                                    width: 30,
                                    height: 20,
                                    flex:1,
                                    marginTop: 30
                            }}
                            onChangeText={(text)=>setTempSpecific(text)}
                        />

                </View>
                <Button
                        mode="contained"
                        style={styles.nextButton}
                        onPress={() => saveInterest()}>
                        Add
                </Button>
                <View style={styles.interestsWrapper}>
                    {user.interests.items.map((interest) => {
                        return (
                            <View style={{flex:1, marginLeft: 10}}>
                            <Text style={styles.category}>{interest.categoryName}</Text>
                            <View style={styles.specificWrapper}>

                                {
                                    interest.specificNames.map((specifics)=>{
                                        return (
                                        <TouchableHighlight
                                            activeOpacity = {1}
                                            underlayColor = {'#FFF7EA'}
                                            style = {styles.selected}

                                        >
                                            <Text>{specifics}</Text>
                                        </TouchableHighlight>
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
            <View style={{marginBottom:26}}>
                <Text> {'\n\n'} </Text>
            </View>
        </ScrollView>
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
        backgroundColor: '#FFF7EA',
        borderWidth: 3,
        borderColor: '#FFA34E',
    },
    promptWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 20,
    },
    interestsWrapper: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 20,
    },
    specificWrapper: {
        width: '90%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    question: {
        paddingTop: 20,
        paddingBottom: 20,
        textAlign: 'center',
        fontSize: 18,
        color: '#FFA34E',
    },
    prompt: {
        fontSize: 14,
        color: 'black',
    },
    category: {
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'left',
        fontSize: 18,
        color: 'black',
    },
    nextButton: {
        width: 150,
        alignSelf: 'center',
        backgroundColor: '#FFA34E',
    },
})

export default SignUpFlowProfileSpecificInterests;