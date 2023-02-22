import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import {View,Text,StyleSheet} from 'react-native'
import { Appbar,Title,Button,TextInput} from 'react-native-paper';


import Toolbar from '../Toolbar'

export function ChatScreen({navigation}) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hey when do you want to meet up to work?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
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
                Chat
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
