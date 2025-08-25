import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Chat } from "@shared/entities/Chat";
import { AppDataSource } from "../data-source";
import { User } from "@shared/entities/User";
import { Message } from "@shared/entities/Message";

@Resolver(() => Chat)
export class ChatResolver {
  @Query(() => [Chat])
  async chats(): Promise<Chat[]> {
    return AppDataSource.getRepository(Chat).find({
      relations: ["users", "messages"],
    });
  }

  @Mutation(() => Chat)
  async createChat(
    @Arg("title") title: string,
    @Arg("userIds", () => [String]) userIds: string[]
  ): Promise<Chat> {
    const users = await AppDataSource.getRepository(User).findByIds(userIds);
    const chat = AppDataSource.getRepository(Chat).create({ title, users });
    return AppDataSource.getRepository(Chat).save(chat);
  }
}
