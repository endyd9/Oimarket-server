import express from "express";
import { searchResult } from "../controller/apiController.js";

const apiRoute = express.Router();

apiRoute.get("/search/:keyword", searchResult);

export default apiRoute;
