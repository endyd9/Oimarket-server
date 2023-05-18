import express from "express";
import { userData } from "../controller/apiUserController.js";

const apiUserRoute = express.Router();

apiUserRoute.post("/user-data/:id", userData);

export default apiUserRoute;
