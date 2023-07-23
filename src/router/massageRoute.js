import express from "express";
import { createRoom, getRooms } from "../controller/messageController.js";

const messageRoute = express.Router();

messageRoute.route("/:id").get(getRooms).post(createRoom);


export default messageRoute;
