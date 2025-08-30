import { Resolver, Query, Mutation, Arg, ObjectType, Field } from "type-graphql";

@ObjectType()
class AuthResponse {
  @Field()
  token!: string;

  @Field()
  userId!: string;
}

@Resolver()
export class AuthResolver {
  @Query(() => String)
  authPing(): string {
    return "Auth service is alive!";
  }

  @Mutation(() => AuthResponse)
  login(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): AuthResponse {
    return {
      token: "mock-jwt-token",
      userId: "user-123",
    };
  }
}
