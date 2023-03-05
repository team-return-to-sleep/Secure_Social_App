import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View,Text,StyleSheet} from 'react-native'
import { Appbar,Title,Button,TextInput} from 'react-native-paper';
import API, {graphqlOperation} from '@aws-amplify/api'

import Toolbar from '../Toolbar'

export function ChatScreen({route, navigation}) {
  const chatRoomID = route.params.id;
  const otherUser = route.params.otherUser;
  const [myUserData, setMyUserData] = useState()
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchUser = async() => {
      const userInfo = await Auth.currentAuthenticatedUser();
      const userData = await API.graphql (
        {
          query: getUser,
          variables: {id: userInfo.attributes.sub},
          authMode: "API_KEY"
         }
       )
       setMyUserData(userData)
    }
    fetchUser();
    setMessages([
      {
        _id: 1,
        text: 'Hey when do you want to meet up to work?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: otherUser.imageUri,
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

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
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
            avatar: 'https://placeimg.com/150/150/any',
          }}
          alignTop
          scrollToBottom
          showUserAvatar
          bottomOffset={26}
        />
        <View style={{marginBottom:26}}>
            <Text>  {'\n\n'} </Text>
        </View>
    </>
  );
}
