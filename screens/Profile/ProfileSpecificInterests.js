import * as React from 'react';
import {useState} from 'react'
import { Appbar, Title,Button,TextInput} from 'react-native-paper';
import {View,Text,SafeAreaView,StyleSheet,TouchableHighlight,Picker} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

import {updateUser} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Header from '../Header'

const ProfileSpecificInterests = ({route, navigation}) => {
    const {user, interests} = route.params;

    var [ broadInterests , setBroadInterests ] = React.useState(interests);
    var [ specInterests, setSpecInterests] = React.useState([["osu", "genshin impact"], ["kfc"]])
    var [ isPress, setIsPress ] = React.useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [specific, setSpecific] = useState(null);
    const [items, setItems] = useState([
                        {label: 'gaming', value: 'gaming'},
                        {label: 'food & drink', value: 'food & drink'},
    ]);

   const saveUpdates = async() => {
    navigation.navigate("Account");
    }

    return (
        <View style={styles.container}>

                <Appbar.Header>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Title>
                        Interests
                    </Title>
                </Appbar.Header>

                <Text style={styles.question}> Add your personal flavors! </Text>
                <Text > MY favorite in
                    <DropDownPicker
                        placeholder={"Select an interest"}
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={{height: 10}}
                        style={{backgroundColor: 'white'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: 'white'}}
                        onChangeValue={(value) => console.log(value, " was picked")}
                    />
                    is
                    <TextInput
                        label="write in a favorite"
                        theme={{colors:{primary:"#000000"}}}
                        value={specific}
                        onChangeText={(text)=>setSpecific(text)}
                    />
                </Text>

                <View style={styles.interestsWrapper}>
                    {Object.keys(broadInterests).map((interest) => {
                        return (
                            <View style={{flex:1, marginLeft: 10}}>
                            <Text style={styles.category}>{interest}</Text>
                            <View style={styles.specificWrapper}>

                                {
                                    specInterests.map((specifics)=>{
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
        backgroundColor: '#FFF7EA',
        borderWidth: 3,
        borderColor: '#FFA34E',
    },
    promptWrapper: {
        flexDirection: 'column',
        flexWrap: 'wrap',
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
        marginBottom: '25%',
        backgroundColor: '#FFA34E',
    },
})

export default ProfileSpecificInterests;