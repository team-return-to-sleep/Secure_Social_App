import React, { useState, useCallback, useEffect, useContext } from 'react'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import {View,Text,StyleSheet,AsyncStorage} from 'react-native'
import { ActivityIndicator,Appbar,Title,Button,TextInput,IconButton } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

import {Auth} from 'aws-amplify'
import {getUser, listUsers, messagesByChatRoom} from '../../src/graphql/queries'
import {createMessage} from '../../src/graphql/mutations'
import {onCreateMessage} from '../../src/graphql/subscriptions'
import {API, graphqlOperation} from '@aws-amplify/api'

import Toolbar from '../Toolbar'

import { EThree } from '@virgilsecurity/e3kit-native';

const express = require('express');

const getTokenFactory = (identity) => {
  return async () => {
    const apiUrl = 'http://10.0.2.2:3000';
    const response = await fetch(`${apiUrl}/virgil-jwt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identity }),
    });

    const data = await response.json();
    // console.log('Fetched Virgil JWT:', data.virgil_jwt);
    return data.virgil_jwt;
  };
};




export function ChatScreen({route, navigation}) {
    const isFocused = useIsFocused()
    const myChatRoomID = route.params.chatRoomID;
    const myUserData = route.params.user;
    const otherUser = route.params.otherUser;
    const [messages, setMessages] = useState([]);
    const [points, setPoints] = useState(0);

    const [eThreeUser, setEThreeUser] = useState(null);
    const [eThreeOtherUser, setEThreeOtherUser] = useState(null);
    const [eThreeInitialized, setEThreeInitialized] = useState(false);

  useEffect(() => {
    const initEThree = async () => {
      let identity = myUserData.id;
      let getToken = getTokenFactory(identity);
      const eThree_user = await EThree.initialize(getToken, { AsyncStorage });

      let isRegistered_user = await eThree_user.hasLocalPrivateKey();
      if (!isRegistered_user) {
        await eThree_user.register();
      }

      identity = otherUser.id;
      getToken = getTokenFactory(identity);
      const eThree_otherUser = await EThree.initialize(getToken, { AsyncStorage });

      let isRegistered_otherUser = await eThree_otherUser.hasLocalPrivateKey();
      if (!isRegistered_otherUser) {
        await eThree_otherUser.register();
      }

      if (!eThree_user) {
       console.error("User not found in the E3 application")
      }

      if (!eThree_otherUser) {
       console.error("Other user not found in the E3 application")
      }

      setEThreeUser(eThree_user);
      setEThreeOtherUser(eThree_otherUser);
      console.log("CHeck 1");

      isRegistered_otherUser = await eThree_otherUser.hasLocalPrivateKey();
      isRegistered_user = await eThree_user.hasLocalPrivateKey();
      if (isRegistered_user && isRegistered_otherUser) {
        setEThreeInitialized(true);
      }
    };

    initEThree();
  }, []);

  useEffect(() => {
    const loadPrevMessages = async() => {
        const messagesData = await API.graphql(
            {
                query: messagesByChatRoom,
                variables: {chatRoomID: myChatRoomID, sortDirection: "ASC",},
                authMode: "API_KEY",
            }
        )
//        console.log(myChatRoomID)
//        console.log(messagesData.data.messagesByChatRoom.items)

        const messagesDataArr = messagesData.data.messagesByChatRoom.items
        for(let i=0; i<messagesDataArr.length; i++) {

            const curr = messagesDataArr[i];
            const sender = curr.id;
            //let getToken = getTokenFactory(sender);
            //const eThree_curr = await EThree.initialize(getToken, { AsyncStorage });

            // Get sender card with public key
            const senderCard = await eThreeUser.findUsers(sender);

            // Decrypt text with the recipient private key and ensure it was written by sender
            const decryptedText = await eThreeUser.authDecrypt(curr.content, senderCard);

            const msg = {
                _id: curr.id,
                text: decryptedText,
                createdAt: curr.createdAt,
                user: {
                    _id: curr.user.id,
                    name: curr.user.name,
                    avatar: curr.user.imageUri,
                },
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        }

    }

        loadPrevMessages();

  }, [eThreeUser])

    useEffect(() => {
        // TODO: is this necessary? same thing covered by subscription useEffect
        if (isFocused) {
            const loadPoints = async () => {
                try {
                    const val = await AsyncStorage.getItem('flowerPoints')
                    if (val) {
                        console.log("val points: ", val)
                        setPoints(parseInt(val))
                    } else {
                        // default points
                        await AsyncStorage.setItem('flowerPoints', '20')
                        setPoints(20)
                    }
                } catch (error) {
                    console.log("error retrieving flower data")
                }
            }
            loadPoints();
        }
    }, [isFocused])

    useEffect(() => {
        const setFlowerPoints = async () => {
            try {
                const val = await AsyncStorage.getItem('flowerPoints')
                if (val) {
                    console.log("val points: ", val)
                    setPoints(parseInt(val))
                } else {
                    await AsyncStorage.setItem('flowerPoints', '20')
                    setPoints(20)
                }
                try {
                    console.log("prev (curr) points: ", parseInt(val))
                    await AsyncStorage.setItem('flowerPoints', (parseInt(val)+10).toString())
                } catch (error) {
                    console.log("error saving flower data")
                }
            } catch (error) {
                console.log("error retrieving flower data")
            }
        }

        const subscription = API.graphql(
            {
                query: onCreateMessage,
                authMode: "API_KEY",
            }
        ).subscribe({
            next: async ({provider, value}) => {
    //            console.log(value.data.onCreateMessage)
                const newMessage = value.data.onCreateMessage
                if (newMessage.chatRoomID != myChatRoomID) {
                    return;
                }

                if (newMessage.id != myUserData.id) {
                    setFlowerPoints();
                    //console.log("prev points: ", points)
                    setPoints(points+10)
                }

            const sender = newMessage.user.id;

            // Get sender card with public key
            const senderCard = await eThreeUser.findUsers(sender);

            // Decrypt text with sender's private key and ensure it was written by sender
            const decryptedText = await eThreeUser.authDecrypt(newMessage.content, senderCard);

            /* TESTING
            console.log('Sender ID:', sender);
            try {
                const senderCard = await eThree.findUsers(sender);
                console.log('Sender card found:', senderCard);
            } catch (error) {
                console.error('Sender card not found:', error);
            }
            console.log('Encrypted message:', newMessage.content);

            const sender_Card = await eThree.findUsers(sender);
            const decryptedText = await eThree.authDecrypt(newMessage.content, sender_Card);
            console.log('Decrypted message:', decryptedText);
            */

            const msg = {
                _id: newMessage.id,
                text: decryptedText,
                createdAt: newMessage.createdAt,
                user: {
                    _id: newMessage.user.id,
                    name: newMessage.user.name,
                    avatar: newMessage.user.imageUri,
                },
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        },
        error: error => console.warn(error.error.errors)
    })
        return () => subscription.unsubscribe();
  }, [eThreeUser])

  const onSend = async(newMessage = []) => {

    // Get recipient id
    const identities = [otherUser.id];
    // console.log('Identities:', identities);

    // Find users cards with public keys

    if (eThreeUser) {
     const findUsersResult = await eThreeUser.findUsers(identities);

     // Encrypt text string with the recipient's public key and sign with sender's private key
     const encryptedText = await eThreeUser.authEncrypt(newMessage[0].text, findUsersResult);


     await API.graphql({
       query: createMessage,
       variables: {
         input: {
           content: encryptedText,
           userID: route.params.user.id,
           chatRoomID: route.params.chatRoomID,
         },
       },
       authMode: 'API_KEY',
     });
     console.log('end');
    }

  }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#f5f5f5',
            flex: 1
        },
        listTitle: {
            fontSize: 22
        },
        listDescription: {
            fontSize: 16
        },
        sendingContainer: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        bottomComponentContainer: {
            justifyContent: 'center',
            alignItems: 'center'
        },
        loadingContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    });

    function renderBubble(props) {
        return (
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#6646ee'
                    }
                }}
                textStyle={{
                    right: {
                        color: '#fff'
                    }
                }}
            />
        );
    }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );
  }

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#6646ee' />
      </View>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }

  return (
    <>
        <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Title>
                {otherUser.name}
            </Title>
        </Appbar.Header>

        {eThreeInitialized ? (
        <GiftedChat
          messages={messages}
          onSend={newMessage => onSend(newMessage)}
          user={{
            _id: route.params.user.id,
            avatar: route.params.user.imageUri,
          }}
          renderBubble={renderBubble}

          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          placeholder='Type your message here...'
          showUserAvatar
          alwaysShowSend
          renderSend={renderSend}
          renderLoading={renderLoading}
          bottomOffset={36}
        />
        ) : (
           <View style={styles.loadingContainer}>
           <ActivityIndicator size='large' color='#6646ee' />
           </View>
        )}

          <View style={{marginBottom:17}}>
            <Text>{'\n\n'}</Text>
          </View>
    </>
  );

}
