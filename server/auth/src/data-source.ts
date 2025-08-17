import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "@shared/entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "auth.sqlite",
  synchronize: true, // автоматически создает таблицы
  logging: true,
  entities: [User],
  migrations: [],
  subscribers: [],
});
