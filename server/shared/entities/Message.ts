import { ObjectType, Field, ID } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import { User } from "./User";
import { Chat } from "./Chat";

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Field(() => String)
  @Column()
  text!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.messages)
  user!: User;

  @Field(() => Chat)
  @ManyToOne(() => Chat, (chat) => chat.messages)
  chat!: Chat;
}
