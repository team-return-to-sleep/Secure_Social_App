import * as React from 'react';
import { useState, useCallback, useEffect } from 'react'
import { Appbar, Title, TextInput, Button } from 'react-native-paper';
import {TouchableHighlight,View,Pressable,Text,SafeAreaView,Alert,StyleSheet,Image,AsyncStorage} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from "@react-navigation/native";
import Tooltip from 'react-native-walkthrough-tooltip';

import {Auth} from 'aws-amplify'
import {API, graphqlOperation} from '@aws-amplify/api'

import {getUser, getGarden} from '../src/graphql/queries'
import {createGarden, updateGarden} from '../src/graphql/mutations'
import Icon from 'react-native-vector-icons/Ionicons';

import Header from './Header'
import FlowerShop from './FlowerShop'
import Outfits from '../assets/images/Outfits';

const PointScreen = ({navigation}) => {
    const default_garden = {
        userID: "0",
        id: "0",
        flowerSize: 120,
        points: 10,
        flowerOutfit: "original",
    }
    const isFocused = useIsFocused()
    const [points, setPoints] = useState(0)
    const [outfit, setOutfit] = useState("")
    const [size, setSize] = useState(120)
    const [userGarden, setUserGarden] = useState(default_garden)
    const [toolTipVisible, setToolTipVisible] = useState(false);

    useEffect(() => {
        if (isFocused) {
            const fetchUser = async () => {
                const userInfo = await Auth.currentAuthenticatedUser();

                let userGarden = await API.graphql(
                    {
                        query: getGarden,
                        variables: {id: userInfo.attributes.sub},
                        authMode: "API_KEY",
                    }
                )
                console.log("USER INFO", userGarden)

                if (userGarden) {
                        console.log("here")
                        var garden = {
                            flowerSize: userGarden.data.getGarden.flowerSize,
                            id: userGarden.data.getGarden.id,
                            userID: userGarden.data.getGarden.userID,
                            points: userGarden.data.getGarden.points,
                            flowerOutfit: userGarden.data.getGarden.flowerOutfit,
                        }
                        console.log("garden exists; flower points: ", garden.points)
                        console.log("garden exists; flower outfit: ", garden.flowerOutfit)
                        const dboutfit = garden.flowerOutfit
                        if (dboutfit=="original"){
                            setOutfit(Outfits.fits.original)
                        } else if (dboutfit=="ribbon") {
                            setOutfit(Outfits.fits.ribbon)
                        } else if (dboutfit=="cowboy") {
                            setOutfit(Outfits.fits.cowboy)
                        } else if (dboutfit=="headphone") {
                            setOutfit(Outfits.fits.headphone)
                        }


                } else {
                        garden = {
                            userID: myUserData.id,
                            id: myUserData.id,
                            flowerSize: 120,
                            points: 10,
                            flowerOutfit: "original",
                        }
                        await API.graphql(
                            {
                                query: createGarden,
                                variables: {input: garden},
                                authMode: "API_KEY"
                            }
                        )
                        console.log("created new garden!")
                }
                setUserGarden(garden)
                console.log("POINTSCREEN GARDEN: ", userGarden)
                setPoints(garden.points)
            }
            fetchUser()
        }
    }, [isFocused])

    const _toShop = async() => {
        navigation.navigate("FlowerShop")
    }

    const _checkOutfit = async() => {
        console.log(Number(require('../assets/images/cowboy_flower.png')))
    }

    const _waterPlant = async () => {
        const garden = {
            flowerSize: userGarden.flowerSize,
            id: userGarden.id,
            points: userGarden.points,
            userID: userGarden.userID,
            flowerOutfit: userGarden.flowerOutfit,
        }
        console.log("POINTSCREEN GARDEN: ", garden)
        if (garden.points >= 100) {
            console.log(garden.points)
            console.log(garden.flowerOutfit)
            try {
                garden.points = garden.points - 100
                garden.flowerSize = garden.flowerSize + 30
            } catch (error) {
                console.log("error saving flower data")
            }
            //{styles.image.width = garden.flowerSize}
            setUserGarden(garden)
            await API.graphql(
                {
                    query: updateGarden,
                    variables: {input: garden},
                    authMode: "API_KEY"
                }
            )

        } else {
            Alert.alert("You don't have enough points :(\nChat with someone to earn more!")
        }
    }
  return (

      <View style={{flex:1, flexDirection:'column', backgroundColor:'#83AD85'}}>
          <Header/>
          <Appbar.Header style={styles.head}>
              <View style={styles.topOfBar}>
                  <Title style={styles.points}>
                          Points: {userGarden.points}
                  </Title>
                  <View style={styles.help}>
                  <Tooltip
                              animated={true}
                              //(Optional) When true, tooltip will animate in/out when showing/hiding
                              arrowSize={{width: 16, height: 8}}
                              //(Optional) Dimensions of arrow bubble pointing to the highlighted element
                              backgroundColor="rgba(0,0,0,0.5)"
                              //(Optional) Color of the fullscreen background beneath the tooltip.
                              isVisible={toolTipVisible}
                              //(Must) When true, tooltip is displayed
                              content={<Text>This is your wallflower. You will receive points when others send you messages. 100 points can be used to grow your flower. You can also spend points to freshen up its look. Your flower is waiting, let's get chatting!</Text>}
                              //(Must) This is the view displayed in the tooltip
                              placement="bottom"
                              //(Must) top, bottom, left, right, auto.
                              onClose={() => setToolTipVisible(false)}
                              //(Optional) Callback fired when the user taps the tooltip
                            >
                              <TouchableHighlight
                                mode='contained'
                                style={styles.helpButtonStyle}
                                onPress={() => setToolTipVisible(true)}>
                                <Icon name="md-help" size={20} color="black" />
                              </TouchableHighlight>
                            </Tooltip>
                  </View>

              </View>
              <View style={styles.actionsBar}>
                  <Appbar.Action style={styles.button} icon="watering-can" testID = "waterplant" onPress={_waterPlant} />
                  <Appbar.Action style={styles.button} icon="shopping" testID = "toshop" onPress={_toShop} />
              </View>
          </Appbar.Header>
          <View style={styles.imageBox}>
              <Pressable
              onPress={_checkOutfit}>
                      <Image style={{width:userGarden.flowerSize, height:userGarden.flowerSize}}
                          source={outfit}/>

              </Pressable>
          </View>
      </View>
   );
  };

  const styles = StyleSheet.create({
      help: {
        position: 'absolute',
        right: 0,
        padding: 10,
      },
      topOfBar: {
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
      },
      head: {
          width: '100%',
          flexDirection:"column",
          backgroundColor:'#ffffff',
          justifyContent: 'flex-end',
          marginTop: '5%',
          marginBottom: '3%',
      },
      points: {
          alignSelf: 'center',
          fontFamily: 'ABeeZee-Regular',
      },
      helpButtonStyle: {
          width: 30,
          height: 30,
          padding: 10,
          backgroundColor: '#FFA34E',
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          padding: -10,
        },
      helpButtonText: {
          fontWeight: 'bold',
          fontSize: 10,
      },
      actionsBar: {
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginBottom: 7,
      },
      button: {
          float: 'right',
          backgroundColor:'#FFA34E',
      },
      imageBox: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
      },
      image: {
          width: 120,
          height: 120,
          resizeMode:"stretch"
          //justifyContent: 'center',
      }
  });

  export default PointScreen;

