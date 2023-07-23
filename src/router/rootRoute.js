import express from "express";
import {
  login,
  join,
  idExists,
  searchResult,
} from "../controller/rootController.js";
import { mainPageItems } from "../controller/ItemController.js";

const rootRoute = express.Router();

rootRoute.get("/", mainPageItems);
rootRoute.get("/search", searchResult);
rootRoute.post("/login", login);
rootRoute.post("/join", join);
rootRoute.get("/join/idcheck", idExists);

export default rootRoute;
