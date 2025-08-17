import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@shared/entities/User";
import { Chat } from "@shared/entities/Chat";
import { Message } from "@shared/entities/Message";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "chat.sqlite",
  synchronize: true, // автоматически создает таблицы
  logging: true,
  entities: [User, Chat, Message],
  migrations: [],
  subscribers: [],
});
