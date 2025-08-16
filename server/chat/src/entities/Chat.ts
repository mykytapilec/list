import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@ObjectType()
@Entity()
export class Chat {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users!: User[];

  @Field(() => [Message])
  @OneToMany(() => Message, (message) => message.chat)
  messages!: Message[];
}
