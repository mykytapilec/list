// src/resolvers/UserResolver.ts
import { Resolver, Query } from "type-graphql";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

@Resolver(User)
export class UserResolver {
  private userRepo = AppDataSource.getRepository(User);

  @Query(() => [User])
  users() {
    return this.userRepo.find({ relations: ["chats", "messages"] });
  }
}
