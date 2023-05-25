import express from "express";
import {
  PwdCheck,
  getUserEdit,
  postUserEdit,
  userPageData,
} from "../controller/apiUserController.js";

const apiUserRoute = express.Router();

apiUserRoute.post("/user-data/:id", userPageData);
apiUserRoute.route("/:id/edit").get(getUserEdit).post(postUserEdit);
apiUserRoute.post("/:id/edit/pwdCheck", PwdCheck);

export default apiUserRoute;
