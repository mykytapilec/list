import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Chat } from "./Chat";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Chat])
  @ManyToMany(() => Chat, (chat) => chat.users)
  @JoinTable()
  chats!: Chat[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.sender)
  messages!: Message[];
}
