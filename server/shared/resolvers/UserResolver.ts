import { Resolver, Query, Arg } from "type-graphql";
import { User } from "@shared/entities/User";
import { AppDataSource } from "../data-source";

@Resolver(() => User)
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    // Возвращаем всех пользователей с их чатами
    return AppDataSource.getRepository(User).find({
      relations: ["chats"],
    });
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string): Promise<User | null> {
    return AppDataSource.getRepository(User).findOne({
      where: { id: Number(id) },
      relations: ["chats", "messages"],
    });
  }
}
