# Wallflower

<div style="text-align:center" >
 <p style="color:teal"> <b>UC Davis Senior Design Project 2023: 
     <br>Private and Secure Social Networking Service</b></p>
 
<b>Client</b>
    Justin Jia
    <br>
    <b>Team return to_sleep;</b> 
    Jessica Cai, Rahul George, Richard Qin, Cathy Wang
</div>
<div>
    
</div>

## Preface

Many messaging and social media apps today are not comfortable for users to use. Unsolicited messaging and fear of giving information to third parties are only two reasons for this. On top of this, there are many people who struggle to make new lasting personal relationships. Our app aims to target both of these audiences and create a space for users to chat with others over mutual interests while ensuring their privacy and safety.

This is a senior design project for ECS193A/B at UC Davis. Our client and mentor for this project is Justin Jia, a former student and teaching assistant for this class.


## Table of Contents
- [Overview of the Product](#overview-of-the-product) 
- [Installation or Distribution](#installation-or-distribution)
- [Project Structure](#project-structure)
- [App Functionality](#app-functionality)
  - [Sign Up, Login, and Updating User Information](#sign-up-login-and-updating-user-information)
    - [Sign Up](#sign-up)
    - [Login](#login)
    - [Updating User Information](#updating-user-information)
  - [Finding Friends](#finding-friends)
    - [Home Screen](#home-screen)
    - [Browse Screen](#browse-screen)
  - [Chatrooms](#chatrooms)
    - [Starting a Chat](#starting-a-chat)
    - [Safety and Security Measures](#safety-and-security-measures)
    - [Chat Interface](#chat-interface)
    - [Activities Together](#activities-together)
  - [Incentivizing Conversations](#incentivizing-conversations)
  - [Privacy and Security](#privacy-and-security)
    - [Encryption Overview](#encryption-overview)
- [Troubleshooting](#troubleshooting)
- [Frequently Asked Questions](#frequently-asked-questions)
- [Known Issues and Edge Cases](#known-issues-and-edge-cases)
- [Contact Information](#contact-information)
- [Glossary](#glossary)


## Overview of the Product
For privacy and safety, our app supports two-factor user authentication, end-to-end encrypted messaging, restricted photo sharing with “best buds” only, a handshake messaging system, and convenient blocking features. 

For encouragement of conversations and making friends, we have public interests shown on profiles, a matching algorithm to connect users with similar interests, and a convenient in-chat button with activities to break the ice. Users will also be able to select profile pictures and update their statuses with their latest interests to attract the attention of those with similar tastes.

We have also implemented a virtual pet plant in the app, raised through points you earn by messaging others. This encourages increased usage of our app and thus increases the likelihood of striking a meaningful conversation with a new friend.

**Software tools used in this app:**
React Native - UI
React Native - Building and test app
AWS Amplify - Configure and manage AWS services
AWS AppSync - Communication/GraphQL
AWS DynamoDB - Store all user data 
AWS Cognito - Two-Factor Authentication
VirgilCrypto E3Kit - End-to-end Encryption
Android Studio - IDE


![](assets/images/overview.png)


## Installation or Distribution

### Install Required Packages
In the project directory console, run `npm install` or `yarn install` to install node modules. Note that to prevent unexpected errors, it’s best to stay consistent in terms of installation packages.

### Setting up AWS services
### Set up and configure your AWS account
1. Follow the instructions at https://portal.aws.amazon.com/billing/signup? redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start to create an AWS account if you don’t have one already
2. In the project directory, run `npm install -g @aws-amplify/cli` to install the Amplify CLI
3. Configure the Amplify CLI following the steps in https://docs.amplify.aws/start/ getting-started/installation/q/integration/react-native/. Note when selecting your region, you can select any region from the following list to avoid unexpected errors: https://docs.aws.amazon.com/sns/latest/dg/sns-supported-regions -countries.html. Also make sure to download the csv file containing your access keys for safe storage after creating your user.

### Add Amplify into the Project
1. In the project directory console, run `amplify init`
2. Upon being asked a list of questions, select `javascript` for the type of app you’re building and `react-native` for the javascript framework used. Every other question can be answered using the default response.
3. Select `Yes` when asked if you want to use an AWS profile and pick out your newly created profile

### Add Cognito Authentication into the Project
1. In the project directory console, run `amplify add auth`.
2. You will be prompted several questions which you can answer as follows:

    * Do you want to use the default authentication and security configuration? `default configuration`
    * How do you want users to be able to sign in? `Username`
    * Do you want to configure advanced settings? `No`

3. Navigate to the AWS console and search ‘Amplify’. Click on ‘Wallflower’ if it is visible, otherwise click on `New app > build an app`. If ‘Wallflower’ is available, skip to step 5. 
4. Enter an app name (Wallflower) and confirm deployment. Amplify may take a few minutes to set up
5. Click on ‘launch studio’ and you should get redirected to Amplify Studio. On the left side menu, navigate to ‘Authentication’
6. Configure the following:

   * Login `‘Username’ as login mechanism`
   * Sign up `‘Email’, ‘Name’ as attributes`
   * Password Policy
     * Length in characters: 7
     * Check boxes for lowercase, uppercase, numerals, and symbols
     * Check box for email under ‘Forgot password message’

7. Press `deploy` and wait for the success message in the top right corner. Click on the message and copy the terminal command into the project directory console
8. Run the given `amplify pull` command, and confirm login to the Amplify CLI
9. You will be prompted more questions, which you may answer as follows:

     * Choose your default editor `Android Studio`
     * Choose the type of app that you’re building `javascript`
     * What javascript framework are you using `React native`
     * Source directory path `src (default)`
     * Distribution directory path `/ (default)`
     * Build command `npm.cmd run-script build (default)`
     * Start command `Npm.cmd run-script start (default)`
     * Do you plan on modifying this backend `Yes`

10. Make sure an amplify folder is created in the project directory, along with the file `aws-exports.js`

### Add GraphQL into the Project
1. In the terminal type `amplify add api` 
2.  Answer the subsequent questions as follows:
      * Please select from one of the below mentioned services: `GraphQL`
      *  Provide API name: `Anything here`
      *  Choose the default authorization type for the API: `API key`
      *  Enter a description for the API key: `Anything here`
      *  After how many days from now the API key should expire (1-365): `any valid number (you will have to recreate the api key in the aws console anter this expires.)`
      *  Do you want to configure advanced settings for the GraphQL API?` No, I am done`
      *  Do you have an annotated GraphQL schema? `No`
      *  Do you want a guided schema creation? `Yes`
      *  What best describes your project: 
`Single object with fields (e.g., “Todo” with ID, name, description)`
    * Do you want to edit the schema now? `Yes`
        * This will open a file in your text editor. In our project directory, navigate to `amplify/backend/api/Wallflower/schema.graphql` and copy over the file contents, then save
    * Return to the terminal and press `enter`
    * Type `amplify push` to make these changes present in the cloud.
### Modify Your GraphQL Schema
Queries.js
* Confirm the following changes to the chatRoomUser object are present under the getUser function

    ```
    chatRoomUser {
    items {
        id
        userID
        chatRoomID
        chatRoom {
            chatRoomUsers {
                items {
                    id
                    chatRoomID
                    userID
                }
            }
            lastMessage {
                id
                createdAt
                userID
                chatRoomID
                content
                imageURL
                updatedAt
                hasRead
            }
        }
        createdAt
    }
  
    ```
* Confirm the following changes to interests are present the listUser function    
    ```
    Interests {
	    items {
	        id
	        userID
	        categoryName
	        specificNames
	        createdAt
	        updatedAt
	    }
	    nextToken
    }
    ```
    
To send test queries, mutations, and subscriptions from AWS AppSync to AWS DynamoDB, see the **Troubleshooting** section about "Testing locally using AWS query Tab". There is also more documentation in this [tutorial](https://docs.aws.amazon.com/appsync/latest/devguide/quickstart-write-queries.html) "Run Queries and Mutations": .

##### That’s it! You have successfully added and configured the AWS services for Wallflower! I hope that you enjoy the code!
 
### Setting up encryption (Virgil E3Kit)

Virgil E3Kit is a powerful cryptographic library that enables end-to-end encryption for your applications. For this specific application, we use the E3Kit SDK that is compatible with React Native.

#### Guide
https://developer.virgilsecurity.com/docs/e3kit/get-started/

#### Installation
```
npm install @virgilsecurity/e3kit-native
```

#### Usage

All API functions work with binary data and strings interchangeably, providing flexible options for your encryption needs.

##### Identity Verification (JwtGenerator)
The JwtGenerator generates JSON Web Tokens (JWTs) that assert the identity of the users who try to access the Virgil Cloud.
```
EThree.initialize(tokenCallback)
```

Generates a new set of encryption keys for a user and stores the public key in the Virgil Cloud.
```
{
publicKey: ..., // Public Key
privateKey: ... // Private Key
}
```
##### Encryption
```
EThree.encrypt(text, theirPublicKey)
```
Encrypts and protects data using the recipient's and sender’s public key.

Returns an encrypted string, which is ready to be securely transmitted or stored.

##### Decryption
```
EThree.decrypt(text, myPrivateKey)
```

Decrypts and verifies the provided encrypted text using your private key.

Returns the original text if the decryption and verification process is successful, or an error if it fails.


## App Functionality
### Sign Up, Login, and Updating User Information
#### Sign Up
Sign up requires the user to provide:

User must provide the following information:
- Name
- Email
- Username
- Password - must be 7+ characters, contain upper and lowercase letters, numbers, and symbols

After submitting the above account information, users must verify their account by entering a temporary passcode that they receive via email to complete the signup process.

#### Login
Users must enter a username and password for a verified account.
- If a user tries to login with an account that has not been verified through the one time passcode, they are told ‘User is not confirmed’ and must first enter the code.
- A user can recover their account if they lose or forget their password by selecting the ‘Forgot Password’ button on the login page. 

Upon logging in to a newly created account, users will be guided through a signup flow where they will be prompted to enter user details such as name, region, age, and interests.

#### Updating User Information
At any later point, users may update their information by navigating to their account screen (bottom right button of the toolbar) and selecting “Change Profile Picture,” “Edit Interests Profile,” or “Edit Personal Details.”

### Finding Friends
Wallflower provides several features that support users in finding friends and choosing who to talk to.

#### Home Screen
The home screen will display other profiles that are compatible with the user. This will be ordered based on compatibility in geographical location and interests. Users may click on a profile and start a conversation from there.

#### Browse Screen
From the browse screen, a user may filter all other profiles by details such as interests, region, age, and username. This will allow them more fine-grained control over what type of people they want to meet. Any profiles that meet the requirements of the instantiated filter options will be displayed and can be clicked on for viewing. 

### Chatrooms
#### Starting a Chat
To start a chat, users may select another person’s profile and click the “Start Chatting!” button. As a safety feature, given any two users, neither can message the other until both parties consent. Thus a chat room will not be created until both users have clicked “Start Chatting!”

Once both users have expressed interest in starting a conversation, a chat room will be created and will be accessible from the messages tab. Users may click on a chat from the messages tab to enter that chatroom and continue a conversation.

#### Safety and Security Measures
As previously mentioned, Wallflower protects users who are worried about receiving unwanted messages by requiring that both participants express interest in starting a conversation before being permitted to send a message.

As further protection from spam or harassment, users may not send or receive photos to another person unless both parties have agreed to designate each other as "best buds" by selecting the "best buds" button on the other person's profile. By initially keeping personal photos private, Wallflower aims to increase user safety and reduce unconscious biases that may hinder friendships. 

Users may block any other person by clicking the block button on the offending user's profile. After blocking a user, neither user will be able to find or access the person's profile on the home screen, browse screen, or messages. Users can access a list of the people they've blocked on their account screen by selecting “View Blocklist.”

To ensure that messages are protected from MITM (Man in the Middle) attacks, we utilize the E3Kit for encrypting conversations so that they are not visible to anyone but the sender or receiver. The true message content is not available to even developers, as messages are encrypted before storing.

#### Chat Interface
Our chat interface utilizes Gifted Chat by FaridSafi. Like most messaging interfaces, there is a text box at the bottom of the screen which is used to enter and send messages. The sender's messages appear on the right and other person's messages appear on the left. Each user's messages are displayed with their profile photo, and the chatroom is labeled with the name of the correspondent. Users may scroll up to view previous messages.

#### Activities Together
To allow users to interact with their matches through remote activities, Wallflower integrates an “Activities Together” button into each chatroom which provides access to several multiplayer games. Users will be able to do more activities with their newly made friends.

### Incentivizing Conversations
Wallflower provides additional in-app features to motivate users to interact with their peers. Each user is given their very own wallflower, which they can water or change the appearance of using points. Points are earned through user interactions. Each message that is received is worth 1 point. Users can spend points to grow their flower in size or to change the appearance of their flower.

### Privacy and Security
Along with the aforementioned safety features (blocking, etc.), Wallflower protects user privacy by having minimal user information on record. All sign up information is stored through AWS Cognito. Amazon Cognito is used to handle user authentication, creation of user pools, and management of user data. We address concerns of information leaking to third parties by employing end-to-end encryption to keep messages private.

#### Encryption Overview
User messages are encrypted using Virgil Security’s E3Kit.

Initialization of E3kit
- At the start of the chat session, the app checks if the user has been registered with Virgil's E3kit. If they are not registered, the app registers them and backs up their private key. If the user has previously registered but lost their private key, the app restores it.

Getting Other User's Public Key
- The app retrieves the public key of the other user. If the other user is not registered yet, an error message will be logged.

Loading Previous Messages
- The app retrieves previous messages and decrypts them for display using E3kit. The decryption process ensures that the messages were written by the sender, enhancing the security of your chat.

Real-Time Updates
- The app subscribes to real-time updates, enabling instant message delivery. When a new message arrives, it is decrypted using E3kit and then added to the chat.

Sending a Message
- When a user sends a message, it's encrypted with the other user's public key and then stored in the database. This encryption process ensures only the recipient of the message can decrypt and read it.

Text & Image Handling
- The app allows users to send both text and image messages. It checks if the message is an image or text and handles each type correctly during the encryption and decryption processes.

Encryption Indicator
- For added transparency, an informative system message is shown in the chat to let users know their messages are being end-to-end encrypted.


## Troubleshooting

###  Wallflower
**User signup issues**

- Email must be a valid format following these guidelines:
"mysite@ourearth.com
my.ownsite@ourearth.org
mysite@you.me.net "
(Source: https://www.w3resource.com/javascript/form/email-validation.php)

- Password must be 8 characters long in our code. We did not make it a requirement to have special characters, capital letters, or numbers. 

**App crashes on startup**
- Reinstall app to clear cache and try creating a new account again. 


### Amazon Web Services

**AWS Dynamo Warning:** - GraphQLError: Request failed with status code 401

When sending messages, if the following error appears: 
```
Possible Unhandled Promise Rejection (id: 5):
Object {
  "data": Object {},
  "errors": Array [
    [GraphQLError: Request failed with status code 401],
  ],
}
```
The API key needs to be updated. To do this, it navigates to the AWS AppSync Settings tab. Copy the "Primary auth mode - API KEY" listed and paste it in the 'aws-exports.js' file in the Sanctuary Chat project. 


The following [tutorial](https://aws-amplify.github.io/amplify-js/api/globals.html#graphqloperation) step 4 - GraphQL API Operations details the placement of API keys and how they are required for any mutation, query, or subscription requests to the AWS Dynamo database. When creating the API at the beginning, the APIkey's lifetime can be set so it doesn't expire every 7 days per default.




**Testing locally using AWS Query Tab**
The AWS AppSync Queries tab can be used to send text messages to the app. It is recommended that the programmer first send a test message from app to database, then copy the payload into the query. Then swap the usernames in the 'to' and 'from' fields. 
An example of mutation:

```
// Used for creating text message, changing room settings, removing or adding members
mutation CreateMessage {
      createMessage(
        input:{
        to: "user1", 
          from: "AWS",
            payload:"INSERT PAYLOAD STRING HERE"
        }
      ) {
              	id
                to
    	        from
               payload 
      }
    }


// Used to check for public key for a certain user
query checkForPublicKey{
  listMessages(filter:{
    to:{eq:"key"}, 
    from:{eq:"user"},
  }){
    items {
      to 
      from  
      id 
      payload 
      
    }
  }
}


```


Payload format - also available in ```/src/payload.js```: 
```
{
    actionType: int 
    roomId: int 
    roomName: String
    roomMembers: [String]
    sender: String
    created: Date
    joiningMember: String
    leavingMember: String
    textContent: String
    newRoomName: String
}
```

## Frequently Asked Questions

**Q. What if I lost my phone?**

If you have the same phone number, the account can be recovered since on sign in, a verification code will be sent to the phone number on file. 

If the phone number is changed, you must be logged in (requiring verification from the original phone number) to change the phone number. 

Other member(s) in the chat room can send a backup copy of the room's chat history by going to the room's Settings page and pressing the "Send Backup" button at the bottom of the screen. 

Logging into account does not recover all previous conversations otherwise and usernames of other members are not remembered.


**Q. How do I create a group chat?**

To create a group chat, add the usernames separated by **commas** in the Recipients field of the Create Chat Room screen. 
ex. 
```
user1, user2, user3
```
You can also add or remove members from the group in settings

**Q. How do I leave a chat room?**

We wanted to allow users to remove chat history without being removed from the room. To remove yourself from the room, delete yourself from the members list in that room's settings

**Q. How do I delete rooms or room members?**

Swipe on the room or member you wish to remove and tap delete.


**Q. How do I recover my account if I lose my password?**
See `Password Recovery`



## Known Issues and Edge Cases

- **End-to-End Encryption (in group conversations)**
    - Since the Diffie-Hellman key exchange algorithm works only between a pair of keys (private and public), the only feasible way to implement the algorithm for group conversations would be to create shared keys per sender and recipient in the group, store shared keys, and then encrypt the same message separately. We did not have time to implement this and were not sure if this was scalable. 
- **Decrypting using old key (in personal conversations)**
    - We discovered that there is an edge case in the following scenario where a user would not be able to decrypt messages sent while they were offline:
    - ex. Bob sends some messages to Alice while she is offline. He then signs out and then back in. Whenever a user signs in, their pubic key is updated. Therefore, when Alice opens the app to retrieve the offline messages, she also needs to retrieve Bob's public key to decrypt. However, the messages have been encrypted with Bob's old public key and now cannot  be decrypted. 
    - A possible solution proposed by the team was to store the shared key and only update it after it has retrieved a message. However this does not work if there are multiple offline messages. 
- **Backups use sender's perspective**
    - Currently, receiving backups will not convert to the receiver's perspective. All messages are still labeled with names.



## Contact Information

#### LinkedIn Profiles
- [Jessica Cai](https://www.linkedin.com/in/jessica-cai-/)
- [Rahul George](https://www.linkedin.com/in/rahulmatgeorge/)
- [Richard Qin](https://www.linkedin.com/in/richardqin525/)
- [Cathy Wang](https://www.linkedin.com/in/cathy-wang16/)


Please email wallflowerdevs@gmail.com to contact the Wallflower team.


## Glossary

- **App** - The app is the Wallflower app, a social messaging app for making real friends. It is an Android mobile app built with React Native.

- **Users** - The user is a person who has created an account in our email and actively engages with the app to meet new people, message others, and take care of their virtual pet.

- **Handshake messaging** - We use this term to refer to only being able to see and send messages when both parties have consented/requested to message each other. 

- **Two-factor authentication** - Two factor authentication is a safety and security measure that requires a user to provide two kinds of secure tokens to login successfully. (e.g. password and phone number security code verification) 

- **End-to-end encryption** - A security method that keeps true messages hidden from any third party. Messages sent from a user are encrypted and messages received by a user must be decrypted to be read. This makes communications protected from Man-In-The-Middle (MITM) attacks.

- **MITM Attacks** - Situation where a perpetrator or unauthorized individual positions themselves between a user and an application, often resulting in stolen personal information. 

- **Virgil E3Kit** - The open source encryption library that we used to implement end-to-end encrypted messaging in our app.

- **GiftedChat** - A messaging chat UI package that we used to implement our basic messaging screen, later personalized for our app.

- **Android Studio** - The IDE that we used for Android development.

- **Amazon Web Services (AWS)** - A backend service which provides various microservices used in our app (see other AWS entries).

- **AWS Amplify** - This service allows us to build our mobile app using AWS services and DynamoDB database.

- **AWS AppSync** - This service allows us to use GraphQL operations to have our app communicate with our database. 

- **AWS Cognito** - This service handles two-factor authentication as well as creates user groups (pools) to limit access to features/databases.

- **Amazon DynamoDB** - A NoSQL database that we used to store user information in.


## Appendix 
- Secure and Private Social Media App Requirements v2.pdf 
