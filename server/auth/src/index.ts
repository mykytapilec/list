import "reflect-metadata";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { AppDataSource } from "@shared/data-source";
import { UserResolver } from "@shared/resolvers/UserResolver";
import { buildSchema } from "type-graphql";

async function startAuth() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    validate: false,
  });

  const server = new ApolloServer({
    schema,
  });
  await server.start();

  const app = express();
  app.use(cors());
  app.use(json());

  app.use("/graphql", expressMiddleware(server));

  const PORT = 4001;
  app.listen(PORT, () => {
    console.log(`🚀 Auth running on http://localhost:${PORT}/graphql`);
  });
}

startAuth().catch((err) => {
  console.error("Error starting auth:", err);
});
