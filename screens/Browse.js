import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
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

//    const [usernameFilteredUsers, setUsernameFilteredUsers] = useState([])
//    const [ageFilteredUsers, setAgeFilteredUsers] = useState([])
//    const [regionFilteredUsers, setRegionFilteredUsers] = useState([])

    const usernameFilteredUsers = useRef([])
    const ageFilteredUsers = useRef([])
    const regionFilteredUsers = useRef([])
    const interestsFilteredUsers = useRef([])

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
                        {label: 'Any Age', value: [0,150]},
                        {label: '18 to 24', value: [18,24]},
                        {label: '25 to 34', value: [25,34]},
                        {label: '35 to 44', value: [35,44]},
                        {label: '45 to 54', value: [45,54]},
                        {label: '55 to 64', value: [55,64]},
                        {label: '65 or over', value: [65.150]},
    ]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
                        {label: 'Any Region', value: 'Any Region'},
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
            setUsers(usersData)
            setCurr(usersData.data.listUsers.items)
            usernameFilteredUsers.current = usersData.data.listUsers.items
            ageFilteredUsers.current = usersData.data.listUsers.items
            regionFilteredUsers.current = usersData.data.listUsers.items
            interestsFilteredUsers.current = usersData.data.listUsers.items
        }
        fetchUsers();
    }, []);

    useEffect(() => {
        console.log("updated currUsers")
    }, [currUsers]);

    const onClickHandler = async () => {
        //let results = users;
        var usernameFilteredUsersData = await API.graphql(
            {
                query: listUsers,
                variables: {filter: {name: {beginsWith: name}}},
                authMode: "API_KEY"
            }
        )
        usernameFilteredUsers.current = usernameFilteredUsersData.data.listUsers.items
//        console.log("USERNAME")
//        console.log(usernameFilteredUsers.current)
//        console.log("AGE")
//        console.log(ageFilteredUsers.current)
//        console.log("REGION")
//        console.log(regionFilteredUsers.current)

//        var matches = []
//        usernameFilteredUsers.forEach(u1 => {
//            ageFilteredUsers.forEach(u2 => {
//                if (u1.id == u2.id) {
//                    matches.push(u1)
////                    regionFilteredUsers.forEach(u3 => {
////                        if (u2.id == u3.id) {
////                            console.log("HEY2")
////                            matches.push(u1)
////                        }
////                    })
//                }
//            })
//        });
        var matches = usernameFilteredUsers.current.filter(
            value => ageFilteredUsers.current.some(e => e.id === value.id))
        //console.log("NAME + AGE MATCHES: ", matches)
        matches = matches.filter(value => regionFilteredUsers.current.some(e => e.id === value.id))
        //console.log("NAME + AGE + REGION MATCHES: ", matches)
        matches = matches.filter(
            value => interestsFilteredUsers.current.some(e => e.id === value.id))
        //console.log("NAME + AGE + REGION + INTERESTS MATCHES: ", matches)
        setCurr(matches)

//        console.log("HEY1!")
        matches.map(person => console.log("MATCH: ", person.name, " AGE: ", person.age,
            " REGION: ", person.region, " INTERESTS: ", person.interests.items))
    }

    const filterByAge = async (value) => {
        const ageUsersData = await API.graphql(
        {
            query: listUsers,
            variables: {filter: {age: {ge: value[0], le: value[1]}}},
            authMode: "API_KEY"
        }
        )
        ageFilteredUsers.current = ageUsersData.data.listUsers.items
    }

    const filterByRegion = async (value) => {
        var regionalUsersData;
        if (value == "Any Region") {
            console.log(users)
            regionalUsersData = users;
        }
        else {
            regionalUsersData = await API.graphql(
                {
                    query: listUsers,
                    variables: {filter: {region: {eq: value}}},
                    authMode: "API_KEY"
                }
            )
        }
        regionFilteredUsers.current = regionalUsersData.data.listUsers.items
    }

    const filterByInterests = async (items) => {
//        let interestsStr = ''
//        function appendToStr(item) {
//          interestsStr += ('contains: "' + item + '", ');
//        }
//        items.forEach(appendToStr)
//        console.log(interestsStr)
            console.log("SELECTED ITEMS: ", items)

          // sadly appsync doesn't allow filtering on not top level types
          // meaning can't filter users by Interest :(
          const interestUsersData = await API.graphql(
              {
                    query: listUsers,
                    authMode: "API_KEY"
              }
          )
          var usersByInterest = interestUsersData.data.listUsers.items

          function filterBy(item) {
                usersByInterest = usersByInterest.filter(
                    tempUser => tempUser.interests.items.some(e => e.categoryName === item)
                )
          }
          items.forEach(filterBy)
          console.log("BY INTEREST: ", usersByInterest)

          interestsFilteredUsers.current = usersByInterest
    }

    return (
        <ScrollView style={styles.container}>
            <Header />
            <Text style={styles.subtext}>Find new buds in your area.</Text>
            <View style={styles.filtersContainer}>
                <View>
                    <DropDownPicker
                        placeholder="Age"
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems2}
                        containerStyle={{height: 40}}
                        style={styles.dropdown1}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeValue={(value) => filterByAge(value)}
                    />
                </View>

                <View>
                    <DropDownPicker
                        placeholder="Region"
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        containerStyle={{height: 40}}
                        style={styles.dropdown1}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeValue={(value) => filterByRegion(value)}
                    />
                </View>

                <View>
                    <MultiSelect
                        style={styles.dropdown2}
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
</View>
                <TextInput
                    style={styles.inputBox}
                    label="Enter a username"
                    theme={{colors:{primary:"#000000"}}}
                    value={name}
                    onChangeText={(text)=>setName(text)}
                />

                <Button icon="magnify"
                    mode="contained"
                    style={styles.searchButton}
                    onPress={() => onClickHandler()
                }>
                    Search Users
                </Button>


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
    searchButton: {
        alignSelf: 'center',
        margin:20,
        width:'40%',
        backgroundColor: '#FFA34E'
    },
    filtersContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom:50,
        marginHorizontal: 50,
        marginTop: 30,
    },
    dropdown1: {
        backgroundColor: 'white',
        flex:1,
        height: 0,
        width: 125,
        borderColor: '#FFA34E',
        borderWidth: 1,
        minHeight: 40,
        paddingHorizontal: 5,
        marginHorizontal: 10,
    },
    dropdown2: {
        marginTop: 20,
        backgroundColor: 'white',
        flex:1,
        height: 0,
        width: 300,
        borderColor: '#FFA34E',
        borderWidth: 1,
        minHeight: 30,
        alignSelf: 'center',
        paddingHorizontal: 5,
        borderRadius: 7,
    },
    inputBox: {
        alignSelf: 'center',
        width: 300,
        height: 50,
        backgroundColor: 'white',
        borderColor: '#FFA34E',
        borderWidth: 1,
        fontSize: 15,
        borderRadius: 5,
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
    subtext: {
        alignSelf: 'center',
        fontSize: 16,
        textAlign:"center",
        marginHorizontal: '10%',
        fontColor: '#181818',
        marginTop: 20,
        fontWeight: 'bold',
    },
});

export default Browse;