import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from "typeorm";
import { Chat } from "./Chat";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Column() // 👈 не выводим в GraphQL
  password!: string;

  @Field(() => [Chat])
  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats!: Chat[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.user)
  messages!: Message[];
}
