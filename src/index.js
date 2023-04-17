const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();
const helmet = require('helmet');
const cors = require('cors');

const jwt = require('jsonwebtoken');

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

const getUser = token => {
  if (token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error('Session invalid');
    }
  }
};

//아폴로 서버 설정
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization;
    const user = getUser(token);
    console.log('user', user);
    return { models, user };
  }
});

//아폴로 그래프QL 미들웨어를 적용, 경로를 /api로 설정
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () => {
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  );
});
