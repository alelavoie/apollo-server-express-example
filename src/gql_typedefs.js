import { gql } from "apollo-server-express";

// Construct a schema, using GraphQL schema language
export default gql`
  type Query {
    users: [User!]
    user(id: ID!): User
    currentUser: User!
    forums: [Forum!]
    forum(id: ID!): Forum
  }

  type Mutation {
    seed: String!
    createForum(name: String!): Forum!
    joinForum(id: ID!): String!
    postMessage(forum_id: ID!, text: String!): String!
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
  }

  type Message {
    id: ID!
    text: String!
    author: User!
    sendingTime: String!
  }
`;
