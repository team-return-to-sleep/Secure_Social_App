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
      interests
      favoriteInterests
      friends
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
          updatedAt
        }
        nextToken
      }
      garden {
        id
        userID
        points
        flowerSize
        user {
          id
          name
          imageUri
          age
          region
          status
          interests
          favoriteInterests
          friends
          createdAt
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      name
      imageUri
      age
      region
      status
      interests
      favoriteInterests
      friends
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
          updatedAt
        }
        nextToken
      }
      garden {
        id
        userID
        points
        flowerSize
        user {
          id
          name
          imageUri
          age
          region
          status
          interests
          favoriteInterests
          friends
          createdAt
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      name
      imageUri
      age
      region
      status
      interests
      favoriteInterests
      friends
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
          updatedAt
        }
        nextToken
      }
      garden {
        id
        userID
        points
        flowerSize
        user {
          id
          name
          imageUri
          age
          region
          status
          interests
          favoriteInterests
          friends
          createdAt
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
        interests
        favoriteInterests
        friends
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
          createdAt
          updatedAt
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
        interests
        favoriteInterests
        friends
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
          createdAt
          updatedAt
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
        interests
        favoriteInterests
        friends
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
          createdAt
          updatedAt
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
          updatedAt
        }
        nextToken
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
          updatedAt
        }
        nextToken
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
          updatedAt
        }
        nextToken
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
      user {
        id
        name
        imageUri
        age
        region
        status
        interests
        favoriteInterests
        friends
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
          createdAt
          updatedAt
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
        createdAt
        updatedAt
      }
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
      user {
        id
        name
        imageUri
        age
        region
        status
        interests
        favoriteInterests
        friends
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
          createdAt
          updatedAt
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
        createdAt
        updatedAt
      }
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
      user {
        id
        name
        imageUri
        age
        region
        status
        interests
        favoriteInterests
        friends
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
          createdAt
          updatedAt
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
        createdAt
        updatedAt
      }
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
      user {
        id
        name
        imageUri
        age
        region
        status
        interests
        favoriteInterests
        friends
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
          createdAt
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
export const onUpdateGarden = /* GraphQL */ `
  subscription OnUpdateGarden($filter: ModelSubscriptionGardenFilterInput) {
    onUpdateGarden(filter: $filter) {
      id
      userID
      points
      flowerSize
      user {
        id
        name
        imageUri
        age
        region
        status
        interests
        favoriteInterests
        friends
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
          createdAt
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
export const onDeleteGarden = /* GraphQL */ `
  subscription OnDeleteGarden($filter: ModelSubscriptionGardenFilterInput) {
    onDeleteGarden(filter: $filter) {
      id
      userID
      points
      flowerSize
      user {
        id
        name
        imageUri
        age
        region
        status
        interests
        favoriteInterests
        friends
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
          createdAt
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
