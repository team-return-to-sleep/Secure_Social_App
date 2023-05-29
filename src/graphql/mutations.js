/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      age
      region
      status
      interests {
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
      favoriteInterests {
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
      friends
      blockedUsers
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      message {
        items {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        nextToken
      }
      garden {
        id
        userID
        points
        flowerSize
        flowerOutfit
        user {
          id
          name
          imageUri
          age
          region
          status
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      sentNotifs {
        items {
          id
          toUserID
          fromUserID
          hasRead
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      age
      region
      status
      interests {
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
      favoriteInterests {
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
      friends
      blockedUsers
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      message {
        items {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        nextToken
      }
      garden {
        id
        userID
        points
        flowerSize
        flowerOutfit
        user {
          id
          name
          imageUri
          age
          region
          status
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      sentNotifs {
        items {
          id
          toUserID
          fromUserID
          hasRead
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      imageUri
      age
      region
      status
      interests {
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
      favoriteInterests {
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
      friends
      blockedUsers
      chatRoomUser {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      message {
        items {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        nextToken
      }
      garden {
        id
        userID
        points
        flowerSize
        flowerOutfit
        user {
          id
          name
          imageUri
          age
          region
          status
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      sentNotifs {
        items {
          id
          toUserID
          fromUserID
          hasRead
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoomUser = /* GraphQL */ `
  mutation CreateChatRoomUser(
    $input: CreateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    createChatRoomUser(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatRoomUser = /* GraphQL */ `
  mutation UpdateChatRoomUser(
    $input: UpdateChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    updateChatRoomUser(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatRoomUser = /* GraphQL */ `
  mutation DeleteChatRoomUser(
    $input: DeleteChatRoomUserInput!
    $condition: ModelChatRoomUserConditionInput
  ) {
    deleteChatRoomUser(input: $input, condition: $condition) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        userID
        chatRoomID
        content
        imageURL
        user {
          id
          name
          imageUri
          age
          region
          status
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        hasRead
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        userID
        chatRoomID
        content
        imageURL
        user {
          id
          name
          imageUri
          age
          region
          status
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        hasRead
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      chatRoomUsers {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        nextToken
      }
      lastMessageID
      lastMessage {
        id
        createdAt
        userID
        chatRoomID
        content
        imageURL
        user {
          id
          name
          imageUri
          age
          region
          status
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        chatRoom {
          id
          lastMessageID
          createdAt
          updatedAt
        }
        hasRead
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      createdAt
      userID
      chatRoomID
      content
      imageURL
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        createdAt
        updatedAt
      }
      hasRead
      updatedAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      createdAt
      userID
      chatRoomID
      content
      imageURL
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        createdAt
        updatedAt
      }
      hasRead
      updatedAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      createdAt
      userID
      chatRoomID
      content
      imageURL
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUsers {
          nextToken
        }
        messages {
          nextToken
        }
        lastMessageID
        lastMessage {
          id
          createdAt
          userID
          chatRoomID
          content
          imageURL
          hasRead
          updatedAt
        }
        createdAt
        updatedAt
      }
      hasRead
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      toUserID
      fromUserID
      fromUser {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      hasRead
      content
      createdAt
      updatedAt
    }
  }
`;
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
      id
      toUserID
      fromUserID
      fromUser {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      hasRead
      content
      createdAt
      updatedAt
    }
  }
`;
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
      id
      toUserID
      fromUserID
      fromUser {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      hasRead
      content
      createdAt
      updatedAt
    }
  }
`;
export const createGarden = /* GraphQL */ `
  mutation CreateGarden(
    $input: CreateGardenInput!
    $condition: ModelGardenConditionInput
  ) {
    createGarden(input: $input, condition: $condition) {
      id
      userID
      points
      flowerSize
      flowerOutfit
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const updateGarden = /* GraphQL */ `
  mutation UpdateGarden(
    $input: UpdateGardenInput!
    $condition: ModelGardenConditionInput
  ) {
    updateGarden(input: $input, condition: $condition) {
      id
      userID
      points
      flowerSize
      flowerOutfit
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const deleteGarden = /* GraphQL */ `
  mutation DeleteGarden(
    $input: DeleteGardenInput!
    $condition: ModelGardenConditionInput
  ) {
    deleteGarden(input: $input, condition: $condition) {
      id
      userID
      points
      flowerSize
      flowerOutfit
      user {
        id
        name
        imageUri
        age
        region
        status
        interests {
          nextToken
        }
        favoriteInterests {
          nextToken
        }
        friends
        blockedUsers
        chatRoomUser {
          nextToken
        }
        message {
          nextToken
        }
        garden {
          id
          userID
          points
          flowerSize
          flowerOutfit
          createdAt
          updatedAt
        }
        sentNotifs {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const createInterest = /* GraphQL */ `
  mutation CreateInterest(
    $input: CreateInterestInput!
    $condition: ModelInterestConditionInput
  ) {
    createInterest(input: $input, condition: $condition) {
      id
      userID
      categoryName
      specificNames
      createdAt
      updatedAt
    }
  }
`;
export const updateInterest = /* GraphQL */ `
  mutation UpdateInterest(
    $input: UpdateInterestInput!
    $condition: ModelInterestConditionInput
  ) {
    updateInterest(input: $input, condition: $condition) {
      id
      userID
      categoryName
      specificNames
      createdAt
      updatedAt
    }
  }
`;
export const deleteInterest = /* GraphQL */ `
  mutation DeleteInterest(
    $input: DeleteInterestInput!
    $condition: ModelInterestConditionInput
  ) {
    deleteInterest(input: $input, condition: $condition) {
      id
      userID
      categoryName
      specificNames
      createdAt
      updatedAt
    }
  }
`;
