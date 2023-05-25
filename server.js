import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import apiRoute from "./src/router/apiRoute.js";
import apiUserRoute from "./src/router/apiUserRoute.js";
import apiItemRouter from "./src/router/apiItemRoute.js";
import "./db.js";
import path from "path";
import apiMassageRoute from "./src/router/apiMassageRoute.js";

const dirName = process.cwd();
const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "100mb" }));

app.use(express.static(path.join(process.cwd() + "/public")));

httpServer.listen(process.env.PORT, () =>
  console.log(`server on prot ${process.env.PORT}`)
);

//Socket.io 시작
const ws = new Server(httpServer, {
  cors: {
    origin: "*",
    mathods: ["GET", "POST"],
  },
});

ws.on("connection", (socket) => {
  console.log("Socket Conneted");
  socket.on("send_message", (msg) => {
    socket.emit("receive_message", msg.message);
  });
  socket.on("user_enter", (user) => {
    console.log(user);
  });
});

// 프론트 끝나고 활성화
// app.use(express.static(path.join(process.cwd(), "./src/client")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "./src/client/index.html"));
// });

app.use("/api", apiRoute);
app.use("/user/api", apiUserRoute);
app.use("/item/api", apiItemRouter);
app.use("/message/api", apiMassageRoute);
