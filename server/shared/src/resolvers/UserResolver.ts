import { Resolver, Query, Arg } from "type-graphql";
import { AppDataSource } from "../data-source";
import { User } from "../entities/User";

@Resolver(() => User)
export class UserResolver {
  private userRepo = AppDataSource.getRepository(User);

  @Query(() => User, { nullable: true })
  async user(@Arg("id") id: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { id: id.toString() },
    });
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userRepo.find();
  }
}
