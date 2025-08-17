import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { ChatResolver } from "@shared/resolvers/ChatResolver";
import { MessageResolver } from "@shared/resolvers/MessageResolver";

async function startChat() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const schema = await buildSchema({
    resolvers: [ChatResolver, MessageResolver],
  });

  const server = new ApolloServer({ schema });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(4002, () => {
    console.log("🚀 Chat service running at http://localhost:4002/graphql");
  });
}

startChat();
