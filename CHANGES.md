  ```
 type Query {
    users: [User!]
    user(id: ID!): User
    currentUser: User!
    forums: [Forum!]
    forum(id: ID!): Forum
    askRequests: [AskRequest!]
  }

  type Mutation {
    seed: String!
    createForum(name: String!): Forum!
    joinForum(id: ID!): String!
    postMessage(forum_id: ID!, text: String!): String!
    createAskRequest(forum_id: ID!)
    processAskRequest(id: ID!, accept: Boolean!)
  }

  type User {
    id: ID!
    name: String!
    picture: String
    forums: [Forum!]
  }

  type Forum {
    id: ID!
    name: String!
    users: [User!]
    messages: [Message!]
    isPrivate: Boolean!
    creator: User!
  }

  type Message {
    id: ID!
    text: String!
    author: User!
    sendingTime: String!
  }
  
  type AskRequest {
    id: ID!
    forum: Forum!
    requester: User!
    processed: Boolean!
  }
  ```