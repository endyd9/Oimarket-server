import express from "express";
import {
  login,
  join,
  idExists,
  searchResult,
} from "../controller/apiController.js";

const apiRoute = express.Router();

apiRoute.get("/search/:keyword", searchResult);
apiRoute.post("/login", login);
apiRoute.post("/join", join);
apiRoute.post("/idExists", idExists);

export default apiRoute;
