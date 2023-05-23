/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
          chatRoom {
            chatRoomUsers {
                items {
                    id
                    chatRoomID
                    userID
                }
            }
          }
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
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoomUser = /* GraphQL */ `
  query GetChatRoomUser($id: ID!) {
    getChatRoomUser(id: $id) {
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
export const listChatRoomUsers = /* GraphQL */ `
  query ListChatRoomUsers(
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGarden = /* GraphQL */ `
  query GetGarden($id: ID!) {
    getGarden(id: $id) {
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listGardens = /* GraphQL */ `
  query ListGardens(
    $filter: ModelGardenFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGardens(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getInterest = /* GraphQL */ `
  query GetInterest($id: ID!) {
    getInterest(id: $id) {
      id
      userID
      categoryName
      specificNames
      createdAt
      updatedAt
    }
  }
`;
export const listInterests = /* GraphQL */ `
  query ListInterests(
    $filter: ModelInterestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterests(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const chatRoomUsersByUserIDAndChatRoomID = /* GraphQL */ `
  query ChatRoomUsersByUserIDAndChatRoomID(
    $userID: ID!
    $chatRoomID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomUsersByUserIDAndChatRoomID(
      userID: $userID
      chatRoomID: $chatRoomID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const chatRoomUsersByUserID = /* GraphQL */ `
  query ChatRoomUsersByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomUsersByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const chatRoomUsersByChatRoomIDAndUserID = /* GraphQL */ `
  query ChatRoomUsersByChatRoomIDAndUserID(
    $chatRoomID: ID!
    $userID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    chatRoomUsersByChatRoomIDAndUserID(
      chatRoomID: $chatRoomID
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          friends
          blockedUsers
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByUser = /* GraphQL */ `
  query MessagesByUser(
    $userID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByUser(
      userID: $userID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByChatRoom = /* GraphQL */ `
  query MessagesByChatRoom(
    $chatRoomID: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoom(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const interestsByUserID = /* GraphQL */ `
  query InterestsByUserID(
    $userID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelInterestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interestsByUserID(
      userID: $userID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
