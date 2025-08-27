import "reflect-metadata";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from "@apollo/server";
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

  app.post("/graphql", async (req, res) => {
    const result = await server.executeOperation({
      query: req.body.query,
      variables: req.body.variables,
    });
    res.json(result);
  });

  app.listen(4001, () => {
    console.log("🚀 Auth service running at http://localhost:4001/graphql");
  });
}

startAuth();
