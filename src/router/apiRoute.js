import express from "express";
import {
  mainPageItems,
  login,
  join,
  idExists,
} from "../controller/apiController.js";

const apiRoute = express.Router();

apiRoute.post("/mainItems", mainPageItems);
apiRoute.post("/login", login);
apiRoute.post("/join", join);
apiRoute.post("/idExists", idExists);

export default apiRoute;
