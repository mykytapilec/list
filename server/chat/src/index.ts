import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data-source";
import { ChatResolver } from "./resolvers/ChatResolver";
import { MessageResolver } from "./resolvers/MessageResolver";
import { UserResolver } from "./resolvers/UserResolver";


async function main() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [ChatResolver, MessageResolver, UserResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  server.applyMiddleware({ app: app as any }); // решение конфликта типов

  app.listen(4000, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
}

main().catch((err) => console.error(err));
