import { Field, ID, ObjectType } from "type-graphql";
import { Entity, PrimaryColumn, Column } from "typeorm";

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryColumn()
  id!: string;

  @Field()
  @Column()
  email!: string;

  @Field()
  @Column()
  password!: string;
}
