import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Message } from "@shared/entities/Message";
import { AppDataSource } from "../data-source";
import { Chat } from "@shared/entities/Chat";
import { User } from "@shared/entities/User";

@Resolver(() => Message)
export class MessageResolver {
  @Query(() => [Message])
  async messages(@Arg("chatId") chatId: string): Promise<Message[]> {
    return AppDataSource.getRepository(Message).find({
      where: { chat: { id: Number(chatId) } },
      relations: ["chat", "sender"],
    });
  }

  @Mutation(() => Message)
  async sendMessage(
    @Arg("chatId") chatId: string,
    @Arg("senderId") senderId: string,
    @Arg("text") text: string
  ): Promise<Message> {
    const chat = await AppDataSource.getRepository(Chat).findOneBy({ id: Number(chatId) });
    const sender = await AppDataSource.getRepository(User).findOneBy({ id: Number(senderId) });
    if (!chat || !sender) throw new Error("Chat or user not found");

    const message = AppDataSource.getRepository(Message).create({
      chat,
      sender,
      text,
      createdAt: new Date(),
    });

    return AppDataSource.getRepository(Message).save(message);
  }
}
