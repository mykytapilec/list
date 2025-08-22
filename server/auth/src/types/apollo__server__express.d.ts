declare module "@apollo/server/express" {
  import { RequestHandler } from "express";
  import { ApolloServer } from "@apollo/server";

  export function expressMiddleware(server: ApolloServer): RequestHandler;
}
