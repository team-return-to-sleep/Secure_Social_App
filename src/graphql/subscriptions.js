/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateChatRoomUser = /* GraphQL */ `
  subscription OnCreateChatRoomUser(
    $filter: ModelSubscriptionChatRoomUserFilterInput
  ) {
    onCreateChatRoomUser(filter: $filter) {
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
export const onUpdateChatRoomUser = /* GraphQL */ `
  subscription OnUpdateChatRoomUser(
    $filter: ModelSubscriptionChatRoomUserFilterInput
  ) {
    onUpdateChatRoomUser(filter: $filter) {
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
export const onDeleteChatRoomUser = /* GraphQL */ `
  subscription OnDeleteChatRoomUser(
    $filter: ModelSubscriptionChatRoomUserFilterInput
  ) {
    onDeleteChatRoomUser(filter: $filter) {
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
export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onCreateNotification(filter: $filter) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onUpdateNotification(filter: $filter) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification(
    $filter: ModelSubscriptionNotificationFilterInput
  ) {
    onDeleteNotification(filter: $filter) {
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
export const onCreateGarden = /* GraphQL */ `
  subscription OnCreateGarden($filter: ModelSubscriptionGardenFilterInput) {
    onCreateGarden(filter: $filter) {
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
export const onUpdateGarden = /* GraphQL */ `
  subscription OnUpdateGarden($filter: ModelSubscriptionGardenFilterInput) {
    onUpdateGarden(filter: $filter) {
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
export const onDeleteGarden = /* GraphQL */ `
  subscription OnDeleteGarden($filter: ModelSubscriptionGardenFilterInput) {
    onDeleteGarden(filter: $filter) {
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
export const onCreateInterest = /* GraphQL */ `
  subscription OnCreateInterest($filter: ModelSubscriptionInterestFilterInput) {
    onCreateInterest(filter: $filter) {
      id
      userID
      categoryName
      specificNames
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateInterest = /* GraphQL */ `
  subscription OnUpdateInterest($filter: ModelSubscriptionInterestFilterInput) {
    onUpdateInterest(filter: $filter) {
      id
      userID
      categoryName
      specificNames
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteInterest = /* GraphQL */ `
  subscription OnDeleteInterest($filter: ModelSubscriptionInterestFilterInput) {
    onDeleteInterest(filter: $filter) {
      id
      userID
      categoryName
      specificNames
      createdAt
      updatedAt
    }
  }
`;
