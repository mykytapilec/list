import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { AppDataSource } from "@shared/data-source";
import { UserResolver } from "@shared/resolvers/UserResolver";
import { ChatResolver } from "@shared/resolvers/ChatResolver";
import { MessageResolver } from "@shared/resolvers/MessageResolver";

import { buildSchema } from "type-graphql";

async function startGateway() {
  await AppDataSource.initialize();
  console.log("Data source initialized");

  const schema = await buildSchema({
    resolvers: [UserResolver, ChatResolver, MessageResolver],
    validate: false,
  });

  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  app.use(cors());
  app.use(express.json());

  app.use("/graphql", expressMiddleware(server));

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Gateway running on http://localhost:${PORT}/graphql`);
  });
}

startGateway().catch((err) => {
  console.error("Error starting gateway:", err);
});
