import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSchema } from "type-graphql";
import { UserResolver } from "@shared/resolvers/UserResolver";

async function startAuth() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });
  await server.start();

  app.use("/graphql", expressMiddleware(server));

  app.listen(4001, () => {
    console.log("🚀 Auth service running at http://localhost:4001/graphql");
  });
}

startAuth();
