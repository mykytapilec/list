import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Chat } from "./Chat";
import { User } from "./User";

@ObjectType()
@Entity()
export class Message {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  text!: string;

  @Field(() => Chat)
  @ManyToOne(() => Chat, chat => chat.messages)
  chat!: Chat;

  @Field(() => User)
  @ManyToOne(() => User)
  author!: User;
}
