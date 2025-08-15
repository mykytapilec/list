import { Resolver, Query, ObjectType, Field } from "type-graphql";

@ObjectType()
class AuthResponse {
  @Field()
  message!: string;
}

@Resolver()
export class AuthResolver {
  @Query(() => AuthResponse)
  async testAuth(): Promise<AuthResponse> {
    return { message: "Auth service is working!" };
  }
}
