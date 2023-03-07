import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import {View,Text,StyleSheet} from 'react-native'
import { ActivityIndicator,Appbar,Title,Button,TextInput,IconButton } from 'react-native-paper';

import {Auth} from 'aws-amplify'
import {getUser, listUsers, messagesByChatRoom} from '../../src/graphql/queries'
import {createMessage} from '../../src/graphql/mutations'
import {API, graphqlOperation} from '@aws-amplify/api'

import Toolbar from '../Toolbar'

export function ChatScreen({route, navigation}) {
  const myChatRoomID = route.params.chatRoomID;
  const myUserData = route.params.user;
  const otherUser = route.params.otherUser;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
//    setMessages([
//      {
//        _id: route.params.user.id,
//        text: 'Hey when do you want to meet up to work?',
//        createdAt: new Date(),
//        user: {
//          _id: otherUser.id,
//          name: 'React Native',
//          avatar: otherUser.imageUri,
//        },
//      },
//    ])
    const loadPrevMessages = async() => {
        const messagesData = await API.graphql(
            {
                query: messagesByChatRoom,
                variables: {chatRoomID: myChatRoomID, sortDirection: "DESC",},
                authMode: "API_KEY",
            }
        )
        //console.log(messagesData.data.messagesByChatRoom.items)
        const messagesDataArr = messagesData.data.messagesByChatRoom.items
        for(let i=0; i<messagesDataArr.length; i++) {
            const curr = messagesDataArr[i]
            const msg = {
                _id: curr.id,
                text: curr.content,
                createdAt: curr.createdAt,
                user: {
                    _id: curr.user.id,
                    name: curr.user.name,
                    avatar: curr.user.imageUri,
                },
            }
            setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        }
        //setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }
    loadPrevMessages();
  }, [])

  const onSend = async(newMessage = []) => {
    setMessages(GiftedChat.append(messages, newMessage));
    // const { _id, createdAt, text, user, } = messages[0]

    console.log(newMessage[0].text)
    console.log(route.params.user.id)
    console.log(route.params.chatRoomID)
    await API.graphql(
        {
            query: createMessage,
            variables: {
                input: {
                    content: newMessage[0].text,
                    userID: route.params.user.id,
                    chatRoomID: route.params.chatRoomID,
                }
            },
            authMode: "API_KEY"
        }
    )
    console.log("end")
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
          alignTop
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
