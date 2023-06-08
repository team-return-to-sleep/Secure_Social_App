import * as React from 'react';
import {useState} from 'react'
import { connect } from 'react-redux';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight,ScrollView,Alert} from 'react-native'

import DropDownPicker from 'react-native-dropdown-picker';

import {updateUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from '../Header'

const ProfileBasicInfo = ({route, navigation}) => {

    const {user} = route.params;

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

   const saveUpdates = async() => {
    if(name != "") {
       if(name.length > 10) {
            Alert.alert("Name too long!")
       } else {
           await API.graphql (
           {
                query: updateUser,
                variables: {
                    input: {
                        id: user.id,
                        name: name
                    }
                },
                authMode: "API_KEY"
           }
           )
           user.name = name
       }
    }

    if(age != -1) {
       await API.graphql (
       {
            query: updateUser,
            variables: {
                input: {
                    id: user.id,
                    age: age
                }
            },
            authMode: "API_KEY"
       }
       )
       user.age = age
    }

    if(region != "") {
       await API.graphql (
       {
            query: updateUser,
            variables: {
                input: {
                    id: user.id,
                    region: region
                }
            },
            authMode: "API_KEY"
       }
       )
       user.region = region
    }

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
    navigation.navigate("Account");
   }

    return (
        <ScrollView style={styles.container}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Title>
                        Account
                    </Title>
                </Appbar.Header>

                <Text style={styles.label}>Name</Text>
                <TextInput placeholder={user.name}
                    style={styles.inputBox}
                    testID="NameInput"
                     onChangeText={(text) =>
                        setName(text)
                     }
                />

                <Text style={styles.label}>Age</Text>
                <TextInput placeholder={user.age ? (user.age.toString()) : ("Enter your age")}
                     numeric value
                     keyboardType={'numeric'}
                     testID="AgeInput"
                     style={styles.inputBox}
                     onChangeText={(text) => {
                     /*
                         if (!isNaN(+(text)) && +((text) >= 18) && +((text) <= 150)) {
                            setAge(+(text))
                         } else {
                            alert("Invalid age; must be 18 or older")
                         }
                        */
                        if (!isNaN(+(text))) {
                              setAge(+(text));
                            }
                     }}
                />

                <Text style={styles.label}>Region</Text>
                <DropDownPicker
                    placeholder={user.region ? (user.region) : ("Select your region")}
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    containerStyle={{height: 40}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    style={styles.dropdown}
                    onChangeValue={(value) => setRegion(value)}
                />

                <Text style={styles.label}>Status</Text>
                <TextInput placeholder={user.status}
                    style={styles.inputBox}
                    testID="StatusInput"
                     onChangeText={(text) =>
                        setStatus(text)
                     }
                />

                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => {
                 if (age >= 18 && age <= 150) {
                      saveUpdates();
                    } else {
                      alert("Invalid age; must be 18 or older");
                    }
                  }}
                 >
                    Save
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
    inputBox: {
        backgroundColor: '#FFF7EA',
        borderColor: '#FFA34E',
        borderWidth: 1.5,
        fontSize:   15,
        borderRadius: 5,
        width: '90%',
        alignSelf: 'center',
    },
    dropdown: {
        backgroundColor: '#FFF7EA',
        flex:1,
        alignSelf: 'center',
        height: 60,
        width: '90%',
        borderColor: '#FFA34E',
        borderWidth: 1.5,
        paddingHorizontal: 5,
    },
    label: {
        marginTop:25,
        marginBottom: 10,
        marginLeft: 30,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#E8683F'
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
        marginTop: 50,
        backgroundColor: '#FFA34E',
    },
})

export default ProfileBasicInfo;