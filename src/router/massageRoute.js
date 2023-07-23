import express from "express";
import {
  createRoom,
  getRooms,
  startChat,
} from "../controller/messageController.js";

const messageRoute = express.Router();

// messageRoute.get("/chat/:id", startChat);
messageRoute.route("/:id").get(getRooms).post(createRoom);

export default messageRoute;
