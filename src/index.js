const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const DB_HOST = process.env.DB_HOST;
const port = process.env.PORT || 4000;

const app = express();
app.use(helmet());
app.use(cors());

db.connect(DB_HOST);

//아폴로 서버 설정
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: () => {
    return { models };
  } 
});

//아폴로 그래프QL 미들웨어를 적용, 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
