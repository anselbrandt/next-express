import { Ctx, Resolver, Query, Subscription } from "type-graphql";

@Resolver()
export class HelloResolver {
  @Query(() => String)
  async hello(@Ctx() ctx: any) {
    await ctx.req.pubsub.publish("MESSAGES");
    return "hello";
  }

  @Subscription(() => String, {
    topics: "MESSAGES",
  })
  async subscription(): Promise<any> {
    return "User query";
  }
}
