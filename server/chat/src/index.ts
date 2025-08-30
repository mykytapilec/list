import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import cors from 'cors';
import bodyParser from 'body-parser';
import { buildSchema } from 'type-graphql';
import { ChatResolver } from '@shared/resolvers/ChatResolver';
import { expressMiddleware } from '@apollo/server/express4';

async function start() {
  const schema = await buildSchema({
    resolvers: [ChatResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    expressMiddleware(server),
  );

  app.listen(4002, () => {
    console.log('✅ Chat service ready at http://localhost:4002/graphql');
  });
}

start();
