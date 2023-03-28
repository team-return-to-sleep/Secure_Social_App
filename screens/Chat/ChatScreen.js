import React, { useState, useCallback, useEffect } from 'react'
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
const { initCrypto, VirgilCrypto } = require('virgil-crypto');
import EThreeContext from '../../src/EThreeContext';


export function ChatScreen({route, navigation}) {
  const isFocused = useIsFocused()
  const myChatRoomID = route.params.chatRoomID;
  const myUserData = route.params.user;
  const otherUser = route.params.otherUser;
  const [messages, setMessages] = useState([]);
  const [points, setPoints] = useState(0);
  const eThree = useContext(EThreeContext);

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

            //const curr = messagesDataArr[i];
            //const senderPublicKey = await ethree.findUsers(curr.user.id);
            //const decryptedText = await ethree.decrypt(curr.content, senderPublicKey[curr.user.id]);

            const curr = messagesDataArr[i];
            const sender = curr.id;
            const senderCard = await eThree.findUsers(sender);
            const decryptedText = await eThree.authDecrypt(curr.content, senderCard);

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

  }, [])

  useEffect(() => {
    if (isFocused) {
    const loadPoints = async () => {
                try {
                    const val = await AsyncStorage.getItem('flowerPoints')
                    if (val) {
                        console.log("val points: ", val)
                        setPoints(parseInt(val))
                    } else {
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
        next: ({provider, value}) => {
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



            const msg = {
                _id: newMessage.id,
                text: newMessage.content,
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
  }, [])

  const onSend = async(newMessage = []) => {
    const identities = otherUser.id;

    // Find users cards with public keys
    const findUsersResult = await eThree.findUsers(identities);

    // Encrypt text string
    const encryptedText = await eThree.authEncrypt(newMessage[0].text, findUsersResult);


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

};

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
        alignItems: 'center'
    },
    bottomComponentContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
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
        <View style={{marginBottom:17}}>
            <Text>  {'\n\n'} </Text>
        </View>
    </>
  );
}
