// server/gateway/src/index.ts
import "reflect-metadata";
import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express";

import { AppDataSource } from "@shared/data-source";
import { UserResolver } from "@shared/resolvers/UserResolver";
import { ChatResolver } from "@shared/resolvers/ChatResolver";
import { MessageResolver } from "@shared/resolvers/MessageResolver";

import { buildSchema } from "type-graphql";

async function startGateway() {
  // Инициализация базы данных
  await AppDataSource.initialize();
  console.log("Data source initialized");

  // Создание схемы GraphQL с резолверами
  const schema = await buildSchema({
    resolvers: [UserResolver, ChatResolver, MessageResolver],
    validate: false,
  });

  // Создание ApolloServer
  const server = new ApolloServer({ schema });

  await server.start();

  // Создание Express приложения
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Подключаем middleware ApolloServer
  app.use("/graphql", expressMiddleware(server));

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Gateway running on http://localhost:${PORT}/graphql`);
  });
}

startGateway().catch((err) => {
  console.error("Error starting gateway:", err);
});
