import express from "express";
import { createRoom, getRooms } from "../controller/messageController.js";

const massageRoute = express.Router();

massageRoute.get("/:id").get(getRooms).post(createRoom);

export default massageRoute;
