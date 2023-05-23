import React, { useState, useCallback, useEffect, useContext } from 'react'
import { onQuickReply, ChatInput, Action, SendButton, LeftAction, GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import {TouchableOpacity,ScrollView,Linking,View,Image,Text,FlatList,StyleSheet,AsyncStorage} from 'react-native'
import { ActivityIndicator,Appbar,Title,Button,TextInput,IconButton } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

import {Auth} from 'aws-amplify'
import {getUser, getGarden, listUsers, messagesByChatRoom} from '../../src/graphql/queries'
import {createMessage, createGarden, updateGarden} from '../../src/graphql/mutations'
import {onCreateMessage} from '../../src/graphql/subscriptions'
import {API, graphqlOperation} from '@aws-amplify/api'

import { Storage } from 'aws-amplify';
import { v4 as uuidv4 } from 'uuid';
import DeviceInfo from 'react-native-device-info';
import { DEVELOPMENT_MACHINE_IP } from '@env';

import { Activities } from '../../assets/Activities';
import {
 Menu,
 MenuProvider,
 MenuOptions,
 MenuOption,
 MenuTrigger,
 renderers
} from 'react-native-popup-menu';

import Toolbar from '../Toolbar'
import { Platform } from 'react-native';

import { EThree } from '@virgilsecurity/e3kit-native';

const getTokenFactory = (identity) => {
  return async () => {
    const apiUrl = 'https://virgil-386402.wm.r.appspot.com/virgil-jwt';
    console.log("apiUrl", apiUrl);

    const response = await fetch(apiUrl, {
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


function isBase64(str) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

const uploadImageToS3 = async (fileUri) => {
  try {
    const response = await fetch(fileUri);
    const blob = await response.blob();
    const imageName = new Date().toISOString() + '-' + Math.random().toString(36).substring(2, 7);
    const fileKey = `${route.params.chatRoomID}/${imageName}`;
    const result = await Storage.put(fileKey, blob, {
      contentType: 'image/jpeg',
      level: 'public',
    });
    const url = await Storage.get(result.key);
    return url;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};

export function ChatScreen({route, navigation}) {
    const isFocused = useIsFocused()
    const myChatRoomID = route.params.chatRoomID;
    const myUserData = route.params.user;
    const otherUser = route.params.otherUser;

    const [myGarden, setMyGarden] = useState();
    const [messages, setMessages] = useState([]);
    const [points, setPoints] = useState(0);

    const [eThreeUser, setEThreeUser] = useState(null);
    const [eThreeOtherUser, setEThreeOtherUser] = useState(null);
    const [eThreeInitialized, setEThreeInitialized] = useState(false);
    const [showEncryptionMessage, setShowEncryptionMessage] = useState(true);

  useEffect(() => {
    const initEThree = async () => {
          let identity = myUserData.id;
          let getToken = getTokenFactory(identity);
          const eThree_user = await EThree.initialize(getToken, { AsyncStorage });

          let isRegistered_user = await eThree_user.hasLocalPrivateKey();

          console.log("Check 2");


          if (!isRegistered_user) {
          console.log("Check 1");
              // Attempt to register the user
              try {
                await eThree_user.register();
                await eThree_user.backupPrivateKey(identity);
              } catch (error) {
                // If the user is already registered, handle the error
                if (error.name === 'IdentityAlreadyExistsError') {
                  // Use user id as the password to restore the private key
                  try {
                    await eThree_user.restorePrivateKey(identity);
                  } catch (restoreError) {
                    // If there is no backup or the password is incorrect, rotate the private key
                    await eThree_user.rotatePrivateKey();
                    // Use user id as the new password to backup the new private key
                    await eThree_user.backupPrivateKey(identity);
                  }
                } else {
                  // If there's an unexpected error, throw it
                  throw error;
                }
              }
          }


          identity = otherUser.id;
          getToken = getTokenFactory(identity);
          const eThree_otherUser = await EThree.initialize(getToken, { AsyncStorage });

          try {
            const otherUserPublicKey = await eThree_otherUser.findUsers(otherUser.id);
            // Proceed with encrypting and sending the message
          } catch (error) {
            if (error.name === 'UsersNotFoundError') {
              // The other user is not registered yet
              console.log('The other user has not registered yet.');
              // Inform the current user or take some alternative action
            } else {
              throw error;
            }
          }

          if (!eThree_user) {
           console.error("User not found in the E3 application")
          }

          if (!eThree_otherUser) {
           console.error("Other user not found in the E3 application")
          }

          setEThreeUser(eThree_user);
          setEThreeOtherUser(eThree_otherUser);

       //   isRegistered_otherUser = await eThree_otherUser.hasLocalPrivateKey();
          isRegistered_user = await eThree_user.hasLocalPrivateKey();
          if (isRegistered_user) {
            setEThreeInitialized(true);
          }
        };

        initEThree();
  }, []);

  const { ContextMenu } = renderers;

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
           const sender = curr.user.id;

           // Get sender card with public key
           const senderCard = await eThreeUser.findUsers(sender);

           let decryptedText;
           // Decrypt text with the recipient private key and ensure it was written by sender
           try {
            decryptedText = await eThreeUser.authDecrypt(curr.content, senderCard);
           } catch (err) {
            // This might happen if the messages didn't undergo encryption because it was sent before the set up
            decryptedText = curr.content;
           }

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


        if (messages.length === 0 && showEncryptionMessage) {
          const encryptionMessage = {
            _id: Date.now(), // Unique ID
            text: 'Your messages are end-to-end encrypted',
            createdAt: new Date(),
            system: true,
            textStyle: {
                  color: '#777', // Change this to a darker color
            },
          };
          setMessages(previousMessages => GiftedChat.append(previousMessages, encryptionMessage));
          setShowEncryptionMessage(false);
        }

    }

    if(eThreeUser) {
     loadPrevMessages();
    }
  }, [eThreeUser])

  useEffect(() => {
    const setFlowerPoints = async () => {

        let garden;
                try {
                    let userGarden = await API.graphql(
                        {
                            query: getGarden,
                            variables: {id: myUserData.id},
                            authMode: "API_KEY",
                        }
                    )
                    console.log("CHATSCREEN USERGARDEN: ", userGarden)
                    //const val = await AsyncStorage.getItem('flowerPoints')
                    if (userGarden) {
                        garden = {
                            flowerSize: userGarden.data.getGarden.flowerSize,
                            id: userGarden.data.getGarden.id,
                            userID: userGarden.data.getGarden.userID,
                            points: userGarden.data.getGarden.points,
                        }
                        console.log("flower points: ", garden.points)
                        //setPoints(parseInt(val))
                    } else {
        //                await AsyncStorage.setItem('flowerPoints', '20')
        //                setPoints(20)
                        garden = {
                            userID: myUserData.id,
                            id: myUserData.id,
                            flowerSize: 120,
                            points: 10
                        }
                        await API.graphql(
                            {
                                query: createGarden,
                                variables: {input: garden},
                                authMode: "API_KEY"
                            }
                        )
                    }
                    //loadPoints();
                    setMyGarden(garden)
                    console.log("GARDEN SET ", garden)
                } catch (error) {
                    console.log("CHATSCREEN: could not save flower points; ", error)
                }
    }
    setFlowerPoints();

  }, [isFocused])

    useEffect(() => {
        const setFlowerPoints = async () => {
            let garden = myGarden
            console.log("DEBUG GARDEN ", garden)
            try {
                console.log("prev (curr) points: ", garden.points)
                garden.points = garden.points + 10
                console.log("CHATSCREEN garden: ", garden)
                await API.graphql(
                    {
                        query: updateGarden,
                        variables: {input: garden},
                        authMode: "API_KEY"
                    }
                )
                setMyGarden(garden)
                        //console.log("prev (curr) points: ", parseInt(val))
                        //await AsyncStorage.setItem('flowerPoints', (parseInt(val)+10).toString())
            } catch (error) {
                console.log("error retrieving flower data: ", error)
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

                console.log("NewMessage: ", newMessage)
                if (newMessage.user.id != myUserData.id) {
                    setFlowerPoints();
                    //console.log("prev points: ", points)
                    //setPoints(points+10)
                    console.log("I did not send that message")
                }

            const sender = newMessage.user.id;
            // console.log("Check during decrypt ",sender);

            // Get sender card with public key
            const senderCard = await eThreeUser.findUsers(sender);
            // console.log("CHeck sender")

            // Decrypt text with sender's private key and ensure it was written by sender
            const decryptedText = await eThreeUser.authDecrypt(newMessage.content, senderCard);

            /*
            console.log('Sender ID:', sender);
            try {
                const senderCard = await eThreeUser.findUsers(sender);
                console.log('Sender card found:', senderCard);
            } catch (error) {
                console.error('Sender card not found:', error);
            }
            console.log('Encrypted message:', newMessage.content);

            const sender_Card = await eThreeUser.findUsers(sender);
            const decryptedText = await eThreeUser.authDecrypt(newMessage.content, sender_Card);
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
  }, [eThreeUser, eThreeOtherUser])

  const onSend = async(newMessage = []) => {

    // Get recipient id
    const identities = [otherUser.id];
    // console.log('Identities:', identities);

    // Find users cards with public keys
    // console.log("Check during encrypt ",route.params.user.id);

    if (eThreeUser) {
     const findUsersResult = await eThreeUser.findUsers(identities);

     // Encrypt text string with the recipient's public key and sign with sender's private key
     // const encryptedText = await eThreeUser.authEncrypt(newMessage[0].text, findUsersResult);
    // console.log("ENcrrypt:", encryptedText);

    // Check if the message has an image
        const imageObject = newMessage[0].image;
        let imageURL = null;
        if (imageObject) {
          imageURL = await uploadImageToS3(imageObject.uri);
          if (!imageURL) {
            // Error uploading image, exit function
            return;
          }
        }

     const encryptedText = imageURL ? '' : await eThreeUser.authEncrypt(newMessage[0].text, findUsersResult);


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



  function SystemMessage(props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            left: { backgroundColor: '#6646ee' },
            right: { backgroundColor: '#6646ee' },
          }}
          textStyle={{
            left: { color: '#fff' },
            right: { color: '#fff' },
          }}
        />
      );
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

  const renderActions = (props) => {
      return (
        <View style={{ flexDirection: 'row', paddingBottom: 12 }}>
        <Menu renderer={ContextMenu} {...props}>
            <MenuTrigger>
                <Image
                    style={styles.gameButton}
                    source={{ uri: 'https://www.freepnglogos.com/uploads/games-png/games-controller-game-icon-17.png'}}
                    resizeMode='contain'/>
            </MenuTrigger>
            <MenuOptions>
                <FlatList
                    data={Activities}
                    keyExtractor={(item) => item.id}
                    style={{height:200}}
                    renderItem={({item}) => (
                        <MenuOption

                            onSelect={() => props.onSend({text: item.uri})}
                            customStyles={{
                                optionWrapper: {
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                },
                            }}
                        >
                            <Text>{item.name}</Text>
                        </MenuOption>
                    )}
                />
            </MenuOptions>
        </Menu>
      </View>

      );
    };

  return (
    <>
        <MenuProvider>
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
          renderActions={renderActions}
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
          </MenuProvider>
    </>
  );

}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#f5f5f5',
      flex: 1
    },
    menuContainer: {
        marginTop: '5%',
        width: '10%',
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
    },

    //BREAK
    gameButton: {
        paddingLeft: 30,
        marginBottom: '-10%',
        width: 30,
        height: 30,
        borderRadius: 30,
    },
});