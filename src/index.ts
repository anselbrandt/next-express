import "reflect-metadata";
import express from "express";
import cors from "cors";
import http from "http";
import Redis from "ioredis";
import { RedisPubSub } from "graphql-redis-subscriptions";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const PORT = process.env.PORT || 4000;
const REDIS_URL = process.env.REDIS_URL || `127.0.0.1:6379`;

const main = async () => {
  const redis = new Redis(REDIS_URL);

  const pubsub = new RedisPubSub({
    publisher: new Redis(REDIS_URL),
    subscriber: new Redis(REDIS_URL),
  });

  const app = express();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use((req: any, _, next: any) => {
    req.pubsub = pubsub;
    next();
  });

  app.get("/", (_, res) => {
    res.send("Nothing to see here.");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      pubSub: pubsub,
      validate: false,
    }),
    context: ({ req, res }) => {
      return {
        req,
        res,
        redis,
        pubsub,
      };
    },
    subscriptions: {
      async onConnect(_, webSocket: any) {
        console.log(
          "connected: ",
          webSocket.upgradeReq.headers["sec-websocket-key"]
        );
      },
      async onDisconnect(webSocket: any) {
        console.log(
          "disconnected: ",
          webSocket.upgradeReq.headers["sec-websocket-key"]
        );
      },
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = http.createServer(app);

  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.error(error);
});
