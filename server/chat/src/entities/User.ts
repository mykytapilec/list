import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Chat } from "./Chat";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Chat])
  @ManyToMany(() => Chat, (chat) => chat.users)
  chats!: Chat[];

  @OneToMany(() => Message, (message) => message.sender)
  messages!: Message[];
}
