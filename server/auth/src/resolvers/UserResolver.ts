import { Resolver, Query } from "type-graphql";
import { User } from "@shared/entities/User";
import { AppDataSource } from "../data-source";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.find({ relations: ["chats", "messages"] });
  }
}
