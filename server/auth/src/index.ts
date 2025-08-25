import "reflect-metadata";
import { AppDataSource } from "@shared/data-source";
import { UserResolver } from "@shared/resolvers/UserResolver";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";

async function bootstrap() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [UserResolver],
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen(4000);
  console.log(`🚀 Server ready at ${url}`);
}

bootstrap();
