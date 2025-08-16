// src/resolvers/MessageResolver.ts
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Message } from "../entities/Message";
import { Chat } from "../entities/Chat";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

@Resolver(Message)
export class MessageResolver {
  private messageRepo = AppDataSource.getRepository(Message);
  private chatRepo = AppDataSource.getRepository(Chat);
  private userRepo = AppDataSource.getRepository(User);

  // Получить все сообщения чата
  @Query(() => [Message])
  async messages(@Arg("chatId") chatId: string) {
    return this.messageRepo.find({
      where: { chat: { id: chatId } },
      relations: ["sender", "chat"],
      order: { createdAt: "ASC" },
    });
  }

  // Создать новое сообщение
  @Mutation(() => Message)
  async sendMessage(
    @Arg("chatId") chatId: string,
    @Arg("userId") userId: string,
    @Arg("text") text: string
  ) {
    const chat = await this.chatRepo.findOneBy({ id: chatId });
    if (!chat) throw new Error("Chat not found");

    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");

    const message = this.messageRepo.create({ text, chat, sender: user });
    return this.messageRepo.save(message);
  }
}
