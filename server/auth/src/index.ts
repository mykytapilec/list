import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AuthResolver } from "./resolvers/AuthResolver";

async function main() {
  const app = express() as any;

  const schema = await buildSchema({
    resolvers: [AuthResolver],
    validate: false
  });

  const server = new ApolloServer({ schema });
  await server.start();

  server.applyMiddleware({ app, path: "/graphql" });

  const PORT = 4000;
  app.listen(PORT, () => console.log(`Server ready at http://localhost:${PORT}/graphql`));
}

main().catch(console.error);
