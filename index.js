import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { dbConnection } from "./lib/connect.js";
import { router } from "./Routing/router.js";

dotenv.config();

dbConnection();

const server = express();

server.use(
  cors({
    origin: "https://game-store-front-end-tlum.vercel.app",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })
);

server.use(express.json());
server.use(cookieParser());
server.use(router);
server.use("/uploads", express.static("./uploads"));

const port = 4000 || process.env.PORT;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.get("/", (req, res) => {
  res.send(`<h1>Server is online.</h1>`);
});
