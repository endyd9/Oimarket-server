import "dotenv/config";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import rootRoute from "./src/router/rootRoute.js";
import userRoute from "./src/router/userRoute.js";
import itemRouter from "./src/router/itemRoute.js";
import "./db.js";
import path from "path";
import messageRoute from "./src/router/massageRoute.js";
import { saveMessages } from "./src/controller/messageController.js";
import cors from "cors";

const app = express();
export const httpServer = http.createServer(app);

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://endyd9.github.io",
      "https://endyd9.github.io/OiMarket-client/",
    ],
    credentials: true,
  })
);

// app.use((req, res, next) => {
//   res.header("Cross-Origin-Embedder-Policy", "credentialless");
//   res.header("Access-Control-Allow-Origin", [
//     "http://localhost:3000/",
//     "https://endyd9.github.io/OiMarket-client/",
//     "https://endyd9.github.io/",
//   ]);
//   next();
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));

app.use(express.static(path.join(process.cwd() + "/public")));

httpServer.listen(process.env.PORT, () =>
  console.log(`server on prot ${process.env.PORT}`)
);

// Socket.io 시작
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    mathods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  let chatLog = [];
  const roomId = socket.handshake.query.roomId;
  const isEmpty = io.sockets.adapter.rooms?.get(roomId);
  const userId = socket.handshake.query.userId;
  socket["userName"] = socket.handshake.query.userName;
  socket.join(roomId);

  socket.on("send_message", (msg) => {
    const message = `${msg.message}`;
    chatLog.push([userId, message]);
    socket.to(roomId).emit("receive_message", message);
  });
  socket.on("disconnect", (done) => {
    if (!isEmpty || isEmpty.size === 0) {
      saveMessages(roomId, chatLog);
      chatLog = [];
    }
  });
});

app.use("/user", userRoute);
app.use("/item", itemRouter);
app.use("/message", messageRoute);
app.use("/", rootRoute);
