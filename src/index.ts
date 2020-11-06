import "reflect-metadata";
import express from "express";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";

const PORT = process.env.PORT || 4000;

const main = async () => {
  const app = express();

  app.get("/", (_, res) => {
    res.send("API server up and running.");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false,
    }),
    context: ({ req, res }) => {
      return {
        req,
        res,
      };
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.error(error);
});
