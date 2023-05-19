import express from "express";
import {
  login,
  join,
  idExists,
  userData,
} from "../controller/apiUserController.js";

const apiUserRoute = express.Router();
apiUserRoute.post("/login", login);
apiUserRoute.post("/join", join);
apiUserRoute.post("/idExists", idExists);
apiUserRoute.post("/user-data/:id", userData);

export default apiUserRoute;
