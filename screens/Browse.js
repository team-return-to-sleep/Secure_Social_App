import * as React from 'react';
import {useState, useEffect} from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {View,Text,SafeAreaView,Image,Pressable,StyleSheet,ScrollView,Alert,StatusBar,TouchableOpacity} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import {listUsers} from '../src/graphql/queries'
import {API, graphqlOperation} from '@aws-amplify/api'

import DropDownPicker from 'react-native-dropdown-picker';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Header from './Header'


const Browse = ({navigation}) => {
    const [name, setName] = useState('')
    const [hasSearched, setHasSearched] = useState(false)
    const [users, setUsers] = useState([])
    const [searchedUsers, setSearched] = useState([])
    const [currUsers, setCurr] = useState([])
    const [ageFilteredUsers, setAgeFilteredUsers] = useState([])

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
                        {label: '18 to 24', value: 1},
                        {label: '25 to 34', value: 2},
                        {label: '35 to 44', value: 3},
                        {label: '45 to 54', value: 4},
                        {label: '55 to 64', value: 5},
                        {label: '65 or over', value: 6},
    ]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
                        {label: 'West', value: 'West'},
                        {label: 'Southwest', value: 'Southwest'},
                        {label: 'Midwest', value: 'Midwest'},
                        {label: 'Northeast', value: 'Northeast'},
                        {label: 'Southeast', value: 'Southeast'},
    ]);

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = React.useState([]);
    const [interests, setInterests] = useState([
        { label: 'Books & Literature', value: 'Books & Literature' },
        { label: 'Business', value: 'Business' },
        { label: 'Career', value: 'Career' },
        { label: 'Movies & TV', value: 'Movies & TV' },
        { label: 'Education', value: 'Education' },
        { label: 'Health', value: 'Health' },
        { label: 'Home & Garden', value: 'Home & Garden' },
        { label: 'Music & Radio', value: 'Music & Radio' },
        { label: 'Comedy', value: 'Comedy' },
        { label: 'Animals', value: 'Animals' },
        { label: 'Food & Drink', value: 'Food & Drink' },
        { label: 'Gaming', value: 'Gaming' },
        { label: 'Travel', value: 'Travel' },
        { label: 'DIY', value: 'DIY' },
        { label: 'Sports', value: 'Sports' },
        { label: 'Beauty & Style', value: 'Beauty & Style' },
        { label: 'Art', value: 'Art' },
        { label: 'Tech', value: 'Tech' },
        { label: 'Automotive', value: 'Automotive' },
        { label: 'Dance', value: 'Dance' },
    ]);

    const renderDataItem = (item) => {
        return (
            <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            </View>
        );
    };

    useEffect( ()=> {
        const fetchUsers = async() => {
            const usersData = await API.graphql(
                {
                    query: listUsers,
                    authMode: "API_KEY"
                }
            )
            setUsers(usersData.data.listUsers.items)
            setCurr(usersData.data.listUsers.items)
            setAgeFilteredUsers(usersData.data.listUsers.items)
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log("updated currUsers")
    }, [currUsers]);

    const onClickHandler = async () => {
        if (name != '') {
            let results = []
            for (let i=0; i<users.length; i++) {
                if (users[i].name == name || users[i].name.includes(name)) {
                    // TODO: change to add names which are superstrings of search
                    results.push(users[i])
                }
            }
//            setSearched(users)
//            setUsers(results)
//            setHasSearched(true)
            if (results.length < 1) {
                Alert.alert("Sorry, cannot find user " + name)
            } else {
                setCurr(results)
                currUsers = results
                console.log("set?")
            }
            //console.log("results: ", results)
        }
        //setUsers(searchedUsers)
        setCurr(users)
        //setHasSearched(false)
    }

    const filterByAge = async (value) => {
        console.log(value)
        if (value == 1) {
            const ageUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {age: {ge: 18, le: 24}}},
                    authMode: "API_KEY"
                }
            )
            console.log(value)
            console.log(ageUsersData.data.listUsers.items)
        }
        else if (value == 2) {
            const ageUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {age: {ge: 25, le: 34}}},
                    authMode: "API_KEY"
                }
            )
            console.log(ageUsersData.data.listUsers.items)
        }
        else if (value == 3) {
            const ageUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {age: {ge: 35, le: 44}}},
                    authMode: "API_KEY"
                }
            )
            console.log(ageUsersData.data.listUsers.items)
        }
        else if (value == 4) {
            const ageUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {age: {ge: 45, le: 54}}},
                    authMode: "API_KEY"
                }
            )
            console.log(ageUsersData.data.listUsers.items)
        }
        else if (value == 5) {
            const ageUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {age: {ge: 55, le: 64}}},
                    authMode: "API_KEY"
                }
            )
            console.log(ageUsersData.data.listUsers.items)
        }
        else if (value == 6) {
            const ageUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {age: {ge: 65}}},
                    authMode: "API_KEY"
                }
            )
            console.log(ageUsersData.data.listUsers.items)
        }
    }

    const filterByRegion = async (value) => {
            const regionalUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {region: {eq: value}}},
                    authMode: "API_KEY"
                }
            )
            console.log(value)
            console.log(regionalUsersData.data.listUsers.items)
    }

    const filterByInterests = async (items) => {
        let interestsStr = ''
        function appendToStr(item) {
          interestsStr += ('contains: "' + item + '", ');
        }
        items.forEach(appendToStr)
        console.log(interestsStr)

            const interestUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {interests: {interestsStr}}},
                    authMode: "API_KEY"
                }
            )
            console.log(items)
            console.log(interestUsersData.data.listUsers.items)
    }

    return (
        <>
            <View style={{flex:1}}>
                <Header/>

                <Text style={styles.username}>Filter by Age</Text>
                <DropDownPicker
                    placeholder="Age"
                    open={open2}
                    value={value2}
                    items={items2}
                    setOpen={setOpen2}
                    setValue={setValue2}
                    setItems={setItems2}
                    containerStyle={{height: 40}}
                    style={{backgroundColor: '#fafafa'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    onChangeValue={(value) => filterByAge(value)}
                />

                <Text style={styles.username}>Filter by Region</Text>
                <DropDownPicker
                    placeholder="Region"
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
                    onChangeValue={(value) => filterByRegion(value)}
                />

        <View style={styles.container}>
            <Text style={styles.username}>Filter by Interests</Text>
            <MultiSelect
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={interests}
                labelField="label"
                valueField="value"
                placeholder="Select Interests"
                value={selected}
                search
                searchPlaceholder="Search..."
                onChange={item => {
                    setSelected(item);
                    filterByInterests(item);
                }}
//                onToggleList={() => (
//                    setExpanded(!expanded)
//                    if(!expanded) {
//                        console.log(selectedItems)
//                    }
//                )}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color="black"
                        name="Safety"
                        size={20}
                    />
                )}
                renderItem={renderDataItem}
                renderSelectedItem={(item, unSelect) => (
                    <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                        <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color="black" name="delete" size={17} />
                        </View>
                    </TouchableOpacity>
                )}
            />
            <StatusBar />
        </View>

                <TextInput
                    label="search for a username"
                    theme={{colors:{primary:"#000000"}}}
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />

                <Button icon="magnify"
                    mode="contained"
                    style={{margin:20, backgroundColor: '#BBCAEB'}}
                    onPress={() => onClickHandler()
                }>
                    Search for Username
                </Button>

                <ScrollView style={styles.container}>
                    <View style={styles.profileWrapper}>
                        {
                        currUsers.map((user) => {
                            return (
                                <Pressable
                                    style={styles.profile}
                                    onPress={() => navigation.navigate("OtherUserProfile", {user: user})}
                                >
                                    <Image
                                        style={styles.profile}
                                        source={{uri: user.imageUri}}
                                    />
                                </Pressable>
                            );
                        })}
                    </View>
                </ScrollView>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    profile: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 7,
        marginBottom: 7,
        width: 170,
        height: 170,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#AFE1AF',
        borderRadius: 24,
    },
    profileWrapper: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    container: {
        paddingTop: 30,
        flex:1
    },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 14,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectedStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 14,
        backgroundColor: 'white',
        shadowColor: '#000',
        marginTop: 8,
        marginRight: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
    },
    textSelectedStyle: {
        marginRight: 5,
        fontSize: 16,
    },
});

export default Browse;