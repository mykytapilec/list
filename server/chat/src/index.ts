import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
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

  app.post("/graphql", async (req, res) => {
    const result = await server.executeOperation({
      query: req.body.query,
      variables: req.body.variables,
    });
    res.json(result);
  });

  app.listen(4002, () => {
    console.log("🚀 Chat service running at http://localhost:4002/graphql");
  });
}

startChat();
