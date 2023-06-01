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
import { saveMessages } from "./src/controller/apiMessageController.js";

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
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    mathods: ["GET", "POST"],
  },
});
let chatLog = [];
let roomId;

io.on("connection", async (socket) => {
  socket["userName"] = socket.handshake.query.userName;
  roomId = socket.handshake.query.roomId;
  const isEmpty = io.sockets.adapter.rooms?.get(roomId);
  socket.join(roomId);

  socket.on("send_message", (msg) => {
    const message = `${socket["userName"]} : ${msg.message}`;
    chatLog.push(message);
    console.log("1", chatLog);
    socket.to(roomId).emit("receive_message", message);
  });
  socket.on("disconnect", (done) => {
    console.log(isEmpty);
    if (!isEmpty || isEmpty.size === 0) {
      console.log("비었당");
      saveMessages(roomId, chatLog);
      chatLog = [];
    }
  });
});

//프론트 코드 브라우저로 보내기
// app.use(express.static(path.join(process.cwd(), "./src/client")));
// app.get("/*", (req, res) => {
//   res.sendFile(path.join(process.cwd(), "./src/client/index.html"));
// });

app.use("/api", apiRoute);
app.use("/user/api", apiUserRoute);
app.use("/item/api", apiItemRouter);
app.use("/message/api", apiMassageRoute);
