import express from "express";
import http from "http";

const PORT = process.env.PORT || 4000;

const main = async () => {
  const app = express();

  app.get("/", (_, res) => {
    res.send("API server up and running.");
  });

  const httpServer = http.createServer(app);

  httpServer.listen(PORT, () => {
    console.log(`server started on localhost:${PORT}`);
  });
};

main().catch((error) => {
  console.error(error);
});
