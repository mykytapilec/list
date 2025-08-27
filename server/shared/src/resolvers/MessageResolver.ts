import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Message } from "../entities/Message";
import { Chat } from "../entities/Chat";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

@Resolver(Message)
export class MessageResolver {
  constructor(private dataSource: DataSource) {}

  @Query(() => [Message])
  async messages(): Promise<Message[]> {
    return this.dataSource.getRepository(Message).find({ relations: ["chat", "author"] });
  }

  @Mutation(() => Message)
  async createMessage(
    @Arg("text") text: string,
    @Arg("chatId") chatId: number,
    @Arg("authorId") authorId: number
  ): Promise<Message> {
    const messageRepo = this.dataSource.getRepository(Message);
    const chatRepo = this.dataSource.getRepository(Chat);
    const userRepo = this.dataSource.getRepository(User);

    const chat = await chatRepo.findOneBy({ id: chatId });
    const author = await userRepo.findOneBy({ id: authorId });

    if (!chat || !author) throw new Error("Chat or author not found");

    const message = messageRepo.create({ text, chat, author });
    return messageRepo.save(message);
  }
}
