import express from "express";
import { createRoom, getRooms } from "../controller/apiMessageController.js";

const apiMassageRoute = express.Router();

apiMassageRoute.post("/createRoom", createRoom);
apiMassageRoute.get("/rooms/:id", getRooms);

export default apiMassageRoute;
