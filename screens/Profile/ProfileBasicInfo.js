import * as React from 'react';
import {useState} from 'react'
import { connect } from 'react-redux';
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight,ScrollView} from 'react-native'

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

                <Text style={styles.username}>Name</Text>
                <TextInput placeholder={user.name}
                     onChangeText={(text) =>
                        setName(text)
                     }
                />

                <Text style={styles.username}>Age</Text>
                <TextInput placeholder={user.age ? (user.age.toString()) : ("Enter your age")}
                     numeric value
                     keyboardType={'numeric'}
                     onChangeText={(text) => {
                         if (!isNaN(+(text)) && +((text) >= 18) && +((text) <= 150)) {
                            setAge(+(text))
                         } else {
                            alert("Invalid age; must be 18 or older")
                         }
                     }}
                />

                <Text style={styles.username}>Region</Text>
                <DropDownPicker
                    placeholder={user.region ? (user.region) : ("Select your region")}
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
                <TextInput placeholder={user.status}
                     onChangeText={(text) =>
                        setStatus(text)
                     }
                />

                <Button icon="content-save"
                mode="contained"
                style={styles.nextButton}
                onPress={() => saveUpdates()}>
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
    username: {
            margin:15,
            fontSize: 20,
            fontWeight: 'bold',
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
        marginTop: 20,
        backgroundColor: '#BBCAEB',
    },
})

export default ProfileBasicInfo;