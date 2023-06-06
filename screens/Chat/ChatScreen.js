import React, { useState, useCallback, useEffect, useContext } from 'react'
import { onQuickReply, ChatInput, Action, SendButton, LeftAction, GiftedChat, Bubble, Send } from 'react-native-gifted-chat'
import {TouchableOpacity,ScrollView,Linking,View,Image,Text,FlatList,StyleSheet,AsyncStorage} from 'react-native'
import { ActivityIndicator,Appbar,Title,Button,TextInput,IconButton } from 'react-native-paper';
import { useIsFocused } from "@react-navigation/native";

import {Auth} from 'aws-amplify'
import {getUser, getGarden, listUsers, messagesByChatRoom, getChatRoom} from '../../src/graphql/queries'
import {createMessage, createGarden, updateGarden, updateChatRoom, updateMessage} from '../../src/graphql/mutations'
import {onCreateMessage} from '../../src/graphql/subscriptions'
import {API, graphqlOperation} from '@aws-amplify/api'

import { Storage } from 'aws-amplify';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import { RNS3 } from 'react-native-aws3';

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
import { Buffer } from 'buffer';

import { EThree } from '@virgilsecurity/e3kit-native';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

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

const fetchSecretsFactory = () => {
  return async () => {
    const secret_name = "S3secret";

    const client = new SecretsManagerClient({
      region: "us-west-2",
    });

    try {
      const response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
      );

      return JSON.parse(response.SecretString);

    } catch (error) {
      // For a list of exceptions thrown, see
      // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
      console.log("Here");
      throw error;
    }
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

    const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');


    const chooseFile = () => {
     if (myUserData.bestBuds && myUserData.bestBuds.includes(otherUser.id)){
       console.log("I included the other user");
     } else {
       console.log("I did not include the other user");
     }

     if (otherUser.bestBuds && otherUser.bestBuds.includes(myUserData.id)) {
     console.log("The other user has included me");
     } else {
     console.log("The other user has not included me");
     }

     if (myUserData.bestBuds && myUserData.bestBuds.includes(otherUser.id) && otherUser.bestBuds && otherUser.bestBuds.includes(myUserData.id)) {
          let options = {
            mediaType: 'photo',
          };
          launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            if (response.assets && response.assets[0].type) {
                console.log('Type = ', response.assets[0].type);
              } else {
                console.log('Type is not defined');
              }

            setUploadSuccessMessage('');
            if (response.didCancel) {
            //  alert('User cancelled camera picker');
              return;
            } else if (response.errorCode == 'camera_unavailable') {
              alert('Camera not available on device');
              return;
            } else if (response.errorCode == 'permission') {
              alert('Permission not satisfied');
              return;
            } else if (response.errorCode == 'others') {
              alert(response.errorMessage);
              return;
            }
            uploadFile(response);
          });
       } else {
        alert('Best buds must be enabled on both users if pictures are to be sent. Go to View Profile of this person to Enable');
       }

    };

    const uploadFile = async (filePath) => {
      if (Object.keys(filePath).length == 0) {
        alert('Please select image first');
        return;
      }
      console.log("file path",filePath);

      /*
      const fetchSecrets = fetchSecretsFactory();
      const secrets = await fetchSecrets();
      console.log("Secrets: ",secrets);
      */

      RNS3.put(
            {
              uri: filePath.assets[0].uri,
              name: filePath.assets[0].fileName,
              type: filePath.assets[0].type,
            },
        {
          keyPrefix: 'public/',
          bucket: 'amplify-wallflower-staging-63629-deployment',
          region: 'us-west-2',
          accessKey: process.env.ACCESS_KEY,
          secretKey: process.env.SECRET_KEY,
          successActionStatus: 201,
        },
      )
        .progress((progress) =>
          setUploadSuccessMessage(
            `Uploading: ${progress.loaded / progress.total} (${
              progress.percent
            }%)`,
          ),
        )
        .then((response) => {
          if (response.status !== 201)
            alert('Failed to upload image to S3');
          console.log(response.body);
          let {
            bucket,
            etag,
            key,
            location
          } = response.body.postResponse;
          onSend([{ image: location }]);
          setUploadSuccessMessage(
            `Uploaded Successfully:
            \n1. bucket => ${bucket}
            \n2. etag => ${etag}
            \n3. key => ${key}
            \n4. location => ${location}`,
          );
        });
    };

  useEffect(() => {
    const initEThree = async () => {
          let identity = myUserData.id;
          let getToken = getTokenFactory(identity);
          const eThree_user = await EThree.initialize(getToken, { AsyncStorage });

          let isRegistered_user = await eThree_user.hasLocalPrivateKey();

          if (!isRegistered_user) {
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
        const chatRoomData = await API.graphql(
            {
                query: getChatRoom,
                variables: {id: myChatRoomID},
                authMode: "API_KEY",
            }
        )
//        console.log(myChatRoomID)
//        console.log(messagesData.data.messagesByChatRoom.items)

        const messagesDataArr = messagesData.data.messagesByChatRoom.items
        const latestMessage = chatRoomData.data.getChatRoom.lastMessage
        //console.log("CHATSCREEN LATESTMESSAGE ", latestMessage)

        for(let i=0; i<messagesDataArr.length; i++) {


           const curr = messagesDataArr[i];
           const sender = curr.user.id;

           // Get sender card with public key
           const senderCard = await eThreeUser.findUsers(sender);

           let decryptedContent;
           // Decrypt text with the recipient private key and ensure it was written by sender
           try {
            decryptedContent = await eThreeUser.authDecrypt(curr.content, senderCard);
           } catch (err) {
            // This might happen if the messages didn't undergo encryption because it was sent before the set up
            decryptedContent = curr.content;
           }

            const isImageUrl = decryptedContent.startsWith('https://amplify-wallflower-staging-63629-deployment.s3.amazonaws.com/'); // or use a more robust URL check
            console.log("Image Url ", isImageUrl);

            let msg;

            if (isImageUrl) {
              // Message is an image
              msg = {
                _id: curr.id,
                image: decryptedContent, // pass the image URL
                createdAt: curr.createdAt,
                user: {
                  _id: curr.user.id,
                  name: curr.user.name,
                  avatar: curr.user.imageUri,
                },
              };
            } else {
              // Message is text
              msg = {
                _id: curr.id,
                text: decryptedContent, // pass the decrypted text
                createdAt: curr.createdAt,
                user: {
                  _id: curr.user.id,
                  name: curr.user.name,
                  avatar: curr.user.imageUri,
                },
              };
            }

            if (sender != myUserData.id && curr.id == latestMessage.id) {
                console.log("message read")
                await API.graphql({
                    query: updateMessage,
                    variables: {
                      input: {
                        id: latestMessage.id,
                        hasRead: true,
                      },
                    },
                    authMode: 'API_KEY',
                });
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
                            flowerOutfit: userGarden.data.getGarden.flowerOutfit,
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
                            points: 10,
                            flowerOutfit: 'original',
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
            const decryptedContent = await eThreeUser.authDecrypt(newMessage.content, senderCard);

            console.log("Hi there");
            const isImageUrl = decryptedContent.startsWith('https://amplify-wallflower-staging-63629-deployment.s3.amazonaws.com/'); // or use a more robust URL check
            console.log("Image Url ", isImageUrl);

            let msg;

            if (isImageUrl) {
              // Message is an image
              msg = {
                _id: newMessage.id,
               image: decryptedContent, // pass the image URL
                createdAt: newMessage.createdAt,
                user: {
                  _id: newMessage.user.id,
                  name: newMessage.user.name,
                  avatar: newMessage.user.imageUri,
                },
              };
            } else {
              // Message is text
              msg = {
                _id: newMessage.id,
                text: decryptedContent, // pass the decrypted text
                createdAt: newMessage.createdAt,
                user: {
                  _id: newMessage.user.id,
                  name: newMessage.user.name,
                  avatar: newMessage.user.imageUri,
                },
              };
            }

            setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        },
        error: error => console.warn(error.error.errors)
    })
        return () => subscription.unsubscribe();
  }, [eThreeUser, eThreeOtherUser])

  const onSend = async(newMessage = []) => {

      // Get recipient id
      console.log("Inside onsend");
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
      console.log("message content", newMessage[0].image);
      let messageContent = newMessage[0].text;
      if (newMessage[0].image) {
            messageContent = newMessage[0].image; // use the image URL as the message content
            console.log("Inside onsend 2 and content", messageContent);
       }
       const encryptedText = await eThreeUser.authEncrypt(messageContent, findUsersResult);

       const newMessageData = await API.graphql({
         query: createMessage,
         variables: {
           input: {
             content: encryptedText,
             userID: route.params.user.id,
             chatRoomID: route.params.chatRoomID,
             hasRead: false,
           },
         },
         authMode: 'API_KEY',
       });

       await API.graphql({
          query: updateChatRoom,
          variables: {
            input: {
              id: route.params.chatRoomID,
              lastMessageID: newMessageData.data.createMessage.id,
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
          <View style={{
              flexDirection: 'row',
              paddingLeft: 5,
              paddingBottom: 5,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
          <Menu renderer={ContextMenu} {...props}>
              <MenuTrigger>
                <View style={styles.gameButton}>
                  <Icon name="game-controller" size={32} color="black" />
                </View>
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
            <TouchableOpacity
            onPress={chooseFile}
            style={styles.cameraButton}>
               <Icon name="camera-outline" size={32} color="black" />
            </TouchableOpacity>
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
              renderActions={renderActions}
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
    gameButton: {
        alignItems: 'center',
        marginBotton: '-10%',
        justifyContent: 'center',
        marginRight: 3,
    },
    cameraButton: {
        alignItems: 'center',
        marginBotton: '-10%',
        justifyContent: 'center',
        marginLeft: 3,
    },
});