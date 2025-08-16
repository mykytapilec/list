// src/resolvers/ChatResolver.ts
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Chat } from "../entities/Chat";
import { AppDataSource } from "../data-source";

@Resolver(Chat)
export class ChatResolver {
  private chatRepo = AppDataSource.getRepository(Chat);

  @Query(() => [Chat])
  chats() {
    return this.chatRepo.find({ relations: ["users", "messages"] });
  }

  @Mutation(() => Chat)
  async createChat(@Arg("title") title: string) {
    const chat = this.chatRepo.create({ title });
    return this.chatRepo.save(chat);
  }
}
