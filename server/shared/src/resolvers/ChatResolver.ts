import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Chat } from "../entities/Chat";
import { User } from "../entities/User";
import { DataSource } from "typeorm";

@Resolver(Chat)
export class ChatResolver {
  constructor(private dataSource: DataSource) {}

  @Query(() => [Chat])
  async chats(): Promise<Chat[]> {
    return this.dataSource.getRepository(Chat).find({ relations: ["users", "messages"] });
  }

  @Mutation(() => Chat)
  async createChat(@Arg("name") name: string, @Arg("userIds", () => [Number]) userIds: number[]): Promise<Chat> {
    const chatRepo = this.dataSource.getRepository(Chat);
    const userRepo = this.dataSource.getRepository(User);

    const users = await userRepo.findByIds(userIds);
    const chat = chatRepo.create({ name, users });
    return chatRepo.save(chat);
  }
}
