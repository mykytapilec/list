import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import bodyParser from 'body-parser';
import { buildSchema } from 'type-graphql';
import { AuthResolver } from '@shared/resolvers/AuthResolver';

async function start() {
  const schema = await buildSchema({
    resolvers: [AuthResolver],
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

  app.listen(4001, () => {
    console.log('✅ Auth service ready at http://localhost:4001/graphql');
  });
}

start();
