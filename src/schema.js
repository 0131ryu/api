const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar DateTime

  type Note {
    id: ID!
    content: String!
    author: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
  }

  type Query {
    notes: [Note!]!
    note(id: ID): Note!
    noteFeed(cursor: String): NoteFeed
  }

  type Mutation {
    newNote(content: String!): Note
    updateNote(id: ID!, content: String!): Note!
    deleteNote(id: ID!): Boolean!
  }
`;
