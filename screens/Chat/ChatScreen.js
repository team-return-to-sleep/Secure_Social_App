import React, { useState, useCallback, useEffect } from 'react'
import {GiftedChat, InputToolbar} from 'react-native-gifted-chat'
import {View,Text,StyleSheet} from 'react-native'

import Toolbar from '../Toolbar'

export function ChatScreen() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
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
        <GiftedChat
          messages={messages}
          onSend={messages => onSend(messages)}
          /* renderInputToolbar={props => customInputToolbar(props)}*/
          user={{
            _id: 1,
          }}
        />
  );
}

/* const customInputToolbar = props => {
  return (
    <InputToolbar {...props}
      containerStyle={styles.toolbar}
    />
  );
};

const styles = StyleSheet.create({
    toolbar: {
        elevation: 0,
        backgroundColor: '#BBCAEB',
        borderRadius: 20,
    }

}); */