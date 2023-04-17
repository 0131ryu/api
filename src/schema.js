const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: User!
    favoriteCount: Int!
    favoritedBy: [User!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

<<<<<<< HEAD
  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
=======
  type User {
    id: ID!
    username: String!
    email: String!
    favorites: [Note!]!
    avatar: String
    notes: [Note!]!
>>>>>>> d7c2773d8cf6bad798cde65e19d56986154f97ac
  }

  type Query {
    notes: [Note!]!
    note(id: ID): Note!
<<<<<<< HEAD
    noteFeed(cursor: String): NoteFeed
=======
    user(username: String!): User
    users: [User!]!
    me: User!
>>>>>>> d7c2773d8cf6bad798cde65e19d56986154f97ac
  }

  type Mutation {
    newNote(content: String!): Note
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
    toggleFavorite(id: ID!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String, email: String, password: String!): String!
  }
`;
