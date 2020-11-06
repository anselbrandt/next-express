import {
  Ctx,
  ObjectType,
  Field,
  Resolver,
  Query,
  Subscription,
} from "type-graphql";

@ObjectType()
class Status {
  @Field()
  status: string;
}

@Resolver()
export class HelloResolver {
  @Query(() => Status)
  async hello(@Ctx() ctx: any) {
    await ctx.req.pubsub.publish("MESSAGES");
    const status = { status: "GraphQL server up and running." };
    return status;
  }

  @Subscription(() => String, {
    topics: "MESSAGES",
  })
  async subscription(): Promise<any> {
    return "User query";
  }
}
